import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfilePage from '../../containers/ProfilePage';
import routes from '../../routes';
import './LoginPage.css';

export const LoginPage = props => {
  const { isLogin, isPending, onLogin, error } = props;

  console.log('render LoginPage');

  let loginInput;
  let passwordInput;

  const handleLogin = e => {
    e.preventDefault();
    const login = loginInput.value;
    const pass = passwordInput.value;
    onLogin(login, pass);
  };

  // const { from } = props.location.state || { from: '/profile' };
  const { path: profilePath } = routes.find(
    route => route.component === ProfilePage
  );

  return (
    <>
      {isLogin && <Redirect to={profilePath} />}
      <h1 className='login-form__title'>Authorization</h1>
      <form className='login-form'>
        <label>
          <input
            className='login-form__input'
            name='email'
            type='email'
            placeholder='user@mail.com'
            autoComplete='email'
            defaultValue={sessionStorage.getItem('login')}
            ref={node => (loginInput = node)}
            disabled={isPending}
          />
        </label>
        <label>
          <input
            className='login-form__input'
            name='password'
            type='password'
            placeholder='password'
            autoComplete='current-password'
            defaultValue={sessionStorage.getItem('pass')}
            ref={node => (passwordInput = node)}
            disabled={isPending}
          />
          <button
            className='login-form__btn'
            onClick={handleLogin}
            disabled={isPending}
          >
            login
          </button>

          {error && <p className='error'>{error}</p>}
        </label>
      </form>
    </>
  );
};

LoginPage.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired
};
