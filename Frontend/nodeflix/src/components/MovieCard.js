import React from 'react';
import { Card, Button } from 'react-bootstrap';

function MovieCard({ movie, openModal, openEditModal }) {
  const cardStyle = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    height: '350px',
    marginBottom: '10px',
  };

  return (
    <Card className="movie-card" style={cardStyle}>
      {/* Renderizar os detalhes do filme no card */}
      <Card.Body>
        <Card.Title>{movie.name}</Card.Title>
        <Button variant="primary" onClick={() => openModal(movie)}>Detalhes</Button>
        <Button variant="secondary" onClick={() => openEditModal(movie)}>Editar</Button>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
