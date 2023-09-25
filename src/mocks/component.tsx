import { MemoryHistory, createMemoryHistory } from 'history';
import { ReactNode } from 'react';
import HistoryRouter from '../components/history-route/history-route';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../services/api';
import { HelmetProvider } from 'react-helmet-async';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import { RootState } from '../types/state';
import { ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

export const withHistory = (component: ReactNode, history?: MemoryHistory) => {
  const memoryHistory = history ?? createMemoryHistory();

  return(
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component};
      </HelmetProvider>
    </HistoryRouter>
  );
};

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<typeof createApi>, Action>;

export function withStore(
  component: JSX.Element,
  initialState: Partial<RootState> = {},
): ComponentWithMockStore {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}

