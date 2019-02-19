import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from './Header';
import { MainPage } from './MainPage';
import { NewsPage } from './NewsPage';
import { ProfilePage } from './ProfilePage';
import { NotFound } from './NotFound';
import LoginPage from '../containers/LoginPage';
import PrivateRoute from '../containers/PrivateRoute';
import './App.css';
import { onLogin } from '../actions/user';

const App = props => {
  const { onLogin } = props;

  useEffect(() => {
    const login = sessionStorage.getItem('login');
    const pass = sessionStorage.getItem('pass');
    console.log('APP INIT: ', login, pass);

    // try auth
    if (login && pass) {
      //
      onLogin(login, pass);
    }
  }, []);

  console.log('render App');

  return (
    <div className='app'>
      <Router>
        <>
          <Header />
          <main className='app__main app__wrapper'>
            <Switch>
              <Route exact path='/(index\.html)?' component={MainPage} />
              <Route path='/news' component={NewsPage} />
              <PrivateRoute path='/profile' component={ProfilePage} />
              <Route path='/login' component={LoginPage} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </>
      </Router>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
  isPending: user.isPending
});

const mapDispatchToProps = dispatch => ({
  onLogin: (login, password) => dispatch(onLogin(login, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
