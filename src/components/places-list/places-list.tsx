import { useSelector } from 'react-redux';
import { OfferCard } from '../../mocks/offers';
import PlacesCard from '../places-card/places-card';

import Spinner from '../spinner/spinner';
import { getNearbyOffers, getOffers, getOffersLoadingStatus, getSelectedCity } from '../../store/offers/selectors';

type PlacesListProps = {
  selectedPlace?: OfferCard;
  onListCardHover?: (offer: OfferCard) => void;
  onListCardMouseOut?: () => void;
}

function PlacesList({onListCardHover, onListCardMouseOut, selectedPlace}: PlacesListProps): JSX.Element {
  const selectedCity = useSelector(getSelectedCity);
  const offers = useSelector(getOffers);
  const isOffersLoading = useSelector(getOffersLoadingStatus);
  const nearbyOffers = useSelector(getNearbyOffers);

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
