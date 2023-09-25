import { NameSpace } from '../../const/const';
import { RootState } from '../../types/state';
import { createSelector } from 'reselect';

export const getOffers = (state: RootState) => state[NameSpace.Offers].offers;
export const getInitialOffers = (state: RootState) => state[NameSpace.Offers].initialOffers;
export const getSelectedCity = (state: RootState) => state[NameSpace.Offers].city;
export const getOffersLoadingStatus = (state: RootState) => state[NameSpace.Offers].loading;
export const getNearbyOffers = (state: RootState) => state[NameSpace.Offers].nearbyOffers;
export const getChossenOffer = (state: RootState) => state[NameSpace.Offers].choosenOffer;
export const getOffersById = (id?: string) => createSelector(
    getOffers,
    (offers) => offers.find((offer) => offer.id === id)
  );
export const getFavouriteOffers = createSelector(
  getOffers,
  (offers) => offers.filter((offer) => offer.isFavorite)
);