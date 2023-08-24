import { useSelector } from 'react-redux';
import { OfferCard } from '../../mocks/offers';
import PlacesCard from '../places-card/cities-card';
import { InitialStateType } from '../../slices/offersSlice';

type PlacesListProps = {
  offers: OfferCard[];
  selectedPlace?: OfferCard;
  onListCardHover?: (offer: OfferCard) => void;
  onListCardMouseOut?: () => void;
}

function PlacesList({offers, onListCardHover, onListCardMouseOut, selectedPlace}: PlacesListProps): JSX.Element {
  const selectedCity = useSelector(((store: InitialStateType) => store.city));
  let nearPlaces: OfferCard[] = [];

  if (selectedPlace) {
    nearPlaces = offers.filter((offer) => offer.id !== selectedPlace.id);
  }

  const filteredOffers = selectedCity ? offers.filter((offer) => offer.city.name === selectedCity) : offers;

  return (
    <>
      {(selectedPlace ? nearPlaces : filteredOffers).map(
        (offer) =>
          (
            <PlacesCard
              key={offer.id}
              offer={offer}
              onListCardHover={onListCardHover ? () => onListCardHover(offer) : undefined}
              onListCardMouseOut={onListCardMouseOut ? () => onListCardMouseOut() : undefined}
            />
          )
      )};
    </>
  );
}

export default PlacesList;
