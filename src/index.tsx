import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { mockReviews } from './mocks/reviews';
import { Provider } from 'react-redux';
import store from './store';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history/browser-history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App
          reviews = {mockReviews}
        />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
