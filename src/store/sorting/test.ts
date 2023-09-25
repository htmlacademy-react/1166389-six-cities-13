import { makeMockOffer } from '../../mocks/offers';
import { sortingSlice, sortByTopRated, sortByDefault, sortByPriceHighToLow, sortByPriceLowToHigh } from './slice';

describe('Слайс: sortingSlice', () => {
  const mockOffers = makeMockOffer();

  it('должен фильтровать предложения "ByDefault"', () => {
    const byRatingSortedOffers = mockOffers.sort((a, b) => b.rating - a.rating);
    const initialState = {
      offers: byRatingSortedOffers,
    };
    const expectedState = {
      offers: mockOffers,
    };

    const result = sortingSlice.reducer(initialState, sortByDefault(mockOffers));

    expect(result).toEqual(expectedState);
  });


  it('должен фильтровать предложения "ByTopRated"', () => {
    const byRatingSortedOffers = mockOffers.sort((a, b) => b.rating - a.rating);
    const initialState = {
      offers: [],
    };
    const expectedState = {
      offers: byRatingSortedOffers,
    };

    const result = sortingSlice.reducer(initialState, sortByTopRated([...mockOffers]));

    expect(result).toEqual(expectedState);
  });

  it('должен фильтровать предложения "sortByPriceHighToLow"', () => {
    const byPriceHighToLow = mockOffers.sort((a, b) => b.price - a.price);
    const initialState = {
      offers: [],
    };
    const expectedState = {
      offers: byPriceHighToLow,
    };

    const result = sortingSlice.reducer(initialState, sortByPriceHighToLow(mockOffers));

    expect(result).toEqual(expectedState);
  });

  it('должен фильтровать предложения "sortByPriceLowToHigh"', () => {
    const byPriceLowToHigh = mockOffers.sort((a, b) => a.price - b.price);
    const initialState = {
      offers: [],
    };
    const expectedState = {
      offers: byPriceLowToHigh,
    };

    const result = sortingSlice.reducer(initialState, sortByPriceLowToHigh(mockOffers));

    expect(result).toEqual(expectedState);
  });
});
