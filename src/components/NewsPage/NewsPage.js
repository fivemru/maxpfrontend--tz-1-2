import React, { useEffect, useState } from 'react';
import { News } from '../News';
import { httpGet } from '../../helpers/network';
import './NewsPage.css';

export const NewsPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    httpGet('news?p=2&l=4')
      .then(res => setData(res.items))
      .catch(err => setData(err.toString()))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='news-list'>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data.map(news => (
        <News
          key={news.id}
          className='news-list__item'
          title={news.title}
          text={news.text}
          date={news.date}
          image={news.image}
        />
      ))}
    </div>
  );
};
