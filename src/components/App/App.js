import React, { useEffect } from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import { Header } from '../Header';
import PrivateRoute from '../../containers/PrivateRoute';
import routes from '../../routes';
import debug from '../../helpers/debug';
import './App.css';

export const App = props => {
  const { authLogin } = props;

  useEffect(() => {
    const login = sessionStorage.getItem('login');
    const password = sessionStorage.getItem('password');
    debug('APP INIT: ', login, password);

    // try auth on init
    if (login && password) {
      authLogin({ login, password });
    }
  }, []);

  debug('render App');

  return (
    <Router>
      <div className='app'>
        <Header />
        <main className='app__main app__wrapper'>
          <Switch>
            {routes.map(({ isPrivate, component, path, isExact }) => {
              const RouteComponent = isPrivate ? PrivateRoute : Route;
              return (
                <RouteComponent
                  key={component}
                  exact={isExact}
                  path={path}
                  component={component}
                />
              );
            })}
          </Switch>
        </main>
      </div>
    </Router>
  );
};
