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
      if (!newMovieData.name || !newMovieData.sinopse || !newMovieData.dataLancamento) {
        console.error('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

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
      <Modal.Body style={{ backgroundColor: 'black', color: 'white' }}>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label style={{ color: 'white' }}>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do Filme"
              name="name"
              value={newMovieData.name}
              onChange={handleNewMovieDataChange}
              style={{ backgroundColor: 'white', color: 'black' }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicSinopse">
            <Form.Label style={{ color: 'white' }}>Sinopse</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Sinopse do Filme"
              name="sinopse"
              value={newMovieData.sinopse}
              onChange={handleNewMovieDataChange}
              style={{ backgroundColor: 'white', color: 'black' }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDataLancamento">
            <Form.Label style={{ color: 'white' }}>Data de Lançamento</Form.Label>
            <Form.Control
              type="date"
              placeholder="Data de Lançamento"
              name="dataLancamento"
              value={newMovieData.dataLancamento}
              onChange={handleNewMovieDataChange}
              style={{ backgroundColor: 'white', color: 'black' }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: 'black' }}>
        <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: 'red' }}>
          Fechar
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          style={{ backgroundColor: 'red' }}
          disabled={!newMovieData.name || !newMovieData.sinopse || !newMovieData.dataLancamento}
        >
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MovieCreate;
