import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function LoginModal({ show, handleClose, handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleEntrar = async () => {
    try {
      setError(null); // Limpa o erro ao tentar fazer login novamente
      await handleLogin(email, password);
    } catch (error) {
      setError('Dados de login incorretos'); // Define a mensagem de erro
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="black-background">
      <Modal.Header closeButton className="header bg-danger py-2">
        <Modal.Title className="text-center red-title">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="red-title">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="card"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="red-title">Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="card"
            />
          </Form.Group>

          <Button variant="danger" onClick={handleEntrar} className="btn">
            Entrar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
