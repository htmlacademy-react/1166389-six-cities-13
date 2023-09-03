import { configureStore } from '@reduxjs/toolkit';
import offersSlice from '../slices/offersSlice';
import sortingSlice from '../slices/sortingSlice';
import { createApi } from '../services/api.ts';

export type RootState = ReturnType<typeof store.getState>;

const api = createApi();

export const store = configureStore({
  reducer: {
    offersSlice,
    sortingSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    }
  }),
});


export default store;
