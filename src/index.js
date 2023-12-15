import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter basename="/Snake-Game">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();



{/* <BrowserRouter basename="/Snake-Game">
      <App />
    </BrowserRouter> */}

