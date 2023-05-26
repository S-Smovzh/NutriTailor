import React from 'react';
import ReactDOM from 'react-dom/client';
import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ReduxToastr timeOut={3000} position="top-right" preventDuplicates />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
