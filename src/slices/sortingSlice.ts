import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
    sortByDefault: (state, action: PayloadAction<OfferCard[]>) => {
      state.offers = action.payload;
    },
    sortByPriceHighToLow: (state, action: PayloadAction<OfferCard[]>) => {
      state.offers = action.payload.sort((a, b) => b.price - a.price);
    },
    sortByPriceLowToHigh: (state, action: PayloadAction<OfferCard[]>) => {
      state.offers = action.payload.sort((a, b) => a.price - b.price);
    },
    sortByTopRated: (state, action: PayloadAction<OfferCard[]>) => {
      state.offers = action.payload.sort((a, b) => b.rating - a.rating);
    },
  }
});

export const { sortByDefault, sortByPriceHighToLow, sortByPriceLowToHigh, sortByTopRated } = sortingSlice.actions;

export default sortingSlice.reducer;
