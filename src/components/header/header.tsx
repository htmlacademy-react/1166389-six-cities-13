import { useSelector } from 'react-redux';
import { getAuthorizationStatus, getUserInfo } from '../../store/auth/selectors';
import Logo from '../logo/logo';
import { AuthorizationStatus } from '../../const/const';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { logout } from '../../store/auth/slice';
import { SyntheticEvent, memo } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getFavouriteOffers } from '../../store/offers/selectors';

function Header(): JSX.Element{
  const {email, avatarUrl } = useSelector(getUserInfo);
  const authStatus = useSelector(getAuthorizationStatus);
  const favoritesAmount = useSelector(getFavouriteOffers);
  const location = useLocation();

  const dispatch = useAppDispatch();

  const signOutButtonHandler = (evt: SyntheticEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logout());
  };

  return (
    <header className="header" data-testid="header-element">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {location.pathname !== '/login' ?
            <nav className="header__nav">
              <ul className="header__nav-list">
                { authStatus === AuthorizationStatus.Auth ?
                  <>
                    <li className="header__nav-item user">
                      <Link to="/favorites" className="header__nav-link header__nav-link--profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img className="header__avatar user__avatar" src={avatarUrl} alt="Avatar" style={{borderRadius: '50%'}} />
                        </div>
                        <span className="header__user-name user__name">{email}</span>
                        <span className="header__favorite-count">{favoritesAmount.length}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link to="/" onClick={signOutButtonHandler} className="header__nav-link">
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>
                  :
                  <li className="header__nav-item">
                    <Link to="/login" className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Log in</span>
                    </Link>
                  </li>}
              </ul>
            </nav> : ''}
        </div>
      </div>
    </header>
  );
}

export const MemoizedHeader = memo(Header);
