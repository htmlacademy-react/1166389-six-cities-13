import { useState } from 'react';
import { OfferCard } from '../../mocks/offers';
import CitiesCard from '../cities-card/cities-card';

type CitiesListProps = {
  offers: OfferCard[];
}

function CitiesList({offers}: CitiesListProps): JSX.Element {
  const [, setActiveCard] = useState<OfferCard | null>(null);

  const handleMouseOver = (offer: OfferCard) => {
    setActiveCard(offer);
  };

  return (
    <>
      {offers.map(
        (offer) =>
          (
            <CitiesCard
              key={offer.id}
              offer={offer}
              onMouseOver={() => handleMouseOver(offer)}
            />
          )
      )};
    </>
  );
}

export default CitiesList;
