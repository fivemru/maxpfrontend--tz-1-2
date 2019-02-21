import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import telegram from './icons/telegram.svg';
import twitch from './icons/twitch.svg';
import twitter from './icons/twitter.svg';
import vk from './icons/vk.svg';
import youtube from './icons/youtube.svg';
import web from './icons/web.svg';

const icons = {
  vk,
  telegram,
  web,
  youtube,
  twitter,
  twitch
};

export const Icon = props => {
  const {
    icon,
    width = 24,
    height = 24,
    alt = '',
    hangleNotFound,
    className
  } = props;

  const found = icons[icon];

  useEffect(() => {
    if (!found) hangleNotFound(icon);
  }, []);

  return (
    <>
      {found && (
        <img
          className={className}
          src={found}
          width={width}
          height={height}
          alt={alt}
        />
      )}
    </>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  hangleNotFound: PropTypes.func,
  className: PropTypes.string
};
