import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OfferCard } from '../../mocks/offers.tsx';
import { NameSpace } from '../../const/const.ts';

export type InitialStateType = {
  offers: OfferCard[];
};

const initialState: InitialStateType = {
  offers: [],
};

export const sortingSlice = createSlice({
  name: NameSpace.Sorting,
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
