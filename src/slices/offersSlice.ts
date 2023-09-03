import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferCard } from '../mocks/offers';
import { AxiosInstance } from 'axios';
import { store } from '../store/index.js';

export type InitialStateType = {
  city: string;
  offers: OfferCard[];
  isSuccess: boolean;
  loading: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type ThunkConfig<T> = {
  rejectValue: T;
  extra: AxiosInstance;
  state: State;
}

const initialState: InitialStateType = {
  city: 'Paris',
  offers: [],
  isSuccess: false,
  loading: false,
};

export const fetchOffers = createAsyncThunk<
OfferCard[],
undefined,
ThunkConfig<string>
>('offers/fetchOffers', async(_arg, { extra: api, rejectWithValue }) => {
  try {
    const response = await api.get<OfferCard[]>('/offers');
    return response.data;

  } catch (err) {
    return rejectWithValue('error');
  }
});

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
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.fulfilled, (state, action: PayloadAction<OfferCard[]>) => {
        state.offers = action.payload;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.loading = false;
        state.isSuccess = false;
      });
  }
});

export const { changeCity, filterOffers, updateOffers } = offersSlice.actions;

export default offersSlice.reducer;
