import React from 'react';
import ReactDOM from 'react-dom';
import StateProvider from './comp/StateProvider';

const rootEl = document.querySelector('#root');
ReactDOM.render(<StateProvider />, rootEl);
if (module.hot) {
  module.hot.accept('./comp/StateProvider', () => {
    const NextApp = require('./comp/StateProvider').default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
