import React from 'react';
import { Card, Button } from 'react-bootstrap';

function MovieCard({ movie, openDetailsModal, openEditModal, handleDelete }) {
  const cardStyle = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    height: '350px',
    marginBottom: '10px',
  };

  const handleDetailsClick = () => {
    openDetailsModal(movie);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    handleDelete(movie._id);
  };

  return (
    <Card className="movie-card" style={cardStyle} onClick={handleDetailsClick}>
      <Card.Body>
        <Card.Title>{movie.name}</Card.Title>
        <Button variant="danger" onClick={handleDeleteClick}>Apagar</Button>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
