import { PayloadAction, createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../../const/const.ts';
import { AuthData, UserData } from '../../types/types.ts';
import { saveToken } from '../../services/token.ts';
import { AppDispatch } from '../index.js';
import { AxiosInstance } from 'axios';
import { RootState } from '../../types/state';
import { NameSpace } from '../../const/const.ts';

export type InitialStateType = {
  authorizationStatus: string;
};

const initialState: InitialStateType = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const redirectToRoute = createAction('app/redirectToRoute', (route: string) => ({payload: route}));

export const checkAuth = createAsyncThunk<
void,
undefined,
{
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}
>('user/checkAuth', async(_arg, { dispatch, extra: api }) => {
  await api.get<UserData>(AppRoute.Login);
  dispatch(requireAuthorization(AuthorizationStatus.Auth));
});

export const login = createAsyncThunk<
void,
AuthData,
{
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}
>(
  'user/login',
  async({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: {token}
    } = await api.post<UserData>(AppRoute.Login, { email, password });
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
  }
);

export const authSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {
    authentication: (state, action: PayloadAction<string>) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(requireAuthorization, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(login.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const { authentication } = authSlice.actions;
