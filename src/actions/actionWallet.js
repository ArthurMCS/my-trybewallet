export const REQUEST_PRICE_SUCESS = 'REQUEST_PRICE_SUCESS';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const requestprice = (payload) => ({
  type: REQUEST_PRICE_SUCESS, payload,
});

export const saveExpenses = (payload) => ({
  type: SAVE_EXPENSES, payload,
});

export const deleteExpenses = (payload) => ({
  type: DELETE_EXPENSES, payload,
});
