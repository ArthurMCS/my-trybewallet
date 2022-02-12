// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_LOGIN_EMAIL } from '../actions/actionLogin';

const initialState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function user(state = initialState, action) {
  switch (action.type) {
  case SET_LOGIN_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default user;
