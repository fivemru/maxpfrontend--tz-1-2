import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './LoginPage.css';

export const LoginPage = props => {
  const { isLogin, isPending, onLogin, error, location } = props;

  console.log('render LoginPage');

  let loginInput;
  let passwordInput;

  const handleLogin = e => {
    e.preventDefault();
    const login = loginInput.value;
    const pass = passwordInput.value;
    onLogin(login, pass);
  };

  const { from } = location.state || { from: '/profile' };

  return (
    <>
      {isLogin && <Redirect to={from} />}
      <h1 className='login-form__title'>Authorization</h1>
      <form className='login-form'>
        <label>
          <input
            className='login-form__input'
            name='login'
            type='text'
            placeholder='login'
            autoComplete='username'
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
