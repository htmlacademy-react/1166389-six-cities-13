import { render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/component';
import {makeFakeStore} from '../../mocks/store';
import EmptyOffers from './offers-empty';

describe('Component: OfferCommentForm', () => {
  it('должен отображаться правильно', () => {
    const offerCommentElementId = 'offers-empty-element';
    const {withStoreComponent} = withStore(<EmptyOffers />, makeFakeStore());

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(offerCommentElementId)).toBeInTheDocument();
  });
});
