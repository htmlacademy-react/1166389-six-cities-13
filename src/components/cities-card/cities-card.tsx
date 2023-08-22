import { OfferCard } from '../../mocks/offers';
import {Link} from 'react-router-dom';

type CitiesCardProps = {
  offer: OfferCard;
  onListCardHover: (offer: OfferCard) => void;
  onListCardMouseOut: () => void;
}

function CitiesCard({offer, onListCardHover, onListCardMouseOut}: CitiesCardProps): JSX.Element {
  const { id, title, type, price, rating, previewImage } = offer;

  const setRating = (cardRating: number) => {
    switch (true) {
      case cardRating === 0:
        return '0%';
      case cardRating === 1:
        return '20%';
      case cardRating === 2:
        return '40%';
      case cardRating === 3:
        return '60%';
      case cardRating === 4:
        return '80%';
      case cardRating === 5:
        return '100%';
      default:
        return '0%';
    }
  };

  return (
    <article className="cities__card place-card" onMouseOver={() => onListCardHover(offer)} onMouseOut={() => onListCardMouseOut()}>
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`offer/${id}`}>
          <img className="place-card__image" src={ previewImage } width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{ price }</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: setRating(rating)}} />
            <span className="visually-hidden">{ rating }</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{ type }</p>
      </div>
    </article>
  );
}

export default CitiesCard;
