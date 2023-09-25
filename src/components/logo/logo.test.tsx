import { render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/component';
import {makeFakeStore} from '../../mocks/store';
import Logo from './logo';

describe('Component: Logo', () => {
  it('должен отображаться правильно', () => {
    const citiesListElementId = 'logo-element';
    const {withStoreComponent} = withStore(<Logo />, makeFakeStore());

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(citiesListElementId)).toBeInTheDocument();
  });
});
