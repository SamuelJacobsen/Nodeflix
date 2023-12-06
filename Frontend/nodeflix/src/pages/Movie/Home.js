import React, { useState, useEffect } from 'react';
import LoginModal from '../../components/LoginModal';
import MovieCard from '../../components/MovieCard';

import MovieModal from '../../components/MovieModal';
import MovieCreate from '../../components/MovieCreate';
import SearchInput from '../../components/SearchInput';
import api, { setAuthToken } from '../../services/api';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setLoggedIn(true);
      setShowLoginModal(false);
      fetchMovies();
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      // Faz a chamada para a rota de login passando email e senha
      const response = await api.post('/users/login', { email, password });
      const { token } = response.data;

      setAuthToken(token);
      localStorage.setItem('token', token);
      setLoggedIn(true);
      setShowLoginModal(false);
      fetchMovies(); // Carrega os filmes após o login
    } catch (error) {
      console.error('Erro ao efetuar login:', error);
    }
  };

  const fetchMovies = async (searchTerm = '') => {
    try {
      const response = await api.get(`/movies?title=${searchTerm}`);
      setMovies(response.data.movies);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };
  

  const handleCreateMovie = async (movieData) => {
    try {
      console.log('Dados do filme:', movieData);
      // Faz a requisição para criar um novo filme na API
      await api.post('/movies/create', movieData);
      fetchMovies(); // Recarrega a lista de filmes após a criação
    } catch (error) {
      console.error('Erro ao criar filme:', error);
    }
  };

  const handleLogout = () => {
    // Limpa o token de autenticação e faz logout
    setAuthToken(null);
    localStorage.removeItem('token');
    setLoggedIn(false);
    setShowLoginModal(true);
    setMovies([]); // Limpa a lista de filmes
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    fetchMovies(searchTerm);
  };


  const handleOpenModal = (movie) => {
    setShowMovieModal(true);
  };
  const handleAddMovie = () => {
    setShowMovieModal(true); // Abre o modal de criação de filme
  };
  const handleOpenDetailsModal = (movie) => {
    setSelectedMovieDetails(movie);
    setShowDetailsModal(true);
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await api.delete(`/movies/${movieId}`);
      fetchMovies();
    } catch (error) {
      console.error('Erro ao excluir filme:', error);
    }
    
  };

  return (
    <div style={{ height: '100%', width: '100%' }} className="container-fluid bg-dark">
      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        handleLogin={handleLogin}
      />

      {loggedIn && (
        <div className="p-3">
          <div className="mb-3">
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
          <div className="mb-3">
            <button onClick={handleAddMovie} className="btn btn-danger">
              Adicionar Filme
            </button>
          </div>
          <SearchInput handleSearch={handleSearch} />
          {loggedIn && (
            <MovieModal
              show={showDetailsModal}
              handleClose={() => setShowDetailsModal(false)}
              selectedMovie={selectedMovieDetails}
              className="card"
            />
          )}
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {movies
              .filter((movie) =>
                movie.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((movie) => (
                <div key={movie._id}>
                  <MovieCard
                    movie={movie}
                    openModal={() => handleOpenModal(movie)}
                    openDetailsModal={() => handleOpenDetailsModal(movie)}
                    handleDelete={handleDeleteMovie}
                    className="card"
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      {loggedIn && (
        <MovieModal
          show={showDetailsModal}
          handleClose={() => setShowDetailsModal(false)}
          selectedMovie={selectedMovieDetails}
          className="card"
        />
      )}

      {loggedIn && showMovieModal && !showDetailsModal && (
        <MovieCreate
          show={showMovieModal}
          handleClose={() => setShowMovieModal(false)}
          handleCreateMovie={handleCreateMovie}
        />
      )}
    </div>
  );
}

export default Home;