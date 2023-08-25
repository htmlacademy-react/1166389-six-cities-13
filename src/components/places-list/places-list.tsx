import { useDispatch, useSelector } from 'react-redux';
import { OfferCard } from '../../mocks/offers';
import PlacesCard from '../places-card/places-card';
import { RootState } from '../../slices/store';
import { useEffect } from 'react';
import { updateOffers } from '../../slices/offersSlice';

type PlacesListProps = {
  selectedPlace?: OfferCard;
  onListCardHover?: (offer: OfferCard) => void;
  onListCardMouseOut?: () => void;
}

function PlacesList({onListCardHover, onListCardMouseOut, selectedPlace}: PlacesListProps): JSX.Element {
  const selectedCity = useSelector(((state: RootState) => state.offersSlice.city));
  const offers = useSelector(((state: RootState) => state.sortingSlice.offers));
  let nearPlaces: OfferCard[] = [];

  if (selectedPlace) {
    nearPlaces = offers.filter((offer) => offer.id !== selectedPlace.id);
  }

  const filteredOffers = selectedCity ? offers.filter((offer) => offer.city.name === selectedCity) : offers;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateOffers(offers));
  }, [dispatch, offers]);

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
