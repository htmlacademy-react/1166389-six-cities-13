import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferCard, ChosenOffer } from '../../mocks/offers.tsx';
import { AxiosInstance } from 'axios';
import { RootState } from '../../types/state';
import { APIRoute, NameSpace } from '../../const/const.ts';

export type InitialStateType = {
  city: string;
  offers: OfferCard[];
  nearbyOffers: OfferCard[];
  choosenOffer: ChosenOffer | null;
  initialOffers: OfferCard[];
  isSuccess: boolean;
  loading: boolean;
};

export type ThunkConfig<T> = {
  rejectValue: T;
  extra: AxiosInstance;
  state: RootState;
}

const initialState: InitialStateType = {
  city: 'Paris',
  offers: [],
  initialOffers: [],
  nearbyOffers: [],
  choosenOffer: null,
  isSuccess: false,
  loading: false,
};

export type OfferWithStatus = {
  status: number;
  offer: OfferCard;
}

export const fetchOffers = createAsyncThunk<
OfferCard[],
undefined,
ThunkConfig<string>
>(
  'offers/fetchOffers',
  async(_arg, { extra: api, rejectWithValue }) => {
    try {
      const response = await api.get<OfferCard[]>(APIRoute.Offers);
      return response.data;

    } catch (err) {
      return rejectWithValue('error');
    }
  });

export const fetchNearbyOffers = createAsyncThunk<
  OfferCard[],
  string,
  {
    extra: AxiosInstance;
    state: RootState;
  }
>(
  'offers/fetchNearbyOffers',
  async (offerId, { extra: api, rejectWithValue }) => {
    try {
      const response = await api.get<OfferCard[]>(`/offers/${offerId}/nearby`);
      return response.data;
    } catch (err) {
      return rejectWithValue('error');
    }
  }
);

export const fetchChoosenOffer = createAsyncThunk<
  ChosenOffer,
  string,
  {
    extra: AxiosInstance;
    state: RootState;
  }
>(
  'offers/fetchChoosenOffer',
  async (offerId, { extra: api, rejectWithValue }) => {
    try {
      const response = await api.get<ChosenOffer>(`/offers/${offerId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue('error');
    }
  }
);

export const fetchFavouriteOffers = createAsyncThunk<
    OfferCard[],
    undefined,
    ThunkConfig<string>
    >(
      'offers/fetchFavouriteOffers',
      async(_arg, { extra: api, rejectWithValue }) => {
        try {
          const response = await api.get<OfferCard[]>(APIRoute.Favorite);
          return response.data;
        } catch (err) {
          return rejectWithValue('error');
        }
      });

export const addFavourite = createAsyncThunk<
  void,
  OfferWithStatus,
  {
    extra: AxiosInstance;
    state: RootState;
  }
>(
  'offers/changeFavouriteStatus',
  async (offerWithStatus, { extra: api, rejectWithValue }) => {
    const {
      status,
      offer: { id },
    } = offerWithStatus;
    try {
      await api.post<OfferCard>(`/favorite/${id}/${status}`, { status });
    } catch (err) {
      return rejectWithValue('error');
    }
  }
);

export const offersSlice = createSlice({
  name: NameSpace.Offers,
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
    updateOfferById: (state, action: PayloadAction<OfferCard>) => {
      state.offers = state.offers.map((offer) => {
        if (offer.id === action.payload.id) {
          return {
            ...offer,
            isFavorite: !offer.isFavorite
          };
        }
        return offer;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.fulfilled, (state, action: PayloadAction<OfferCard[]>) => {
        state.offers = action.payload;
        state.initialOffers = action.payload;
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
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action: PayloadAction<OfferCard[]>) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchChoosenOffer.fulfilled, (state, action: PayloadAction<ChosenOffer>) => {
        state.choosenOffer = action.payload;
      });
  }
});

export const { changeCity, filterOffers, updateOffers, updateOfferById } = offersSlice.actions;

