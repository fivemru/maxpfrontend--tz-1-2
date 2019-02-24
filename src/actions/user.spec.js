import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import { getUserInfo } from './user';
import * as t from '../constants/ActionTypes';
import { API_URL } from '../constants';
import { ResponseError } from '../helpers/errors';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user action', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('getUserInfo: create action USER_INFO_PENDING and USER_INFO_SUCCESSED', () => {
    // api answer
    fetchMock.getOnce(`${API_URL}/user-info/123`, {
      body: { status: t.API_SUCCESSED_STATUS, data: [1, 2] }
    });

    const expectedActions = [
      { type: t.USER_INFO_PENDING },
      {
        type: t.USER_INFO_SUCCESSED,
        payload: [1, 2]
      }
    ];

    const store = mockStore({});

    return store.dispatch(getUserInfo(123)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getUserInfo: create action USER_INFO_FAILED', () => {
    // api answer
    fetchMock.getOnce(`${API_URL}/user-info/123`, {
      body: { status: t.API_FAILED_STATUS, message: 'user_not_found' }
    });

    const expectedActions = [
      { type: t.USER_INFO_PENDING },
      {
        type: t.USER_INFO_FAILED,
        payload: new ResponseError('user_not_found'),
        error: true
      }
    ];

    const store = mockStore({});

    return store.dispatch(getUserInfo(123)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
