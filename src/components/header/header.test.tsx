import { render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/component';
import {makeFakeStore} from '../../mocks/store';
import { MemoizedHeader } from './header';

describe('Component: Header', () => {
  it('должен отображаться правильно', () => {
    const citiesListElementId = 'header-element';
    const {withStoreComponent} = withStore(<MemoizedHeader  />, makeFakeStore());

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(citiesListElementId)).toBeInTheDocument();
  });
});
