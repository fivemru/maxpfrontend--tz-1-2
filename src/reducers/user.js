import {
  LOGIN_SUCCESSED,
  USER_INFO_PENDING,
  USER_INFO_SUCCESSED,
  USER_INFO_FAILED
} from '../constants';
import { parseError } from '../helpers/errors';
import debug from '../helpers/debug';

// Init state
const initialState = {
  isPending: false,
  userId: null,
  city: null,
  languages: [],
  social: [],
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESSED:
      const { id } = payload;
      return { ...state, userId: id };

    case USER_INFO_PENDING:
      return { ...state, isPending: true, error: null };

    case USER_INFO_SUCCESSED:
      const { userId, city, languages = [], social = [] } = payload;

      // move web to top
      const firstLabel = 'web';
      const sortedSocial = social.sort(({ label: la }, { label: lb }) => {
        return la === firstLabel || la < lb ? -1 : la > lb ? 1 : 0;
      });

      return {
        ...state,
        isPending: false,
        userId,
        city,
        languages,
        social: sortedSocial
      };

    case USER_INFO_FAILED:
      // get clear error message for user
      const msg = parseError(payload);

      // send error info to developer ...
      // ...
      debug('USER_INFO_FAILED, payload: ', payload);

      return {
        ...state,
        isPending: false,
        error: msg
      };

    default:
      return state;
  }
};
