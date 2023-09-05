import {Navigate} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(((store: RootState) => store.authSlice.authorizationStatus));

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );

}

export default PrivateRoute;
