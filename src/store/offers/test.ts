import { makeMockOffer } from '../../mocks/offers';
import { offersSlice, changeCity, filterOffers, updateOffers } from './slice';

describe('Слайс: offersSlice', () => {
  const mockOffers = makeMockOffer();

  it('должен выставлять выбранный город', () => {
    const initialState = {
      city: 'Paris',
      offers: [],
      initialOffers: [],
      nearbyOffers: [],
      isSuccess: false,
      loading: false,
    };
    const expectedState = {
      city: 'Amsterdam',
      offers: [],
      initialOffers: [],
      nearbyOffers: [],
      isSuccess: false,
      loading: false,
    };

    const result = offersSlice.reducer(initialState, changeCity('Amsterdam'));

    expect(result).toEqual(expectedState);
  });

  it('должен фильтровать предложения по выбранному городу', () => {
    const filteredOffers = mockOffers.filter((offer) => offer.city.name === 'Amsterdam');
    const initialState = {
      city: 'Paris',
      offers: mockOffers,
      initialOffers: [],
      nearbyOffers: [],
      isSuccess: false,
      loading: false,
    };
    const expectedState = {
      city: 'Paris',
      offers: filteredOffers,
      initialOffers: [],
      nearbyOffers: [],
      isSuccess: false,
      loading: false,
    };

    const result = offersSlice.reducer(initialState, filterOffers('Amsterdam'));

    expect(result).toEqual(expectedState);
  });

  it('должен обновлять предложения', () => {
    const newOffers = mockOffers.filter((offer) => offer.city.name === 'Paris');
    const initialState = {
      city: 'Paris',
      offers: mockOffers,
      initialOffers: [],
      nearbyOffers: [],
      isSuccess: false,
      loading: false,
    };
    const expectedState = {
      city: 'Paris',
      offers: newOffers,
      initialOffers: [],
      nearbyOffers: [],
      isSuccess: false,
      loading: false,
    };

    const result = offersSlice.reducer(initialState, updateOffers(newOffers));

    expect(result).toEqual(expectedState);
  });
});
