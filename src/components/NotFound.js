import React from 'react';

export const NotFound = props => {
  const { location } = props;
  console.log('render NotFound');

  return (
    <div>
      Page <strong>{location.pathname}</strong> not found!
    </div>
  );
};
