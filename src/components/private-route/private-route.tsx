import {Navigate} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/auth/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );

}

export default PrivateRoute;
