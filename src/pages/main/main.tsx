import Header from '../../components/header/header';
import Map from '../../components/map/map';
import LocationsList from '../../components/cities-list/cities-list';
import { OfferCard } from '../../mocks/offers';
import CitiesList from '../../components/places-list/places-list';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { InitialStateType } from '../../slices/offersSlice';

type MainProps = {
  offers: OfferCard[];
}

function Main({ offers }: MainProps): JSX.Element {
  const [selectedCard, setActiveCard] = useState<OfferCard | null>(null);
  const activeCity = useSelector(((store: InitialStateType) => store.city));
  const offersForCity = offers.filter((offer) => offer.city.name === activeCity);

  const handleListCardHover = (offer: OfferCard) => {
    setActiveCard(offer);
  };

  const handleListCardMouseOut = () => {
    setActiveCard(null);
  };

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsList />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersForCity.length} places to stay in {activeCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <CitiesList offers={offers} onListCardHover={handleListCardHover} onListCardMouseOut={handleListCardMouseOut}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offers} city={offers[0].city} selectedPlace={selectedCard}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
