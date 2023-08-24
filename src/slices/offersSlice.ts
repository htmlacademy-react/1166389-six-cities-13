import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferCard } from '../mocks/offers';

export type InitialStateType = {
  city: string;
  offers: OfferCard[];
};

const initialState: InitialStateType = {
  city: 'Paris',
  offers: [] as OfferCard[],
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    sortOffers: (state, action: PayloadAction<string>) => {
      state.offers = state.offers.filter((offer) => offer.city.name === action.payload);
    },
  },
});

export const { changeCity, sortOffers } = offersSlice.actions;

export default offersSlice.reducer;
