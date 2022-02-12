import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from '../components/Table';
import { saveExpenses } from '../actions/actionWallet';
import RequestCurrentPriceThunk from '../middleware';

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
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            name="value"
            data-testid="value-input"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        {this.renderSelects()}
      </form>
    );
  }

  renderSelects() {
    const { currency, method, tag, currencyOptions } = this.state;
    return (
      <>
        <label htmlFor="currency-input">
          Moeda:
          <select
            id="currency-input"
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currencyOptions.map((coin) => <option key={ coin }>{coin}</option>)}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento
          <select
            id="method-input"
            name="method"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag:
          <select
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
          </select>
        </label>
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
      <>
        <header>
          <span data-testid="email-field">{email}</span>
          <br />
          <span data-testid="total-field">
            {`Despesa total: ${sumExpenses.toFixed(2)} `}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        {this.renderInputs()}
        <button
          type="button"
          onClick={ this.onSubmitWallet }
        >
          Adicionar despesa
        </button>
        <section>
          <Table />
        </section>
      </>
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
