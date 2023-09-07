import { configureStore } from '@reduxjs/toolkit';
import offersSlice from '../slices/offersSlice';
import sortingSlice from '../slices/sortingSlice';
import authSlice from '../slices/authSlice';
import { createApi } from '../services/api.ts';
import commentsSlice from '../slices/commentsSlice.ts';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const api = createApi();

export const store = configureStore({
  reducer: {
    offersSlice,
    sortingSlice,
    authSlice,
    commentsSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    }
  }),
});


export default store;
