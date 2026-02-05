import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n/i18n';

import { Windmill } from '@windmill/react-ui';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Windmill>
        <App />
      </Windmill>
    </BrowserRouter>
  </React.StrictMode>
);
