import React from 'react';
import PropTypes from 'prop-types';
import debug from '../helpers/debug';

export const NotFound = props => {
  const { location } = props;
  debug('render NotFound');

  return (
    <div>
      Page <strong>{location.pathname}</strong> not found!
    </div>
  );
};

NotFound.propTypes = {
  location: PropTypes.object.isRequired
};
