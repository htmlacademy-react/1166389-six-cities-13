import { NameSpace } from '../../const/const';
import { RootState } from '../../types/state';

export const getOffers = (state: RootState) => state[NameSpace.Offers].offers;
export const getInitialOffers = (state: RootState) => state[NameSpace.Offers].initialOffers;
export const getOffersById = (id?: string) => (state: RootState) => state[NameSpace.Offers].offers.find((offer) => offer.id === id);
export const getSelectedCity = (state: RootState) => state[NameSpace.Offers].city;
export const getOffersLoadingStatus = (state: RootState) => state[NameSpace.Offers].loading;
export const getNearbyOffers = (state: RootState) => state[NameSpace.Offers].nearbyOffers;
export const getFavouriteOffers = (state: RootState) => state[NameSpace.Offers].offers.filter((offer) => offer.isFavorite);
