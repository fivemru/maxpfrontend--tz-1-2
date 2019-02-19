import React from 'react';
import { Navigation } from './Navigation';
import Login from '../containers/Login';
import './Header.css';

export const Header = props => {
  console.log('render Header');

  return (
    <header className='header app__wrapper'>
      <Navigation className='header__nav' />
      <Login className='header__login' />
    </header>
  );
};
