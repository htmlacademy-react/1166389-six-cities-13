import { OfferCard } from '../../mocks/offers';
import CitiesCard from '../cities-card/cities-card';

type CitiesListProps = {
  offers: OfferCard[];
  onListCardHover: (offer: OfferCard) => void;
  onListCardMouseOut: () => void;
}

function CitiesList({offers, onListCardHover, onListCardMouseOut}: CitiesListProps): JSX.Element {

  return (
    <>
      {offers.map(
        (offer) =>
          (
            <CitiesCard
              key={offer.id}
              offer={offer}
              onListCardHover={() => onListCardHover(offer)}
              onListCardMouseOut={() => onListCardMouseOut()}
            />
          )
      )};
    </>
  );
}

export default CitiesList;
