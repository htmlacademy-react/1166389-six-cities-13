import { useEffect, useRef } from 'react';
import Header from '../../components/header/header';
import { login } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AuthData } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { AuthorizationStatus } from '../../const/const';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const authorizationStatus = useSelector(((store: RootState) => store.authSlice.authorizationStatus));

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate('/');
    }
  }, [authorizationStatus, navigate]);

  const onSubmit = (userData: AuthData) => {
    dispatch(login(userData));
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current && passwordRef.current) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" ref={loginRef} required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" ref={passwordRef}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
