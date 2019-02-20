import {
  LOGIN_PENDING,
  LOGIN_SUCCESSED,
  LOGIN_FAILED,
  LOGOUT
} from '../constants';

const initialState = {
  isLogin: false,
  isPending: false,
  error: null
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case LOGIN_PENDING:
      return { ...state, isPending: true, isLogin: false, error };

    case LOGIN_SUCCESSED:
      return { ...state, isPending: false, isLogin: true };

    case LOGIN_FAILED:
      return {
        ...state,
        isPending: false,
        isLogin: false,
        error: payload.toString()
      };

    case LOGOUT:
      return { ...state, isLogin: false };

    default:
      return state;
  }
};
