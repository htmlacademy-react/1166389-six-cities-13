import { Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import Error from '../../pages/error/error';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import { AppRoute } from '../../const/const';
import PrivateRoute from '../private-route/private-route';
import { OfferReview } from '../../mocks/reviews';
import browserHistory from '../../browser-history/browser-history';
import HistoryRouter from '../history-route/history-route';

type AppProps = {
  reviews: OfferReview[];
}

function App({ reviews}: AppProps) {

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main />}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={
            <Offer reviews={reviews} />
          }
        />
        <Route
          path={AppRoute.Error}
          element={<Error />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
