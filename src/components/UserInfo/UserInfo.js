import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../Icon';
import debug from '../../helpers/debug';
import './UserInfo.css';

export const UserInfo = props => {
  const { userId, city, languages, social } = props;

  const hangleIconNotFound = icon => {
    debug(`icon ${icon} not found`);
  };

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
        <ul className='social'>
          {social.map(({ label, link }) => (
            <li key={link} className='social__item'>
              <a href={link}>
                <Icon
                  className='social__icon'
                  icon={label}
                  alt={label}
                  hangleNotFound={hangleIconNotFound}
                />
                {label}
              </a>
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
