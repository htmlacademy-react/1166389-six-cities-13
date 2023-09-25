import { makeMockReview } from '../../mocks/reviews';
import { commentsSlice, fetchComments } from './slice';

describe('Слайс: commentsSlice', () => {
  it('должна возвращать начальное состояние при пустом action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      comments: [],
      status: null,
    };

    const result = commentsSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('должна возвращать начальное состояние при пустом action и undefined состоянии', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      comments: [],
      status: null,
    };

    const result = commentsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});

describe('Функция: fetchComments', () => {
  it('должна выставлять комментарии при "fetchComments.fulfilled"', () => {
    const mockReviews = makeMockReview();
    const initialState = {
      comments: [],
      status: null,
    };
    const expectedState = {
      comments: mockReviews,
      status: 'success',
    };

    const result = commentsSlice.reducer(initialState, fetchComments.fulfilled(mockReviews, '', '0'));

    expect(result).toEqual(expectedState);
  });

  it('должна менять статус запроса при "fetchComments.rejected"', () => {
    const initialState = {
      comments: [],
      status: null,
    };
    const expectedState = {
      comments: [],
      status: 'fail',
    };

    const result = commentsSlice.reducer(initialState, fetchComments.rejected(null, '', '0'));

    expect(result).toEqual(expectedState);
  });
});
