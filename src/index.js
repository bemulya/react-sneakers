import React from 'react';
import { BrowserRouter  } from 'react-router-dom' 
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'macro-css'


const root = ReactDOM.createRoot(
  document.getElementById('root')
)

root.render(
 <BrowserRouter>
    <App/>
 </BrowserRouter>
);
