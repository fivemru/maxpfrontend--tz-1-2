import React from 'react';

export const LoginBtn = props => {
  const { isLogin, isPending, onLogout, className, history } = props;

  const from = history.location.pathname;

  return (
    <div className={className}>
      {!isLogin && (
        <button
          onClick={() => history.push('/login', { from })}
          disabled={isPending}
        >
          Login
        </button>
      )}
      {isLogin && <button onClick={onLogout}>Logout</button>}
    </div>
  );
};
