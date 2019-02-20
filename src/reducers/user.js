import {
  LOGIN_PENDING,
  LOGIN_SUCCESSED,
  LOGIN_FAILED,
  LOGOUT
} from '../constants';
import { parseError } from '../helpers/errors';

// Init state
const initialState = {
  isLogin: false,
  isPending: false,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_PENDING:
      return { ...state, isPending: true, error: null };

    case LOGIN_SUCCESSED:
      return { ...state, isPending: false, isLogin: true, error: null };

    case LOGIN_FAILED:
      // get clear error message for user
      const msg = parseError(payload);

      // send error info to developer ...
      // ...
      console.log('failed error payload: ', payload);

      return {
        ...state,
        isPending: false,
        isLogin: false,
        error: msg
      };

    case LOGOUT:
      return { ...state, isLogin: false };

    default:
      return state;
  }
};
