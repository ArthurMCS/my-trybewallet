// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_PRICE_SUCESS,
  SAVE_EXPENSES,
  DELETE_EXPENSES } from '../actions/actionWallet';

const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case REQUEST_PRICE_SUCESS:
    return {
      ...state,
      exchangeRates: action.payload,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense !== action.payload),
    };
  default:
    return state;
  }
}

export default wallet;
