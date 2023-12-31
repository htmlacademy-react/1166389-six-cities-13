import { useSelector } from 'react-redux';
import { OfferCard } from '../../mocks/offers';
import PlacesCard from '../places-card/places-card';
import { RootState } from '../../store';

import Spinner from '../spinner/spinner';

type PlacesListProps = {
  selectedPlace?: OfferCard;
  onListCardHover?: (offer: OfferCard) => void;
  onListCardMouseOut?: () => void;
}

function PlacesList({onListCardHover, onListCardMouseOut, selectedPlace}: PlacesListProps): JSX.Element {
  const selectedCity = useSelector(((state: RootState) => state.offersSlice.city));
  const offers = useSelector(((state: RootState) => state.offersSlice.offers));
  const isOffersLoading = useSelector(((state: RootState) => state.offersSlice.loading));
  const nearbyOffers = useSelector(((store: RootState) => store.offersSlice.nearbyOffers));

  if (isOffersLoading) {
    return <Spinner />;
  }

  const filteredOffers = selectedCity ? offers.filter((offer) => offer.city.name === selectedCity) : offers;

  return (
    <>
      {(selectedPlace ? nearbyOffers.slice(0, 3) : filteredOffers).map(
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
