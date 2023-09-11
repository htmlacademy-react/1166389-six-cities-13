import Header from '../../components/header/header';
import OfferCommentForm from '../../components/offer-comment-form/offer-comment-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import ErrorPage from '../../pages/error/error';
import { OfferReview } from '../../mocks/reviews';
import { useParams } from 'react-router-dom';
import CitiesList from '../../components/places-list/places-list';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchComments } from '../../store/comments/slice';
import { fetchNearbyOffers } from '../../store/offers/slice';
import { AuthorizationStatus } from '../../const/const';
import { setRating } from '../../utils';
import { getOffers, getOffersById } from '../../store/offers/selectors';
import { getAuthorizationStatus } from '../../store/auth/selectors';

type OfferLoggedProps = {
  reviews: OfferReview[];
}

function OfferLogged({reviews}: OfferLoggedProps): JSX.Element {
  const {id}: {id?: string} = useParams();
  const offers = useSelector(getOffers);
  const currentOffer = useSelector(getOffersById(id));
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(id));
    dispatch(fetchNearbyOffers(id));
  }, [dispatch, id]);

  if (!currentOffer) {
    return <ErrorPage />;
  }

  const { title, price, isFavorite, isPremium, rating } = currentOffer;

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/room.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
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
                  Apartment
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">
                    Wi-Fi
                  </li>
                  <li className="offer__inside-item">
                    Washing machine
                  </li>
                  <li className="offer__inside-item">
                    Towels
                  </li>
                  <li className="offer__inside-item">
                    Heating
                  </li>
                  <li className="offer__inside-item">
                    Coffee machine
                  </li>
                  <li className="offer__inside-item">
                    Baby seat
                  </li>
                  <li className="offer__inside-item">
                    Kitchen
                  </li>
                  <li className="offer__inside-item">
                    Dishwasher
                  </li>
                  <li className="offer__inside-item">
                    Cabel TV
                  </li>
                  <li className="offer__inside-item">
                    Fridge
                  </li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    Angelina
                  </span>
                  <span className="offer__user-status">
                    Pro
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
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
            <Map offers={offers} city={offers[0].city} selectedPlace={currentOffer} isOfferPage/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <CitiesList selectedPlace={currentOffer}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferLogged;
