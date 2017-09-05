import React from 'react';
import ReactDOM from 'react-dom';

if (module.hot) {
  const App = require('./App').default;
  ReactDOM.render(
    <App products={products}/>,
    document.querySelector('#root')
  );
}
