import { isTs } from "../args.js";
export const Main = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')${isTs ? '!' : ''}).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
`