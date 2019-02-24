import reducer, { initialState } from './user';
import * as t from '../constants/ActionTypes';
import errors from '../constants/errors';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('LOGIN_SUCCESSED setting user id', () => {
    const state = {
      ...initialState,
      error: 'some error'
    };
    const action = {
      type: t.LOGIN_SUCCESSED,
      payload: {
        id: 123
      }
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      userId: action.payload.id
    });
  });

  it('USER_INFO_PENDING', () => {
    const state = {
      ...initialState,
      error: 'some error'
    };
    const action = {
      type: t.USER_INFO_PENDING
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      isPending: true,
      error: null
    });
  });

  it('USER_INFO_SUCCESSED', () => {
    const state = {
      ...initialState,
      userId: 1,
      isPending: true,
      error: 'some error'
    };
    const action = {
      type: t.USER_INFO_SUCCESSED,
      payload: {
        userId: 2,
        city: 'some city',
        languages: [3, 2, 1],
        social: [3, 2, 1]
      }
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      ...action.payload,
      isPending: false,
      error: null
    });
  });

  it('USER_INFO_SUCCESSED move web link to top', () => {
    const state = {
      ...initialState,
      isPending: true,
      error: 'some error'
    };
    const action = {
      type: t.USER_INFO_SUCCESSED,
      payload: {
        userId: 1,
        city: 'some city',
        social: [{ label: 'y' }, { label: 'web' }, { label: 'x' }]
      }
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      isPending: false,
      error: null,
      ...action.payload,
      languages: [],
      social: [{ label: 'web' }, { label: 'x' }, { label: 'y' }]
    });
  });

  it('USER_INFO_FAILED', () => {
    const state = {
      ...initialState,
      isPending: true,
      isLogin: true,
      error: null
    };
    const action = {
      type: t.USER_INFO_FAILED,
      payload: 'some error'
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      isPending: false,
      error: action.payload
    });
  });

  it('USER_INFO_FAILED replaces "user_not_found" to clear message from error dictionary', () => {
    const state = {
      ...initialState,
      isPending: true,
      isLogin: true,
      error: null
    };
    const action = {
      type: t.USER_INFO_FAILED,
      payload: 'user_not_found'
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      isPending: false,
      error: errors['user_not_found']
    });
  });
});
