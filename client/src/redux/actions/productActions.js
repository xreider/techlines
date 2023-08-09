import axios from 'axios';

import { setProducts, setLoading, setError } from '../slices/products.js';

export const getProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get('/api/products');
    dispatch(setProducts(data));
  } catch (error) {
    const err = error?.message
      ? console.error(`getProducts error: ${error?.message}`)
      : error?.response?.data?.message
      ? console.error(`getProducts error: ${error?.response?.data?.message}`)
      : console.error(JSON.stringify(error));
    setError(err);
  }
};