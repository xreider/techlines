import axios from 'axios';
import { cartItemAdd, setLoading, setError, cartItemRemoval } from '../slices/cart.js';

export const addCartItem = (id, qty) => async (dispatch) => {
  dispatch(setLoading(true));
  console.log('(id, qty)', id, qty);
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    const itemToAdd = {
      id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      stock: data.stock,
      qty,
    };
    dispatch(cartItemAdd(itemToAdd));
  } catch (error) {
    const err = error?.message
      ? console.error(`getProducts error: ${error?.message}`)
      : error?.response?.data?.message
      ? console.error(`getProducts error: ${error?.response?.data?.message}`)
      : console.error(JSON.stringify(error));
    setError(err);
  }
};

export const removeCartItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(cartItemRemoval(id));
};
