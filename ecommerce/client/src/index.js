import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import * as serviceWorker from './serviceWorker.js';
import {Provider} from 'react-redux';
import userReducer from'./redux/reducers/user.reducers/user.reducers';

const store = createStore(userReducer);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.register()