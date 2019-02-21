import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { News } from '../News';
import './NewsPage.css';

export const NewsPage = props => {
  const { isPending, data, getNews, error } = props;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getNews(err => {
      if (!err) {
        setIsLoaded(true);
      }
    });
  }, []);

  return (
    <>
      <h1>News page</h1>
      {isLoaded && (
        <div>
          Total news: <strong>{data.length}</strong>
        </div>
      )}
      <div className='news-list'>
        {isPending && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {isLoaded &&
          data.map(news => (
            <News
              key={news.id}
              id={news.id}
              title={news.title}
              text={news.text}
              className='news-list__item'
            />
          ))}
      </div>
    </>
  );
};

NewsPage.propTypes = {
  isPending: PropTypes.bool.isRequired,
  error: PropTypes.string,
  getNews: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
};
