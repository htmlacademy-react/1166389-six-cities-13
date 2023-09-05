import { PayloadAction, createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const/const';
import { AuthData, UserData } from '../types/types';
import { saveToken } from '../services/token';
import { store, AppDispatch } from '../store/index.js';
import { AxiosInstance } from 'axios';

export type InitialStateType = {
  authorizationStatus: string;
};

export type State = ReturnType<typeof store.getState>;

const initialState: InitialStateType = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const checkAuth = createAsyncThunk<
void,
undefined,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>('user/checkAuth', async(_arg, { dispatch, extra: api }) => {
  try {
    await api.get<UserData>('/login');
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
});

export const login = createAsyncThunk<
void,
AuthData,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'user/login',
  async({ login: email, password }, {extra: api }) => {
    const {
      data: {token}
    } = await api.post<UserData>('/login', { email, password });
    saveToken(token);
  }
);

const authSlice = createSlice({
  name: 'Authentication',
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

export default authSlice.reducer;
