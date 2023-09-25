import { render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/component';
import {makeFakeStore} from '../../mocks/store';
import FavoritesCard from './favorites-card';
import { makeMockOffer } from '../../mocks/offers';

describe('Компонент: FavoritesCard', () => {
  it('должен отображаться правильно', () => {
    const favoritesCardElementId = 'favorites-card-element';
    const {withStoreComponent} = withStore(<FavoritesCard offer={makeMockOffer()[0]}
    // eslint-disable-next-line react/jsx-closing-bracket-location
    />, makeFakeStore());

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(favoritesCardElementId)).toBeInTheDocument();
  });
});
