import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { setLoginEmail } from '../actions/actionLogin';

const LoginPage = styled.div`
    Form {}
`;

export default function Login() {
  const onSubmitLogin = () => {
    const { email } = this.state;
    const { history, loginEmail } = this.props;
    loginEmail(email);
    history.push('/carteira');
  }

  const isValidEmail = () => {
    const { email } = this.state;
    if (email.includes('@')
    && email.includes('.com')
    && !email.includes('@.com')
    && !email.includes('@@')
    ) {
      this.setState({ validEmail: true });
    } else {
      this.setState({ validEmail: false });
    }
  }

  const handleChange = (event) => {
    this.isValidEmail();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  return (
    <div>Login</div>
  )
}


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validEmail: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.isValidEmail = this.isValidEmail.bind(this);
  }

 

  render() {
    const minLength = 6;
    const { email, password, validEmail } = this.state;
    const isDisabled = validEmail && password.length >= minLength;
    return (
      <Form>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
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
            onChange={ this.handleChange }
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
            onChange={ this.handleChange }
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={ !isDisabled }
          onClick={ this.onSubmitLogin }
          id="login-btn"
        >
          Entrar
        </Button>
      </Form>
    );
  }
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
