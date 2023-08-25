import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferCard, mockOffers } from '../mocks/offers';

export type InitialStateType = {
  city: string;
  offers: OfferCard[];
};

const initialState: InitialStateType = {
  city: 'Paris',
  offers: mockOffers,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    filterOffers: (state, action: PayloadAction<string>) => {
      state.offers = state.offers.filter((offer) => offer.city.name === action.payload);
    },
    updateOffers: (state, action: PayloadAction<OfferCard[]>) => {
      state.offers = action.payload;
    }
  },
});

export const { changeCity, filterOffers, updateOffers } = offersSlice.actions;

export default offersSlice.reducer;
