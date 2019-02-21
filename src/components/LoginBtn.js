import React from 'react';
import PropTypes from 'prop-types';

export const LoginBtn = props => {
  const { isLogin, isPending, authLogout, className, history } = props;

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
      {isLogin && <button onClick={authLogout}>Logout</button>}
    </div>
  );
};

LoginBtn.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
  authLogout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
