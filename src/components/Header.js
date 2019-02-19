import React from 'react';
import { Navigation } from './Navigation';
import { Login } from './Login';
import './Header.css';

export const Header = props => {
  return (
    <header className='header app__wrapper'>
      <Navigation className='header__nav' />
      <Login className='header__login' />
    </header>
  );
};
