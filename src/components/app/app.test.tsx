import { render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute } from '../../const/const';
import App from './app';
import { withHistory, withStore } from '../../mocks/component';
import {makeFakeStore} from '../../mocks/store';

describe('Маршрутизация приложения', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('должна рендерить MainPage когда пользователь переходить по пути "/"', () => {
    const mainPageElementId = 'main-page-element';
    const withHistoryComponent = withHistory(<App reviews={[]} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId(mainPageElementId)).toBeInTheDocument();
  });

  it('должна рендерить LoginPage когда пользователь переходить по пути "/login"', () => {
    const loginPageElementId = 'login-page-element';
    const withHistoryComponent = withHistory(<App reviews={[]} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByTestId(loginPageElementId)).toBeInTheDocument();
  });
});
