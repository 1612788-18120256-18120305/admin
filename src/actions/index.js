import axios from 'axios';
import config from '../config/mainConfig';
import history from '../history';
import { SIGN_IN, SIGN_OUT } from './types';
import { toast } from 'react-toastify';

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
