import * as t from '../constants/ActionTypes';
import { httpGet } from '../helpers/network';

export const getNews = cb => dispatch => {
  dispatch({ type: t.NEWS_PENDING });

  httpGet(`/news`)
    .then(({ data }) => {
      dispatch({ type: t.NEWS_SUCCESSED, payload: data });
      if (cb instanceof Function) cb(null, data);
    })
    .catch(err => {
      dispatch({ type: t.NEWS_FAILED, payload: err, error: true });
      if (cb instanceof Function) cb(err);
    });
};
