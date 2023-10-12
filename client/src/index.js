import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
