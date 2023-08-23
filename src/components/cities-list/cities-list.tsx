import { OfferCard } from '../../mocks/offers';
import CitiesCard from '../cities-card/cities-card';

type CitiesListProps = {
  offers: OfferCard[];
  selectedPlace?: OfferCard;
  onListCardHover?: (offer: OfferCard) => void;
  onListCardMouseOut?: () => void;
}

function CitiesList({offers, onListCardHover, onListCardMouseOut, selectedPlace}: CitiesListProps): JSX.Element {
  let nearPlaces: OfferCard[] = [];

  if (selectedPlace) {
    nearPlaces = offers.filter((offer) => offer.id !== selectedPlace.id);
  }

  return (
    <>
      {(selectedPlace ? nearPlaces : offers).map(
        (offer) =>
          (
            <CitiesCard
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

export default CitiesList;
