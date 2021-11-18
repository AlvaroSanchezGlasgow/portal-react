import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Zoom from "@material-ui/core/Zoom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    secundary: {
      main: "#707070",
    },
    primary: {
      main: "#005A87",
    },
    danger: {
      main: "#ff5a00",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Zoom>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Zoom>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
