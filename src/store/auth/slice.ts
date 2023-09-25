import { PayloadAction, createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { APIRoute, AppRoute, AuthorizationStatus } from '../../const/const.ts';
import { AuthData } from '../../types/types.ts';
import { dropToken, saveToken } from '../../services/token.ts';
import { AppDispatch } from '../index.js';
import { AxiosInstance } from 'axios';
import { RootState } from '../../types/state';
import { NameSpace } from '../../const/const.ts';

export type UserInfo = {
  avatarUrl: string;
  email: string;
  isPro: boolean;
  name: string;
  token: string;
};

export type InitialStateType = {
  authorizationStatus: string;
  userInfo: UserInfo;
};

const initialState: InitialStateType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: {
    email: '',
    token: '',
    name: '',
    avatarUrl: '',
    isPro: false,
  },
};

export const redirectToRoute = createAction('app/redirectToRoute', (route: string) => ({payload: route}));

export const checkAuth = createAsyncThunk<
UserInfo,
undefined,
{
  state: RootState;
  extra: AxiosInstance;
}
>('user/checkAuth', async(_arg, { extra: api }) => {
  const { data } = await api.get<UserInfo>(AppRoute.Login);

  return data;
});

export const login = createAsyncThunk<
UserInfo,
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
      data
    } = await api.post<UserInfo>(AppRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));

    return data;
  }
);

export const logout = createAsyncThunk<
unknown,
undefined,
{
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>('user/logout', async (_arg, { extra: api }) => {
  await api.delete<unknown>(APIRoute.Logout);
  dropToken();
});

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
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = initialState.userInfo;
      });
  }
});

export const { authentication } = authSlice.actions;
