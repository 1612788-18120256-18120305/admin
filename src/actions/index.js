import axios from 'axios';
import axiosJWT from '../api/axiosJWT';
import config from '../config/mainConfig';
import history from '../history';
import { toast } from 'react-toastify';
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_ADMINS,
  FETCH_ADMIN,
  CREATE_ADMIN,
  DELETE_ADMIN,
  EDIT_ADMIN,
} from './types';

export const signIn = (formValues) => async (dispatch) => {
  try {
    const res = await axios.post(`${config.BACKEND_URL}/auth/admin/login`, {
      email: formValues.email,
      password: formValues.password,
    });
    if (res.data.success) {
      dispatch({
        type: SIGN_IN,
        payload: res.data,
      });
      history.push('/dashboard');
      toast('🎉🎉 Welcome to the dashboard!');
    }
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

export const signOut = () => {
  history.push('/login');
  toast.info('Logout Successfully');
  return {
    type: SIGN_OUT,
  };
};

export const fetchAdmins = () => async (dispatch) => {
  try {
    const res = await axiosJWT.get('/users/admins');
    if (res.data.success) {
      dispatch({
        type: FETCH_ADMINS,
        payload: res.data.admins,
      });
    }
  } catch (err) {
    toast.error('Error');
  }
};

export const fetchAdmin = (adminId) => async (dispatch) => {
  try {
    const res = await axiosJWT.get(`/users/${adminId}`);
    if (res.data.success) {
      dispatch({
        type: FETCH_ADMIN,
        payload: res.data.user,
      });
    }
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

export const createAdmin = (formValues) => async (dispatch) => {
  try {
    const res = await axiosJWT.post('/users/admins', formValues);
    if (res.data.success) {
      dispatch({
        type: CREATE_ADMIN,
        payload: res.data.admin,
      });
      toast.success('Admin Created Successfully');
      history.push('/admins');
    }
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

// export const editAdmin = (formValues) => async (dispatch) => {
//   const res = await axiosJWT.put('/users/admins/edit/')
// }