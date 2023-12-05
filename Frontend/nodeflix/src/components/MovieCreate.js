import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function MovieCreate({ show, handleClose, handleCreateMovie }) {
  const [newMovieData, setNewMovieData] = useState({
    name: '',
    sinopse: '',
    dataLancamento: ''
  });

  const handleNewMovieDataChange = (e) => {
    const { name, value } = e.target;
    setNewMovieData({ ...newMovieData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await handleCreateMovie(newMovieData);
      handleClose();
    } catch (error) {
      console.error('Erro ao criar filme:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Filme</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do Filme"
              name="name"
              value={newMovieData.name}
              onChange={handleNewMovieDataChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicSinopse">
            <Form.Label>Sinopse</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Sinopse do Filme"
              name="sinopse"
              value={newMovieData.sinopse}
              onChange={handleNewMovieDataChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDataLancamento">
            <Form.Label>Data de Lançamento</Form.Label>
            <Form.Control
              type="date"
              placeholder="Data de Lançamento"
              name="dataLancamento"
              value={newMovieData.dataLancamento}
              onChange={handleNewMovieDataChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MovieCreate;
