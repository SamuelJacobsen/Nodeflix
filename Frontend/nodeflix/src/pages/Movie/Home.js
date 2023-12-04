import React, { useState, useEffect } from 'react';
import LoginModal from '../../components/LoginModal';
import MovieCard from '../../components/MovieCard';
import MovieEdit from '../../components/MovieEdit';
import MovieModal from '../../components/MovieModal';
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
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieEdit, setShowMovieEdit] = useState(false);
  const [editedMovie, setEditedMovie] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setLoggedIn(true);
      setShowLoginModal(false);
      fetchMovies();
    }
  }, []);
  const handleEditMovie = async (editedData) => {
    try {
      fetchMovies();
      setShowMovieEdit(false); // Fechar o modal de edição
    } catch (error) {
      console.error('Erro ao editar filme:', error);
    }
  };
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

  const fetchMovies = async () => {
    try {
      // Faz a requisição para obter a lista de filmes da API
      const response = await api.get('/');
      setMovies(response.data);
      
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  const handleCreateMovie = async (movieData) => {
    try {
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
  };
  const handleOpenEditModal = (movie) => {
    setEditedMovie(movie);
    setShowMovieEdit(true);
    setShowMovieModal(false); // Esconder o modal de detalhes se estiver aberto
  };

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setShowMovieModal(true);
    setShowMovieEdit(false);
  };

  return (
    <div className="container-fluid bg-dark">
      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        handleLogin={handleLogin}
      />

      {loggedIn && (
        <div className="p-3">
          <button onClick={handleLogout} className="btn btn-danger mb-3">
            Logout
          </button>
          <button onClick={handleCreateMovie} className="btn btn-primary mb-3 ml-2">
            Adicionar Filme
          </button>
          <SearchInput handleSearch={handleSearch} />

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
                    openEditModal={() => handleOpenEditModal(movie)}
                    className="card"
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      {loggedIn && (
        <MovieModal
          show={showMovieModal}
          handleClose={() => setShowMovieModal(false)}
          selectedMovie={selectedMovie}
          className="card"
        />
      )}

      {loggedIn && (
        <MovieEdit
          show={showMovieEdit}
          handleClose={() => setShowMovieEdit(false)}
          movie={editedMovie}
          handleEditMovie={handleEditMovie}
          className="card"
        />
      )}
    </div>
  );
}

export default Home;