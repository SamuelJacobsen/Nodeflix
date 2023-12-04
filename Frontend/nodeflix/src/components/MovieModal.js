import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';

function MovieModal({ show, handleClose, selectedMovie }) {
  const modalStyle = {
    backgroundColor: 'red',
    color: 'white',
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedMovie ? selectedMovie.name : 'Carregando...'}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        <Row>
          <Col xs={12} md={6}>
            <p>Sinopse: {selectedMovie ? selectedMovie.sinopse : 'Carregando...'}</p>
            <p>Data de lançamento: {selectedMovie ? selectedMovie.dataLancamento : 'Carregando...'}</p>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default MovieModal;
