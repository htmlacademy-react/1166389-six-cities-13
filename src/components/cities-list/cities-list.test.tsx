import { render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/component';
import {makeFakeStore} from '../../mocks/store';
import CitiesList from './cities-list';

describe('Component: CitiesList', () => {
  it('должен отображаться правильно', () => {
    const citiesListElementId = 'cities-list-element';
    const {withStoreComponent} = withStore(<CitiesList />, makeFakeStore());

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(citiesListElementId)).toBeInTheDocument();
  });
});
