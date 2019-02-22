import React from 'react';

export const Spinner = props => {
  const { text = 'Loading...' } = props;

  return <div>{text}</div>;
};
