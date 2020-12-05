import { CssBaseline, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';

import 'typeface-roboto';
import { darkTheme } from '../themes/dark-theme.js';
import { lightTheme } from '../themes/light-theme.js';
import App from '../app/App';

export default MuiWrappedApp;

MuiWrappedApp.propTypes = {
  children: PropTypes.any,
};

MuiWrappedApp.displayName = 'MuiWrappedApp';

function MuiWrappedApp(props) {
  const { isChangedTheme = false, children } = props;
  const theme = createMuiTheme(isChangedTheme ? darkTheme : lightTheme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children ? children : <App {...props} />}
    </ThemeProvider>
  );
}
