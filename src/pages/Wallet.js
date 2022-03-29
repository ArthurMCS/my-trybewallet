import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import TableComponent from '../components/Table';
import { saveExpenses } from '../actions/actionWallet';
import RequestCurrentPriceThunk from '../middleware';

const WallerStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    header {
        display: flex;
        align-items: center;
        margin-top: 20px;
        font-size: 25px;


        div {
          margin: 20px;
        }

    }

    svg {
      color: red;
      height: 30px;
      width: 30px;
      cursor: pointer;
    }

    form {
      margin-top: 50px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    button {
      margin-bottom: 30px;
    }

    .form-label {
      margin-right: 15px;
      margin-left: 30px;
    }

    .form-control {
        width: 150px;
    }

`;

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currencyOptions: [
        'USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
        'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP',
      ],
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
    this.renderSelects = this.renderSelects.bind(this);
    this.onSubmitWallet = this.onSubmitWallet.bind(this);
  }

  componentDidMount() {
    const { currentPrice } = this.props;
    currentPrice();
  }

  onSubmitWallet() {
    const { currentPrice } = this.props;
    currentPrice();
    const { id, value, description, currency, method, tag } = this.state;
    const { addExpenses, exchangeRates } = this.props;
    const allExpenses = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    this.setState({ id: id + 1 });
    addExpenses(allExpenses);
    this.setState({
      value: '0',
      description: '',
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  renderInputs() {
    const { value, description } = this.state;
    return (
      <Form>
        <Form.Label htmlFor="value-input">
          Valor:
        </Form.Label>
        <Form.Control
          type="number"
          name="value"
          data-testid="value-input"
          onChange={ this.handleChange }
          value={ value }
        />
        <Form.Label htmlFor="description-input">
          Descrição:
        </Form.Label>
        <Form.Control
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ this.handleChange }
          value={ description }
        />
        {this.renderSelects()}
      </Form>
    );
  }

  renderSelects() {
    const { currency, method, tag, currencyOptions } = this.state;
    return (
      <>
        <Form.Label htmlFor="currency-input">
          Moeda:
        </Form.Label>
        <Form.Select
          id="currency-input"
          name="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
          value={ currency }
        >
          {currencyOptions.map((coin) => <option key={ coin }>{coin}</option>)}
        </Form.Select>
        <Form.Label htmlFor="method-input">
          Método de pagamento:
        </Form.Label>
        <Form.Select
          id="method-input"
          name="method"
          data-testid="method-input"
          onChange={ this.handleChange }
          value={ method }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </Form.Select>
        <Form.Label htmlFor="tag-input">
          Tag:
        </Form.Label>
        <Form.Select
          id="tag-input"
          name="tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
          value={ tag }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </Form.Select>
      </>
    );
  }

  render() {
    const { email } = this.props;
    const { expenses } = this.props;
    const sumExpenses = expenses.reduce((acc, curr) => {
      const rate = curr.value * curr.exchangeRates[curr.currency].ask;
      const valueWithRate = (acc + rate);
      return valueWithRate;
    }, 0);

    return (
      <WallerStyled>
        <header>
          <div data-testid="email-field">{email}</div>
          <div>
            <span data-testid="total-field">
              {`Despesa total: ${sumExpenses.toFixed(2)} `}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <div className="inputs">
          {this.renderInputs()}
        </div>
        <Button
          type="button"
          onClick={ this.onSubmitWallet }
        >
          Adicionar despesa
        </Button>
        <section>
          <TableComponent />
        </section>
      </WallerStyled>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  exchangeRates: state.wallet.exchangeRates,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currentPrice: () => dispatch(RequestCurrentPriceThunk()),
  addExpenses: (payload) => dispatch(saveExpenses(payload)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
