import { render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/component';
import {makeFakeStore} from '../../mocks/store';
import CitiesItem from './cities-item';

describe('Компонент: CitiesItem', () => {
  it('должен отображаться правильно', () => {
    const citiesItemElementId = 'cities-item-element';
    const {withStoreComponent} = withStore(<CitiesItem city={'Paris'} />, makeFakeStore());

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(citiesItemElementId)).toBeInTheDocument();
  });
});
