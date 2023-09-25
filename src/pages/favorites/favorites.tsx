import { useSelector } from 'react-redux';
import FavoritesCard from '../../components/favorites-card/favorites-card';
import { MemoizedHeader } from '../../components/header/header';
import { getFavouriteOffers } from '../../store/offers/selectors';
import { CITIES } from '../../const/const';

function Favorites(): JSX.Element {
  const favoriteOffers = useSelector(getFavouriteOffers);

  return (
    <div className={`page ${favoriteOffers.length === 0 ? 'page--favorites-empty' : ''}`}>
      <MemoizedHeader />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {CITIES.map((city) => {
                const cityFavoriteOffers = favoriteOffers.filter((offer) => offer.city.name === city);
                if (cityFavoriteOffers.length > 0) {
                  return (
                    <li key={city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {cityFavoriteOffers.map((offer) => (
                          <FavoritesCard key={offer.id} offer={offer} />
                        ))}
                      </div>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
