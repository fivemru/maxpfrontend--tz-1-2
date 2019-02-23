import * as t from '../constants/ActionTypes';
import { httpGet } from '../helpers/network';

export const getUserInfo = (id, cb) => dispatch => {
  dispatch({ type: t.USER_INFO_PENDING });

  httpGet(`/user-info/${id}`)
    .then(({ data }) => {
      dispatch({ type: t.USER_INFO_SUCCESSED, payload: data });
      if (cb instanceof Function) cb(null, data);
    })
    .catch(err => {
      dispatch({ type: t.USER_INFO_FAILED, payload: err, error: true });
      if (cb instanceof Function) cb(err);
    });
};
