import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../services/api.ts';
import { rootReducer } from './root-reducer.ts';
import { redirect } from './middlewares/redirect';

export type AppDispatch = typeof store.dispatch;

const api = createApi();

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    }
  }).concat(redirect),
});


export default store;
