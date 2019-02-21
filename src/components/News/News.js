import React from 'react';
import PropTypes from 'prop-types';
import './News.css';

export const News = props => {
  const { className, id, title, text } = props;

  return (
    <div className={`news ${className}`}>
      <h2 className='news__title'>
        #{id} {title}
      </h2>
      <div className='news__text'>{text}</div>
    </div>
  );
};

News.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
