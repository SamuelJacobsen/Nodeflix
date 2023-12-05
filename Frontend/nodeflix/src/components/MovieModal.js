import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';

function MovieModal({ show, handleClose, selectedMovie }) {
  const modalStyle = {
    backgroundColor: 'red',
    color: 'white',
  };

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
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
            <p>
              Data de lançamento:{' '}
              {selectedMovie ? formatDate(selectedMovie.dataLancamento) : 'Carregando...'}
            </p>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default MovieModal;
