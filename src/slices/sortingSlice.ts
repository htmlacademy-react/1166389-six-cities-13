import { createSlice } from '@reduxjs/toolkit';
import { OfferCard, mockOffers } from '../mocks/offers';

export type InitialStateType = {
  offers: OfferCard[];
};

const initialState: InitialStateType = {
  offers: mockOffers,
};

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    sortByPriceHighToLow: (state) => {
      state.offers = state.offers.sort((a, b) => b.price - a.price);
    },
    sortByPriceLowToHigh: (state) => {
      state.offers = state.offers.sort((a, b) => a.price - b.price);
    },
    sortByTopRated: (state) => {
      state.offers = state.offers.sort((a, b) => b.rating - a.rating);
    },
  }
});

export const { sortByPriceHighToLow, sortByPriceLowToHigh, sortByTopRated } = sortingSlice.actions;

export default sortingSlice.reducer;
