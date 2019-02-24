import * as t from '../constants/ActionTypes';
import { parseError } from '../helpers/errors';
import debug from '../helpers/debug';

// Init state
export const initialState = {
  isPending: false,
  userId: null,
  city: null,
  languages: null,
  social: null,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case t.LOGIN_SUCCESSED:
      const { id } = payload;
      return { ...state, userId: id };

    case t.USER_INFO_PENDING:
      return { ...state, isPending: true, error: null };

    case t.USER_INFO_SUCCESSED:
      const { userId, city, languages = [], social = [] } = payload;

      // move web to top
      const firstLabel = 'web';
      const sortedSocial = social
        .slice()
        .sort(({ label: la }, { label: lb }) => {
          return la === firstLabel || la < lb ? -1 : la > lb ? 1 : 0;
        });

      return {
        ...state,
        isPending: false,
        error: null,
        userId,
        city,
        languages,
        social: sortedSocial
      };

    case t.USER_INFO_FAILED:
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
