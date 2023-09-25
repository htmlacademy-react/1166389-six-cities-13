import { render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/component';
import {makeFakeStore} from '../../mocks/store';
import SortingOffers from './offers-sorting';

describe('Component: OfferCommentForm', () => {
  it('должен отображаться правильно', () => {
    const offerCommentElementId = 'offers-sorting-element';
    const {withStoreComponent} = withStore(<SortingOffers />, makeFakeStore());

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(offerCommentElementId)).toBeInTheDocument();
  });
});
