import React from 'react';
import PropTypes from 'prop-types';
import debug from '../../helpers/debug';
import './ProfilePage.css';

export const ProfilePage = props => {
  const { isPending, userId, error } = props;

  debug('render ProfilePage');

  return (
    <div>
      <h1>Profile page</h1>
      {isPending && <p>Loading user info #{userId}</p>}
      
      {error && <p className='error'>{error}</p>}
    </div>
  );
};

ProfilePage.propTypes = {
  user: PropTypes.shape({
    isPending: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,
    city: PropTypes.string,
    languages: PropTypes.array,
    social: PropTypes.array,
    error: PropTypes.string
  }),
  getUserInfo: PropTypes.func.isRequired
};
