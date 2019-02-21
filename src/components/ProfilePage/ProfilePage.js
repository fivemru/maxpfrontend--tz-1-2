import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { UserInfo } from '../UserInfo';
import debug from '../../helpers/debug';
import './ProfilePage.css';

export const ProfilePage = props => {
  const { isPending, getUserInfo, user, error } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getUserInfo(user.userId, err => {
      if (!err) {
        setIsLoaded(true);
      }
    });
  }, []);

  debug('render ProfilePage');

  return (
    <div>
      <h1>Profile page</h1>
      {isPending && <p>Loading user info #{user.userId}...</p>}
      {isLoaded && <UserInfo {...user} />}
      {error && <p className='error'>{error}</p>}
    </div>
  );
};

ProfilePage.propTypes = {
  isPending: PropTypes.bool.isRequired,
  error: PropTypes.string,
  getUserInfo: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    city: PropTypes.string,
    languages: PropTypes.array,
    social: PropTypes.array
  })
};
