import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from '../src/App';
import 'macro-css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>  
    <App />
  </React.StrictMode>
);
