import { render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/component';
import {makeFakeStore} from '../../mocks/store';
import PlacesCard from './places-card';
import { makeMockOffer } from '../../mocks/offers';

describe('Component: PlacesCard', () => {
  it('должен отображаться правильно', () => {
    const placesCardElementId = 'places-card-element';
    const {withStoreComponent} = withStore(<PlacesCard offer={makeMockOffer()[0]} />, makeFakeStore());

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(placesCardElementId)).toBeInTheDocument();
  });
});
