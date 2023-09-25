import { Link } from 'react-router-dom';
import { OfferCard } from '../../mocks/offers';
import { setRating } from '../../utils';
import { addFavourite, updateOfferById } from '../../store/offers/slice';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

type FavoritesCardProps = {
  offer: OfferCard;
}

function FavoritesCard({offer}: FavoritesCardProps): JSX.Element {
  const { id, title, type, price, rating, previewImage, isFavorite } = offer;
  const dispatch = useAppDispatch();

  const handleBookmarkClick = () => {
    dispatch(addFavourite({
      offer,
      status: isFavorite ? 0 : 1,
    }));
    dispatch(updateOfferById(offer));
  };

  return (
    <article className="favorites__card place-card" data-testid="favorites-card-element">
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`offer/${id}`}>
          <img className="place-card__image" src={ previewImage } width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button" onClick={handleBookmarkClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: setRating(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`offer/${id}`}>{ title }</Link>
        </h2>
        <p className="place-card__type">{ type }</p>
      </div>
    </article>
  );
}

export default FavoritesCard;
