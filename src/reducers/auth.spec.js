import reducer, { initialState } from './auth';
import * as t from '../constants/ActionTypes';
import errors from '../constants/errors';
import { ResponseError } from '../helpers/errors';

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

  it('LOGIN_FAILED replaces the error message "wrong_email_or_password" from the dictonary', () => {
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

  it('LOGIN_FAILED replaces the error ResponseError("network_error") from the dictonary', () => {
    const state = {
      ...initialState,
      isPending: true,
      isLogin: true,
      error: null
    };
    const action = {
      type: t.LOGIN_FAILED,
      payload: new ResponseError('network_error')
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      isPending: false,
      isLogin: false,
      error: errors['network_error']
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
