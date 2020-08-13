import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import {persistStore} from 'redux-persist';
import { PersistGate}  from 'redux-persist/integration/react';

// import * as serviceWorker from './serviceWorker.js';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
// import logger from 'redux-logger';


import rootReducer from './redux/reducers/index.reducers';
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk),
);
const store = createStore(rootReducer,enhancer);

const persistor = persistStore(store);

ReactDOM.render(

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
      
    </Provider>
,
  document.getElementById('root')
);


// serviceWorker.register()