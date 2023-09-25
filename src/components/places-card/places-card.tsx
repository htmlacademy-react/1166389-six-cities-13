import { OfferCard } from '../../mocks/offers';
import {Link} from 'react-router-dom';
import { setRating } from '../../utils';
import { addFavourite, updateOfferById } from '../../store/offers/slice';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getAuthorizationStatus } from '../../store/auth/selectors';
import { useSelector } from 'react-redux';
import { APIRoute, AuthorizationStatus } from '../../const/const';
import { useState } from 'react';
import { redirectToRoute } from '../../store/auth/slice';

type PlacesCardProps = {
  offer: OfferCard;
  onListCardHover?: (offer: OfferCard) => void;
  onListCardMouseOut?: () => void;
}

function PlacesCard({offer, onListCardHover, onListCardMouseOut}: PlacesCardProps): JSX.Element {
  const { id, title, type, price, rating, previewImage, isPremium, isFavorite } = offer;
  const isAuth = useSelector(getAuthorizationStatus);
  const [isFavoriteLocal, setIsFavoriteLocal] = useState(isFavorite);

  const dispatch = useAppDispatch();
  const handleBookmarkClick = () => {
    if (isAuth !== AuthorizationStatus.Auth){
      dispatch(redirectToRoute(APIRoute.Login));
    } else {
      try {
        dispatch(addFavourite({
          offer,
          status: isFavoriteLocal ? 0 : 1,
        }));
      } finally {
        dispatch(updateOfferById(offer));
        setIsFavoriteLocal((prevFavoriteLocal) => !prevFavoriteLocal);
      }
    }
  };

  return (
    <article className="cities__card place-card" onMouseOver={onListCardHover ? () => onListCardHover(offer) : undefined} onMouseOut={onListCardMouseOut ? () => onListCardMouseOut() : undefined} data-testid="places-card-element">
      { isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : '' }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={{ pathname: `/offer/${id}` }}>
          <img className="place-card__image" src={ previewImage } width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{ price }</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${ isAuth === AuthorizationStatus.Auth && isFavoriteLocal ? 'place-card__bookmark-button--active' : ''} button`} type="button" onClick={handleBookmarkClick}>
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
          <Link to={{ pathname: `/offer/${id}` }}>{title}</Link>
        </h2>
        <p className="place-card__type">{ type }</p>
      </div>
    </article>
  );
}

export default PlacesCard;
