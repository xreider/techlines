import axios from 'axios';
import {} from '../slices/cart.js';
import {
  setLoading,
  userLogin,
  setError,
  userLogout,
  updateUserProfile,
  resetUpdate,
} from '../slices/user.js';

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );
    dispatch(userLogin(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const err = error?.message
      ? console.error(`login error: ${error?.message}`) || error?.message
      : error?.response?.data?.message
      ? console.error(`login error: ${error?.response?.data?.message}`) ||
        error?.response?.data?.message
      : console.error(JSON.stringify(error)) || JSON.stringify(error);
    dispatch(setError(err));
  }
};

export const logout = () => (dispatch) => {
  dispatch(resetUpdate());
  localStorage.removeItem('userInfo');
  dispatch(userLogout());
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users/register',
      { name, email, password },
      config
    );
    dispatch(userLogin(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const err = error?.message
      ? console.error(`login error: ${error?.message}`) || error?.message
      : error?.response?.data?.message
      ? console.error(`login error: ${error?.response?.data?.message}`) ||
        error?.response?.data?.message
      : console.error(JSON.stringify(error)) || JSON.stringify(error);
    dispatch(setError(err));
  }
};

export const updateProfile =
  (id, name, email, password) => async (dispatch, getState) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.put(
        `/api/users/profile/${id}`,
        { _id: id, name, email, password },
        config
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch(updateUserProfile(data));
    } catch (error) {
      const err = error?.message
        ? console.error(`login error: ${error?.message}`) || error?.message
        : error?.response?.data?.message
        ? console.error(`login error: ${error?.response?.data?.message}`) ||
          error?.response?.data?.message
        : console.error(JSON.stringify(error)) || JSON.stringify(error);
      dispatch(setError(err));
    }
  };

export const resetUpdateSuccess = () => async (dispatch) => {
  dispatch(resetUpdate());
};
