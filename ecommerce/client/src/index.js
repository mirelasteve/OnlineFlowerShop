import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
// import * as serviceWorker from './serviceWorker.js';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';


import rootReducer from './redux/reducers/index.reducers';
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk,logger),
);
const store = createStore(rootReducer,enhancer);

ReactDOM.render(

    <Provider store={store}>
      <App />
    </Provider>
,
  document.getElementById('root')
);


// serviceWorker.register()