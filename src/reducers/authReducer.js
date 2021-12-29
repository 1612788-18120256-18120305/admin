import { SIGN_IN, SIGN_OUT, REFRESH_TOKEN } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: false,
  access_token: null,
  refresh_token: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, ...action.payload };
    case SIGN_OUT:
      return {
        ...state,
        access_token: null,
        refresh_token: null,
        isSignedIn: false,
      };
    case REFRESH_TOKEN:
      return { ...state, access_token: action.payload };
    default:
      return state;
  }
};
