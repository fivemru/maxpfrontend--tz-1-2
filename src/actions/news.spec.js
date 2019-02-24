import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import { getNews } from './news';
import * as t from '../constants/ActionTypes';
import { API_URL } from '../constants';
import { ResponseError } from '../helpers/errors';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('news action', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('getNews: create action NEWS_PENDING and NEWS_SUCCESSED', () => {
    // api answer
    fetchMock.getOnce(`${API_URL}/news`, {
      body: { status: t.API_SUCCESSED_STATUS, data: [1, 2] }
    });

    const expectedActions = [
      { type: t.NEWS_PENDING },
      {
        type: t.NEWS_SUCCESSED,
        payload: [1, 2]
      }
    ];

    const store = mockStore({});

    return store.dispatch(getNews()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getNews: create action NEWS_FAILED', () => {
    // api answer
    fetchMock.getOnce(`${API_URL}/news`, {
      body: { status: t.API_FAILED_STATUS, message: 'some error' }
    });

    const expectedActions = [
      { type: t.NEWS_PENDING },
      {
        type: t.NEWS_FAILED,
        payload: new ResponseError('some error'),
        error: true
      }
    ];

    const store = mockStore({});

    return store.dispatch(getNews()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
