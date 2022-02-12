export const REQUEST_PRICE_SUCESS = 'REQUEST_PRICE_SUCESS';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const requestprice = (payload) => ({
  type: REQUEST_PRICE_SUCESS, payload,
});

export const saveExpenses = (payload) => ({
  type: SAVE_EXPENSES, payload,
});
