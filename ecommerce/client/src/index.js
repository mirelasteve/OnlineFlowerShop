import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import {persistStore} from 'redux-persist';
import { PersistGate}  from 'redux-persist/integration/react';
import createSagaMiddleware from 'redux-saga';

// import * as serviceWorker from './serviceWorker.js';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
// import logger from 'redux-logger';


import rootReducer from './redux/reducers/index.reducers';
import { fetchCollectionsStartSaga } from './redux/sagas/products/products.sagas';
import rootSaga from './redux/sagas/rootSaga';
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);
const store = createStore(rootReducer,enhancer);

sagaMiddleware.run(rootSaga)
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