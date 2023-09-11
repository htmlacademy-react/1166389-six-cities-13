import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/const.ts';
import {offersSlice} from './offers/slice.ts';
import {sortingSlice} from './sorting/slice.ts';
import {authSlice} from './auth/slice.ts';
import {commentsSlice} from './comments/slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.Sorting]: sortingSlice.reducer,
  [NameSpace.Auth]: authSlice.reducer,
  [NameSpace.Comments]: commentsSlice.reducer,
});
