import reducer, { initialState } from './news';
import * as t from '../constants/ActionTypes';

describe('news reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('NEWS_PENDING after error', () => {
    const state = {
      ...initialState,
      error: 'some error'
    };
    const action = {
      type: t.NEWS_PENDING
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      isPending: true,
      error: null
    });
  });

  it('NEWS_PENDING without error', () => {
    const state = {
      ...initialState,
      error: null
    };
    const action = {
      type: t.NEWS_PENDING
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      isPending: true,
      error: null
    });
  });

  it('NEWS_SUCCESSED', () => {
    const state = {
      ...initialState,
      data: null,
      isPending: true,
      error: 'some error'
    };
    const action = {
      type: t.NEWS_SUCCESSED,
      payload: [1, 2]
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      isPending: false,
      data: action.payload,
      error: null
    });
  });

  it('NEWS_FAILED', () => {
    const state = {
      ...initialState,
      isPending: true,
      error: null
    };
    const action = {
      type: t.NEWS_FAILED,
      payload: 'some error'
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      isPending: false,
      error: action.payload
    });
  });
});
