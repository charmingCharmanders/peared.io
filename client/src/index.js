import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import React from 'react';
import App from './app';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import allReducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const middleware = applyMiddleware(thunk, logger);
const store = createStore(allReducers, composeEnhancers(middleware));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));