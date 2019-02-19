import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const middlewares = [];

// logger
if (process.env.NODE_ENV === `development`) {
  const logger = createLogger({
    duration: true,
    diff: true
  });
  middlewares.push(logger);
}

middlewares.push(thunk);

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
