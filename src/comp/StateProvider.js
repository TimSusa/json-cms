import React from 'react';
import App from './MuiProvider.js';
import { Provider } from 'react-redux';
import { store } from '../global-state';

export function StateProvider(props) {
  return (
    <Provider store={store}>
      <App {...props}>{props.children}</App>
    </Provider>
  );
}
StateProvider.displayName = 'StateProvider';
export default StateProvider;
