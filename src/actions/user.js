import {
  API_SUCCESSED_STATUS,
  API_FAILED_STATUS,
  USER_INFO_PENDING,
  USER_INFO_SUCCESSED,
  USER_INFO_FAILED
} from '../constants';
import { ResponseError } from '../helpers/errors';
import { httpGet } from '../helpers/network';

export const getUserInfo = (id, cb) => dispatch => {
  dispatch({ type: USER_INFO_PENDING });

  httpGet(`/user-info/${id}`)
    .then(res => {
      try {
        const { status, data, message = 'Empty message from server' } = res;

        if (status === API_FAILED_STATUS) {
          throw new ResponseError(message, res);
        }

        if (status !== API_SUCCESSED_STATUS) {
          throw new ResponseError('Unknown server status', res);
        }

        dispatch({ type: USER_INFO_SUCCESSED, payload: data });

        if (cb instanceof Function) cb(null, data);
      } catch (err) {
        throw err;
      }
    })
    .catch(err => {
      dispatch({ type: USER_INFO_FAILED, payload: err, error: true });
      if (cb instanceof Function) cb(err);
    });
};
