import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import { authLogin, authLogout } from './auth';
import * as t from '../constants/ActionTypes';
import { API_URL } from '../constants';
import { ResponseError } from '../helpers/errors';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth action', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('authLogin: create action LOGIN_PENDING and LOGIN_SUCCESSED', () => {
    // api answer
    fetchMock.postOnce(`${API_URL}/validate`, {
      headers: { 'Content-type': 'application/json' },
      body: { status: t.API_SUCCESSED_STATUS, data: { id: 1 } }
    });

    const expectedActions = [
      { type: t.LOGIN_PENDING },
      {
        type: t.LOGIN_SUCCESSED,
        payload: { id: 1 }
      }
    ];

    const store = mockStore({});
    const args = { login: '', password: '' };

    return store.dispatch(authLogin(args)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('authLogin: create action LOGIN_FAILED when received error status and error message from server', () => {
    // api answer
    fetchMock.postOnce(`${API_URL}/validate`, {
      headers: { 'Content-type': 'application/json' },
      body: { status: t.API_FAILED_STATUS, message: 'wrong_email_or_password' }
    });

    const expectedActions = [
      { type: t.LOGIN_PENDING },
      {
        type: t.LOGIN_FAILED,
        payload: new ResponseError('wrong_email_or_password'),
        error: true
      }
    ];

    const store = mockStore({});
    const args = { login: '', password: '' };

    return store.dispatch(authLogin(args)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('authLogin: create action LOGIN_FAILED when received unknown status from server', () => {
    // api answer
    fetchMock.postOnce(`${API_URL}/validate`, {
      headers: { 'Content-type': 'application/json' },
      body: { status: 'some unknown status' }
    });

    const expectedActions = [
      { type: t.LOGIN_PENDING },
      {
        type: t.LOGIN_FAILED,
        payload: new ResponseError('unknown_server_status'),
        error: true
      }
    ];

    const store = mockStore({});
    const args = { login: '', password: '' };

    return store.dispatch(authLogin(args)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('authLogin: create action LOGIN_FAILED when received error status but empty error message', () => {
    // api answer
    fetchMock.postOnce(`${API_URL}/validate`, {
      headers: { 'Content-type': 'application/json' },
      body: { status: t.API_FAILED_STATUS }
    });

    const expectedActions = [
      { type: t.LOGIN_PENDING },
      {
        type: t.LOGIN_FAILED,
        payload: new ResponseError('empty_message_from_server'),
        error: true
      }
    ];

    const store = mockStore({});
    const args = { login: '', password: '' };

    return store.dispatch(authLogin(args)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('authLogin: create action LOGIN_FAILED when network error (404)', () => {
    // api answer
    fetchMock.postOnce(`${API_URL}/validate`, 404);

    const expectedActions = [
      { type: t.LOGIN_PENDING },
      {
        type: t.LOGIN_FAILED,
        payload: new ResponseError('network_error'),
        error: true
      }
    ];

    const store = mockStore({});
    const args = { login: '', password: '' };

    return store.dispatch(authLogin(args)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('authLogout: create action LOGOUT', () => {
    const expectedActions = [{ type: t.LOGOUT }];

    const store = mockStore({});

    store.dispatch(authLogout());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
