import React from 'react';

export const Error = props => {
  const { error = 'error' } = props;

  return <div className='error'>{error}</div>;
};
