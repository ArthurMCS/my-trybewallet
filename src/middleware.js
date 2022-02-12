import fetchCurrentPrice from './services/fetchApi';
import { requestprice } from './actions/actionWallet';

export default function RequestCurrentPriceThunk() {
  return (dispatch) => {
    fetchCurrentPrice()
      .then((response) => {
        const currencies = response;
        dispatch(requestprice(currencies));
      }).catch((err) => {
        throw (err);
      });
  };
}
