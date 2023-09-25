import { render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/component';
import {makeFakeStore} from '../../mocks/store';
import ReviewsList from './reviews-list';

describe('Component: ReviewsItem', () => {
  it('должен отображаться правильно', () => {
    const reviewItemElementId = 'reviews-list-element';
    const {withStoreComponent} = withStore(<ReviewsList />, makeFakeStore());

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(reviewItemElementId)).toBeInTheDocument();
  });
});
