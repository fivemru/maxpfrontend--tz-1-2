import * as t from '../constants/ActionTypes';
import { parseError } from '../helpers/errors';
import debug from '../helpers/debug';

// Init state
export const initialState = {
  isPending: false,
  data: null,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case t.NEWS_PENDING:
      return { ...state, isPending: true, error: null };

    case t.NEWS_SUCCESSED:
      return { ...state, isPending: false, data: payload, error: null };

    case t.NEWS_FAILED:
      // get clear error message for user
      const msg = parseError(payload);

      // send error info to developer ...
      // ...
      debug('NEWS_FAILED, payload: ', payload);

      return {
        ...state,
        isPending: false,
        error: msg
      };

    default:
      return state;
  }
};
