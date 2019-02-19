import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

export const Login = props => {
  const { isLogin, isPending, onLogout, className } = props;
  const [redirect, setRedirect] = useState(null);
  console.log('render Login');

  return (
    <div className={className}>
      {redirect && <Redirect to={redirect} />}
      {!isLogin && (
        <button onClick={() => setRedirect('/login')} disabled={isPending}>
          Login
        </button>
      )}
      {isLogin && <button onClick={onLogout}>Logout</button>}
    </div>
  );
};
