import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from './Header';
import { MainPage } from './MainPage';
import { NewsList } from './NewsList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Router>
          <>
            <Header />
            <main className='app__main app__wrapper'>
              <Switch>
                <Route exact path='/' component={MainPage} />
                <Route path='/news' component={NewsList} />
              </Switch>
            </main>
          </>
        </Router>
      </div>
    );
  }
}

export default App;
