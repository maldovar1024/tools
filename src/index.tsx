import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';
import './index.less';

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/tools">
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
