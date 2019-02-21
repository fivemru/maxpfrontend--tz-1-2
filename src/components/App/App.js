import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Header } from '../Header';
import PrivateRoute from '../../containers/PrivateRoute';
import routes from '../../routes';
import './App.css';

export const App = props => {
  const { onLogin } = props;

  useEffect(() => {
    const login = sessionStorage.getItem('login');
    const password = sessionStorage.getItem('password');
    console.log('APP INIT: ', login, password);

    // try auth on init
    if (login && password) {
      onLogin({ login, password });
    }
  }, []);

  console.log('render App');

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
