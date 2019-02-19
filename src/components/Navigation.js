import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

export const Navigation = props => {
  const { className } = props;

  return (
    <nav className={`nav ${className}`}>
      <NavLink
        exact
        className='nav__link'
        activeClassName='nav__link--active'
        to='/'
      >
        Main
      </NavLink>
      <NavLink
        className='nav__link'
        activeClassName='nav__link--active'
        to='/news'
      >
        News
      </NavLink>
      <NavLink
        className='nav__link'
        activeClassName='nav__link--active'
        to='/profile'
      >
        Profile
      </NavLink>
    </nav>
  );
};
