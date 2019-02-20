import {
  LOGIN_SUCCESSED,
  LOGIN_PENDING,
  LOGIN_FAILED,
  LOGOUT
} from '../constants';

const LOGIN = 'admin';
const PASSWORD = '1234';

export const onLogin = (login, password) => dispatch => {
  dispatch({
    type: LOGIN_PENDING,
    payload: true
  });

  // emulation a request to server
  setTimeout(() => {
    dispatch({ type: LOGIN_PENDING, payload: false });

    if (login === LOGIN && password === PASSWORD) {
      sessionStorage.setItem('login', login);
      sessionStorage.setItem('pass', password);

      dispatch({ type: LOGIN_SUCCESSED });
    } else {
      dispatch({
        type: LOGIN_FAILED,
        payload: new Error('Incorrect login or password'),
        error: true
      });
    }
  }, 500);
};

export const onLogout = () => dispatch => {
  sessionStorage.setItem('login', '');
  sessionStorage.setItem('pass', '');
  dispatch({ type: LOGOUT });
};
