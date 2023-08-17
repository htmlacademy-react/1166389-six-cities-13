import {
  BrowserRouter as Router,
  Route, Routes} from 'react-router-dom';
import Main from '../../pages/main/main';
import Error from '../../pages/error/error';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../private-route/private-route';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main offersAmount={5} />}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<Offer />}
        />
        <Route
          path={AppRoute.Error}
          element={<Error />}
        />
      </Routes>
    </Router>
  );
}

export default App;
