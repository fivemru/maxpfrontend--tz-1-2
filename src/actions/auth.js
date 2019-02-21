import {
  API_SUCCESSED_STATUS,
  API_FAILED_STATUS,
  LOGIN_PENDING,
  LOGIN_SUCCESSED,
  LOGIN_FAILED,
  LOGOUT
} from '../constants';
import { ResponseError } from '../helpers/errors';
import { httpPost } from '../helpers/network';

export const authLogin = ({ login, password }, cb) => dispatch => {
  dispatch({ type: LOGIN_PENDING });

  // post data
  const postData = { email: login, password };

  // request options
  const options = {
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  };

  httpPost('/validate', options)
    .then(res => {
      try {
        const { status, data, message = 'Empty message from server' } = res;

        if (status === API_FAILED_STATUS) {
          throw new ResponseError(message, res);
        }

        if (status !== API_SUCCESSED_STATUS) {
          throw new ResponseError('Unknown server status', res);
        }

        // remember credentials =( (it is better way to use a token instead of a password in plain text)
        sessionStorage.setItem('login', login);
        sessionStorage.setItem('password', password);

        dispatch({ type: LOGIN_SUCCESSED, payload: data });

        if (cb instanceof Function) cb(null, data);
      } catch (err) {
        throw err;
      }
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILED, payload: err, error: true });
      if (cb instanceof Function) cb(err);
    });
};

export const authLogout = () => dispatch => {
  sessionStorage.setItem('password', '');
  dispatch({ type: LOGOUT });
};
