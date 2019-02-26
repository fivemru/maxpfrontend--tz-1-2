import React from 'react';
import PropTypes from 'prop-types';

export const ErrorMsg = props => {
  const { error } = props;

  return <div className="error">{error}</div>;
};

ErrorMsg.propTypes = {
  error: PropTypes.string.isRequired,
};
