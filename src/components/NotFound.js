import React from 'react';
import PropTypes from 'prop-types';

export const NotFound = props => {
  const { location } = props;
  console.log('render NotFound');

  return (
    <div>
      Page <strong>{location.pathname}</strong> not found!
    </div>
  );
};

NotFound.propTypes = {
  location: PropTypes.object.isRequired
};
