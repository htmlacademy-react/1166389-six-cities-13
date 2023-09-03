import { createSlice } from '@reduxjs/toolkit';
import { OfferCard } from '../mocks/offers';

export type InitialStateType = {
  offers: OfferCard[];
};

const initialState: InitialStateType = {
  offers: [],
};

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    sortByDefault: (state) => {
      state.offers = initialState.offers;
    },
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

export const { sortByDefault, sortByPriceHighToLow, sortByPriceLowToHigh, sortByTopRated } = sortingSlice.actions;

export default sortingSlice.reducer;
