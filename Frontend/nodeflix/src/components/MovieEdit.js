import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function MovieEdit({ show, handleClose, movie, handleEditMovie }) {
  const [editedMovie, setEditedMovie] = useState({ ...movie });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie({ ...editedMovie, [name]: value });
  };

  const handleSaveChanges = () => {
    // Chama a função de edição passando o filme editado
    handleEditMovie(editedMovie);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Filme</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do Filme"
              name="name"
              value={editedMovie.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicSinopse">
            <Form.Label>Sinopse</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Sinopse do Filme"
              name="sinopse"
              value={editedMovie.sinopse}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDataLancamento">
            <Form.Label>Data de Lançamento</Form.Label>
            <Form.Control
              type="date"
              placeholder="Data de Lançamento"
              name="dataLancamento"
              value={editedMovie.dataLancamento}
              onChange={handleChange}
            />
          </Form.Group>
          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Salvar Alterações
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MovieEdit;
