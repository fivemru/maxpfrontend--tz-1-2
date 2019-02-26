import React from 'react';
import { shallow } from 'enzyme';
import { render } from 'react-testing-library';
import { NewsPage } from './NewsPage';
import { ErrorMsg } from '../ErrorMsg';
import { Spinner } from '../Spinner';
import { News } from '../News';

describe('News page', () => {
  const initProps = {
    isPending: false,
    error: null,
    data: [],
    getNews: () => {},
  };

  describe('initial', () => {
    const mockGetNews = jest.fn();
    const props = { ...initProps, getNews: mockGetNews };

    const newsPage = shallow(<NewsPage {...props} />);

    it('not render <ErrorMsg />', () => {
      expect(newsPage.find(ErrorMsg)).toHaveLength(0);
    });

    it('not render <Spinner />', () => {
      expect(newsPage.find(Spinner)).toHaveLength(0);
    });

    it('not render News', () => {
      expect(newsPage.find(News)).toHaveLength(0);
    });

    it('render <NewsPage />', () => {
      expect(newsPage).toHaveLength(1);
    });

    it('getNews has been called 1 times', () => {
      render(<NewsPage {...props} />);
      expect(mockGetNews).toBeCalledTimes(1);
    });
  });

  describe('pending', () => {
    const props = { ...initProps, isPending: true };

    const newsPage = shallow(<NewsPage {...props} />);

    it('not render <ErrorMsg />', () => {
      expect(newsPage.find(ErrorMsg)).toHaveLength(0);
    });

    it('render <Spinner />', () => {
      expect(newsPage.find(Spinner)).toHaveLength(1);
    });

    it('not render <News />', () => {
      expect(newsPage.find(News)).toHaveLength(0);
    });
  });

  describe('has error', () => {
    const props = { ...initProps, error: 'some error' };

    const newsPage = shallow(<NewsPage {...props} />);

    it('render <ErrorMsg />', () => {
      // expect(newsPage.find(ErrorMsg).prop('error')).toEqual(props.error);
      expect(
        newsPage
          .find(ErrorMsg)
          .shallow()
          .text()
      ).toEqual(props.error);
    });

    it('not render <Spinner />', () => {
      expect(newsPage.find(Spinner)).toHaveLength(0);
    });

    it('not render <News />', () => {
      expect(newsPage.find(News)).toHaveLength(0);
    });

    it('toMatchSnapshot', () => {
      expect(newsPage).toMatchSnapshot();
    });
  });

  describe('has news', () => {
    const props = {
      ...initProps,
      data: [
        { id: 1, title: 'some title 1', text: 'some text 1' },
        { id: 2, title: 'some title 2', text: 'some text 2' },
      ],
    };

    const newsPage = shallow(<NewsPage {...props} />);

    it('not render <ErrorMsg />', () => {
      expect(newsPage.find(ErrorMsg)).toHaveLength(0);
    });

    it('not render <Spinner />', () => {
      expect(newsPage.find(Spinner)).toHaveLength(0);
    });

    it('rendered 2 <News />', () => {
      expect(newsPage.find(News)).toHaveLength(2);
    });
  });
});
