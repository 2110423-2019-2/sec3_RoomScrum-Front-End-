import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import 'bootstrap/scss/bootstrap.scss';
import * as serviceWorker from './serviceWorker';
import App from './views/app';
import { rootReducer } from 'src/store';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
