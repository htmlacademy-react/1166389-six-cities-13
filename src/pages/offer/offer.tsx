import { MemoizedHeader } from '../../components/header/header';
import OfferCommentForm from '../../components/offer-comment-form/offer-comment-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import ErrorPage from '../../pages/error/error';
import { OfferReview } from '../../mocks/reviews';
import { useParams } from 'react-router-dom';
import CitiesList from '../../components/places-list/places-list';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchComments } from '../../store/comments/slice';
import { addFavourite, fetchChoosenOffer, fetchNearbyOffers, updateOfferById } from '../../store/offers/slice';
import { AuthorizationStatus } from '../../const/const';
import { capitalize, setRating } from '../../utils';
import { getChossenOffer, getOffers, getOffersById } from '../../store/offers/selectors';
import { getAuthorizationStatus } from '../../store/auth/selectors';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

type OfferLoggedProps = {
  reviews: OfferReview[];
}

function OfferLogged({reviews}: OfferLoggedProps): JSX.Element {
  const id = useParams().id || '';
  const offers = useSelector(getOffers);
  const offer = useSelector(getOffersById(id));

  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChoosenOffer(id));
    dispatch(fetchComments(id));
    dispatch(fetchNearbyOffers(id));
  }, [dispatch, id]);

  const choosenOffer = useSelector(getChossenOffer);

  if (offer && choosenOffer) {
    const { description, goods, host: { isPro, name, avatarUrl }, images, maxAdults, rating, type, isPremium, price, title, bedrooms } = choosenOffer;
    const { isFavorite } = offer;

    const handleBookmarkClick = () => {
      dispatch(addFavourite({
        offer,
        status: isFavorite ? 0 : 1,
      }));
      dispatch(updateOfferById(offer));
    };

    return (
      <div className="page">
        <MemoizedHeader />
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {images.map(
                  (image) => (
                    <div
                      className="offer__image-wrapper"
                      key={image}
                    >
                      <img
                        className="offer__image"
                        src={image}
                        alt="Place Image"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {isPremium &&
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {title}
                  </h1>
                  <button
                    className={`
                      offer__bookmark-button
                      ${isFavorite ? 'offer__bookmark-button--active' : ''}
                      button
                      `}
                    type="button"
                    onClick={handleBookmarkClick}
                  >
                    <svg
                      className="offer__bookmark-icon"
                      width="31"
                      height="33"
                    >
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: setRating(rating)}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {capitalize(type)}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {goods.map((good) => (
                      <li className="offer__inside-item" key={good}>
                        {good}
                      </li>))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper ${isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                      <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {name}
                    </span>
                    <span className="offer__user-status">
                      {isPro ? 'Pro' : 'Basic'}
                    </span>
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {description}
                    </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                  <ReviewsList />
                  {authorizationStatus === AuthorizationStatus.Auth && <OfferCommentForm />}
                </section>
              </div>
            </div>
            <section className="offer__map map">
              <Map offers={offers} city={offers[0].city} selectedPlace={offer} isOfferPage/>
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <CitiesList selectedPlace={offer}/>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  } else {
    return <ErrorPage />;
  }
}

export default OfferLogged;
