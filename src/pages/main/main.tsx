import Header from '../../components/header/header';
import Map from '../../components/map/map';
import LocationsList from '../../components/cities-list/cities-list';
import { OfferCard } from '../../mocks/offers';
import CitiesList from '../../components/places-list/places-list';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OffersSorting from '../../components/offers-sorting/offers-sorting';
import { fetchOffers } from '../../store/offers/slice';
import { getOffers, getSelectedCity } from '../../store/offers/selectors';

function Main(): JSX.Element {
  const [selectedCard, setActiveCard] = useState<OfferCard | null>(null);
  const activeCity = useSelector(getSelectedCity);
  const offers = useSelector(getOffers);
  const offersForCity = offers.filter((offer) => offer.city.name === activeCity);

  const handleListCardHover = (offer: OfferCard) => {
    setActiveCard(offer);
  };

  const handleListCardMouseOut = () => {
    setActiveCard(null);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);


  const locationForMap = offersForCity[0]?.city;

  const isOffersEmpty = offers.length === 0;

  const noPlacesFound = (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in {activeCity}
        </b>
      </section>
    </div>
  );

  const offersContainer = (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offersForCity.length} places to stay in {activeCity}</b>
        <OffersSorting />
        <div className="cities__places-list places__list tabs__content">
          <CitiesList onListCardHover={handleListCardHover} onListCardMouseOut={handleListCardMouseOut}/>
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map offers={offersForCity} city={locationForMap} selectedPlace={selectedCard}/>
        </section>
      </div>
    </div>
  );

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsList />
        </div>
        <div className="cities">
          {isOffersEmpty ? noPlacesFound : offersContainer}
        </div>
      </main>
    </div>
  );
}

export default Main;
