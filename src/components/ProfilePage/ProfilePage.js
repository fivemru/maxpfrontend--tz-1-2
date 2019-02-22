import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { UserInfo } from '../UserInfo';
import { Spinner } from '../Spinner';
import debug from '../../helpers/debug';
import './ProfilePage.css';

export const ProfilePage = props => {
  const { isPending, getUserInfo, user, error } = props;

  useEffect(() => getUserInfo(user.userId), []);

  debug('render ProfilePage');

  return (
    <div>
      <h1>Profile page</h1>
      {error && <p className='error'>{error}</p>}
      {isPending && <Spinner text={`Loading profile #${user.userId}...`} />}
      {!error && !isPending && <UserInfo {...user} />}
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
