import { render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/component';
import {makeFakeStore} from '../../mocks/store';
import OfferCommentForm from './offer-comment-form';

describe('Component: OfferCommentForm', () => {
  it('должен отображаться правильно', () => {
    const offerCommentElementId = 'offer-comment-element';
    const {withStoreComponent} = withStore(<OfferCommentForm />, makeFakeStore());

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(offerCommentElementId)).toBeInTheDocument();
  });
});
