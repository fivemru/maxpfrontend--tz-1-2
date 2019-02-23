import {
  LOGIN_PENDING,
  LOGIN_SUCCESSED,
  LOGIN_FAILED,
  LOGOUT
} from '../constants';
import { parseError } from '../helpers/errors';
import debug from '../helpers/debug';

// Init state
export const initialState = {
  isLogin: false,
  isPending: false,
  id: null,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_PENDING:
      return { ...state, isPending: true, error: null };

    case LOGIN_SUCCESSED:
      const { id } = payload;
      return { ...state, isPending: false, isLogin: true, error: null, id };

    case LOGIN_FAILED:
      // get clear error message for user
      const msg = parseError(payload);

      // send error info to developer ...
      // ...
      debug('LOGIN_FAILED, payload: ', payload);

      return {
        ...state,
        isPending: false,
        isLogin: false,
        error: msg
      };

    case LOGOUT:
      return { ...state, isLogin: false, isPending: false, error: null };

    default:
      return state;
  }
};
