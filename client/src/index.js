import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import React from 'react';
import App from './app';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import allReducers from './reducers';
import { logger } from 'redux-logger';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let middleware;

if (process.env.NODE_ENV !== 'production') {
  middleware = applyMiddleware(thunk, logger);
} else {
  middleware = applyMiddleware(thunk);
}

const store = createStore(allReducers, composeEnhancers(middleware));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));