import { NEWS_PENDING, NEWS_SUCCESSED, NEWS_FAILED } from '../constants';
import { httpGet } from '../helpers/network';

export const getNews = cb => dispatch => {
  dispatch({ type: NEWS_PENDING });

  httpGet(`/news`)
    .then(({ data }) => {
      dispatch({ type: NEWS_SUCCESSED, payload: data });
      if (cb instanceof Function) cb(null, data);
    })
    .catch(err => {
      dispatch({ type: NEWS_FAILED, payload: err, error: true });
      if (cb instanceof Function) cb(err);
    });
};
