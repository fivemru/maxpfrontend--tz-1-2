import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = props => {
  const { isLogin, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={componentProps =>
        isLogin ? (
          <Component {...componentProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: componentProps.location }
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => {
  return {
    isLogin: user.isLogin
  };
};

export default connect(mapStateToProps)(PrivateRoute);
