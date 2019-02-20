import React from 'react';
import './News.css';

export const News = props => {
  const { className, title, image, date } = props;

  const [dateFormatted] = date.split('T');

  return (
    <div className={`news ${className}`}>
      <img
        className='news__image'
        src={image}
        width='128'
        height='128'
        alt={title}
      />
      <div className='news__date'>{dateFormatted}</div>
      <h2 className='news__title'>{title}</h2>
    </div>
  );
};
