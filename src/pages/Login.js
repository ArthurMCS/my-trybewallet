import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { setLoginEmail } from '../actions/actionLogin';

const LoginPage = styled.div`
    Form {}
`;

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const minLength = 6;
  const isDisabled = validEmail && password.length >= minLength;

  const isValidEmail = () => {
    if (email.includes('@')
    && email.includes('.com')
    && !email.includes('@.com')
    && !email.includes('@@')
    ) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }

  const handleChange = (event) => {
    isValidEmail();
    const { name, value } = event.target;
    name === "email" ? setEmail(value) : setPassword(value);
  }

  return (
    <Form onSubmit={
      (e) => {
        e.preventDefault();
        const {history, loginEmail} = props;
        loginEmail(email);
        history.push('/carteira');
      }
    }>
    <Form.Group
      className="mb-3"
    >
      <Form.Label htmlFor="email-input">Email: </Form.Label>
      <Form.Control
        value={ email }
        type="email"
        name="email"
        data-testid="email-input"
        id="email-input"
        placeholder="alguem@alguem.com"
        required
        onChange={ handleChange }
      />
    </Form.Group>
    <Form.Group>
      <Form.Label htmlFor="password-input">
        Senha:
      </Form.Label>
      <Form.Control
        value={ password }
        type="password"
        name="password"
        data-testid="password-input"
        id="password-input"
        minLength="6"
        required
        onChange={ handleChange }
      />
    </Form.Group>
    <Button
      variant="primary"
      type="submit"
      disabled={ !isDisabled }
      id="login-btn"
    >
      Entrar
    </Button>
  </Form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  loginEmail: (payload) => { dispatch(setLoginEmail(payload)); },
});

Login.propTypes = {
  loginEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
