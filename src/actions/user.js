import {
  LOGIN_SUCCESSED,
  LOGIN_PENDING,
  LOGIN_FAILED,
  LOGOUT,
  API_LOGIN_SUCCESSED_STATUS,
  API_LOGIN_FAILED_STATUS
} from '../constants';
import { ResponseError } from '../helpers/errors';
import { httpPost } from '../helpers/network';

export const onLogin = (login, password) => dispatch => {
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
        const {
          status,
          data,
          message = 'Empty error message from server'
        } = res;

        if (status === API_LOGIN_FAILED_STATUS) {
          throw new ResponseError(message, res);
        }

        if (status !== API_LOGIN_SUCCESSED_STATUS) {
          throw new ResponseError('Unknown validate status from server', res);
        }

        // remember credentials =( (it is better way to use a token instead of a password in plain text)
        sessionStorage.setItem('login', login);
        sessionStorage.setItem('pass', password);

        dispatch({ type: LOGIN_SUCCESSED, payload: data });
      } catch (err) {
        throw err;
      }
    })
    .catch(err => dispatch({ type: LOGIN_FAILED, payload: err, error: true }));
};

export const onLogout = () => dispatch => {
  sessionStorage.setItem('login', '');
  sessionStorage.setItem('pass', '');
  dispatch({ type: LOGOUT });
};
