import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  cart: JSON.parse(localStorage.getItem('cartItems')) ?? [],
  expressShipping: false,
  // Должно считать с сервера стоимость
  subtotal: JSON.parse(localStorage.getItem('cartItems'))
    ? calculateSubtotal(JSON.parse(localStorage.getItem('cartItems')))
    : 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    cartItemAdd: (state, { payload }) => {
      console.log('state', state);
      console.log('payload', payload);
      const existingItem = state.cart.find((item) => item.id === payload.id);
      if (existingItem) {
        state.cart = state.cart.map((item) => (item.id === existingItem.id ? payload : item));
      } else {
        state.cart = [...state.cart, payload];
      }
      state.loading = false;
      state.error = null;
      updateLocalStorage(state.cart);
      state.subtotal = calculateSubtotal(state.cart);
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    cartItemRemoval: (state, { payload }) => {
      state.cart = [...state.cart].filter((item) => item.id !== payload);
      updateLocalStorage(state.cart);
      state.subtotal = calculateSubtotal(state.cart);
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, cartItemAdd, cartItemRemoval } = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;

function calculateSubtotal(cartState) {
  let result = 0;
  cartState?.forEach?.((item) => {
    result += item.qty * item.price;
  });
  return Number(result).toFixed(2);
}

function updateLocalStorage(cart) {
  localStorage.setItem('cartItems', JSON.stringify(cart));
  // Должно считать с сервера стоимость
  localStorage.setItem('subtotal', JSON.stringify(calculateSubtotal(cart)));
}
