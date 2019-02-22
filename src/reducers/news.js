import { NEWS_PENDING, NEWS_SUCCESSED, NEWS_FAILED } from '../constants';
import { parseError } from '../helpers/errors';
import debug from '../helpers/debug';

// Init state
const initialState = {
  isPending: false,
  data: null,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case NEWS_PENDING:
      return { ...state, isPending: true, error: null };

    case NEWS_SUCCESSED:
      return { ...state, isPending: false, data: payload };

    case NEWS_FAILED:
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
