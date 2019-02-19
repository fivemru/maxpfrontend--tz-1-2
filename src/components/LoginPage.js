import React from 'react';

import { Redirect } from 'react-router-dom';
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

    sessionStorage.setItem('login', login);
    sessionStorage.setItem('pass', pass);

    onLogin(login, pass);
  };

  return (
    <>
      {isLogin && <Redirect to='/profile' />}
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
