import { Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import Error from '../../pages/error/error';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import PrivateRoute from '../private-route/private-route';
import { OfferReview } from '../../mocks/reviews';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Spinner from '../spinner/spinner';
import browserHistory from '../../browser-history/browser-history';
import HistoryRouter from '../history-route/history-route';

type AppProps = {
  reviews: OfferReview[];
}

function App({ reviews}: AppProps) {
  const authorizationStatus = useSelector(((store: RootState) => store.authSlice.authorizationStatus));

  if (authorizationStatus !== AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

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
