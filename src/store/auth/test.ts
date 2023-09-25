import { AuthorizationStatus } from '../../const/const';
import { authSlice } from './slice';

describe('Слайс: authSlice', () => {
  it('должна возвращать начальное состояние при пустом action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: {
        email: '',
        token: '',
        name: '',
        avatarUrl: '',
        isPro: false,
      }
    };

    const result = authSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('должна возвращать начальное состояние при пустом action и undefined состоянии', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: {
        email: '',
        token: '',
        name: '',
        avatarUrl: '',
        isPro: false,
      }
    };

    const result = authSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
