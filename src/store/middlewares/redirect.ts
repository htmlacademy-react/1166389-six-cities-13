import {Middleware, PayloadAction} from '@reduxjs/toolkit';
import browserHistory from '../../browser-history/browser-history.ts';
import reducer from '../../slices/authSlice.ts';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
 () =>
   (next) =>
     (action: PayloadAction<string>) => {
       if (action.type === 'user/redirectToRoute') {
         browserHistory.push(action.payload);
       }
       return next(action);
     };
