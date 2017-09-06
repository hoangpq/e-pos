import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV === 'production') {
  const App = require('./App').default;
  ReactDOM.render(
    <App/>,
    document.querySelector('#root')
  );
} else {
  if (module.hot) {
    const App = require('./App').default;
    ReactDOM.render(
      <App/>,
      document.querySelector('#root')
    );
  }
}
