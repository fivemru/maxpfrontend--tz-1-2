import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../routes';
import './Navigation.css';

export const Navigation = props => {
  const { className } = props;
  console.log('render Navigation');

  return (
    <nav className={`nav ${className}`}>
      {routes
        .filter(({ isNav }) => isNav)
        .map(({ path, isExact, link = {} }) => {
          const to = link.to || path;

          return (
            <NavLink
              key={to}
              exact={isExact}
              className='nav__link'
              activeClassName='nav__link--active'
              to={to}
            >
              {link.text}
            </NavLink>
          );
        })}
    </nav>
  );
};
