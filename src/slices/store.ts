import { configureStore } from '@reduxjs/toolkit';
import offersSlice from './offersSlice';
import sortingSlice from './sortingSlice';

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    offersSlice,
    sortingSlice,
  }
});


export default store;
