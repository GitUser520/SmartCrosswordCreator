import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";
import './index.css';
import App from './App';
import Menu from './Menu'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="app" element={<App />} />
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
