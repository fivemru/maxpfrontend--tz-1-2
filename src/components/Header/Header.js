import React from 'react';
import { Navigation } from '../Navigation';
import LoginBtn from '../../containers/LoginBtn';
import debug from '../../helpers/debug';
import './Header.css';

export const Header = () => {
  debug('render Header');

  return (
    <header className='header app__wrapper'>
      <Navigation className='header__nav' />
      <LoginBtn className='header__login' />
    </header>
  );
};
