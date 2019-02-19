import React from 'react';
import './Login.css';

export const Login = props => {
  const { isLogin, isPending, onLogout, className, history } = props;

  console.log('render Login');

  return (
    <div className={className}>
      {!isLogin && (
        <button onClick={() => history.push('/login')} disabled={isPending}>
          Login
        </button>
      )}
      {isLogin && <button onClick={onLogout}>Logout</button>}
    </div>
  );
};
