import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { News } from '../News';
import { Spinner } from '../Spinner';
import { Error } from '../Error';
import './NewsPage.css';

export const NewsPage = props => {
  const { isPending, data, getNews, error } = props;

  useEffect(() => getNews(), []);

  return (
    <div>
      <h1>News page</h1>
      {error && <Error error={error} />}
      {isPending && <Spinner text='Loading news...' />}
      {data && (
        <>
          <div>
            Total news: <strong>{data.length}</strong>
          </div>

          <div className='news-list'>
            {data.map(news => (
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
      )}
    </div>
  );
};

NewsPage.propTypes = {
  isPending: PropTypes.bool.isRequired,
  error: PropTypes.string,
  getNews: PropTypes.func.isRequired,
  data: PropTypes.array
};
