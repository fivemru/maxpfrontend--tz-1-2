import React from 'react';
import './Login.css';

export const Login = props => {
  const { isLogin, onLogin, onLogout, className } = props;

  return (
    <div className={className}>
      <button onClick={isLogin ? onLogin : onLogout}>
        {isLogin ? 'Login' : 'Logout'}
      </button>
    </div>
  );
};
