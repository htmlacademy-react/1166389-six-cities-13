import { render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/component';
import {makeFakeStore} from '../../mocks/store';
import ReviewsItem from './reviews-item';
import { makeMockReview } from '../../mocks/reviews';

describe('Component: ReviewsItem', () => {
  it('должен отображаться правильно', () => {
    const reviewItemElementId = 'review-item-element';
    const {withStoreComponent} = withStore(<ReviewsItem review={makeMockReview()[0]} />, makeFakeStore());

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(reviewItemElementId)).toBeInTheDocument();
  });
});
