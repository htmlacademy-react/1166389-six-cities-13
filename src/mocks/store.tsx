import { AuthorizationStatus } from '../const/const';
import { RootState } from '../types/state';

export const makeFakeStore = (initialState?: Partial<RootState>): RootState => ({
  offers: {
    city: 'Paris',
    offers: [],
    initialOffers: [],
    nearbyOffers: [],
    isSuccess: false,
    loading: false,
  },
  sorting: {
    offers: [],
  },
  auth: {
    authorizationStatus: AuthorizationStatus.Unknown,
    userInfo: {
      email: '',
      token: '',
      name: '',
      avatarUrl: '',
      isPro: false,
    },
  },
  comments: {
    comments: [],
    status: null,
  },
  ...initialState ?? {},
});
