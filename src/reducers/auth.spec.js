import * as t from '../constants';
import reducer, { initialState } from './auth';
import errors from '../constants/errors';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('LOGIN_PENDING after error', () => {
    const state = {
      ...initialState,
      error: 'some error'
    };
    const action = {
      type: t.LOGIN_PENDING
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      isPending: true,
      error: null
    });
  });

  it('LOGIN_PENDING without error', () => {
    const state = {
      ...initialState,
      error: null
    };
    const action = {
      type: t.LOGIN_PENDING
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      isPending: true,
      error: null
    });
  });

  it('LOGIN_SUCCESSED', () => {
    const state = {
      ...initialState,
      data: null,
      isPending: true,
      isLogin: false,
      error: 'some error'
    };
    const action = {
      type: t.LOGIN_SUCCESSED,
      payload: {
        id: 1
      }
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      isPending: false,
      isLogin: true,
      error: null,
      id: action.payload.id
    });
  });

  it('LOGIN_FAILED', () => {
    const state = {
      ...initialState,
      isPending: true,
      isLogin: true,
      error: null
    };
    const action = {
      type: t.LOGIN_FAILED,
      payload: 'some error'
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      isPending: false,
      isLogin: false,
      error: action.payload
    });
  });

  it('LOGIN_FAILED replaces "wrong_email_or_password" to clear message from error dictionary', () => {
    const state = {
      ...initialState,
      isPending: true,
      isLogin: true,
      error: null
    };
    const action = {
      type: t.LOGIN_FAILED,
      payload: 'wrong_email_or_password'
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      isPending: false,
      isLogin: false,
      error: errors['wrong_email_or_password']
    });
  });

  it('LOGOUT', () => {
    const state = {
      ...initialState,
      isPending: true,
      isLogin: true,
      error: 'some error'
    };
    const action = {
      type: t.LOGOUT
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      isPending: false,
      isLogin: false,
      error: null
    });
  });
});
