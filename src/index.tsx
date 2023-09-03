import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { mockReviews } from './mocks/reviews';
import { Provider } from 'react-redux';
import store from './store';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        reviews = {mockReviews}
      />
    </Provider>
  </React.StrictMode>
);
