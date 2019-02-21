import React from 'react';
import PropTypes from 'prop-types';
import './UserInfo.css';

export const UserInfo = props => {
  const { userId, city, languages, social } = props;

  return (
    <div>
      <div>ID: {userId}</div>
      <div>City: {city}</div>
      <div>
        Languages:
        <ul>
          {languages.map(lang => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>
      <div>
        Social:
        <ul>
          {social.map(({ label, link }) => (
            <li key={link}>
              <a href='{link'>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  userId: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  languages: PropTypes.array.isRequired,
  social: PropTypes.array.isRequired
};
