import { Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import Error from '../../pages/error/error';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import { AppRoute } from '../../const/const';
import PrivateRoute from '../private-route/private-route';
import { OfferReview } from '../../mocks/reviews';
import { checkAuth } from '../../store/auth/slice';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import {getToken} from '../../services/token';
import { HelmetProvider } from 'react-helmet-async';

type AppProps = {
  reviews: OfferReview[];
}

function App({ reviews }: AppProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <HelmetProvider>
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
    </HelmetProvider>
  );
}

export default App;
