import {
  USER_INFO_PENDING,
  USER_INFO_SUCCESSED,
  USER_INFO_FAILED
} from '../constants';
import { httpGet } from '../helpers/network';

export const getUserInfo = (id, cb) => dispatch => {
  dispatch({ type: USER_INFO_PENDING });

  httpGet(`/user-info/${id}`)
    .then(({ data }) => {
      dispatch({ type: USER_INFO_SUCCESSED, payload: data });
      if (cb instanceof Function) cb(null, data);
    })
    .catch(err => {
      dispatch({ type: USER_INFO_FAILED, payload: err, error: true });
      if (cb instanceof Function) cb(err);
    });
};
