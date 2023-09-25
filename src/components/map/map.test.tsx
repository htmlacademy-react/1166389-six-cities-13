import { render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/component';
import {makeFakeStore} from '../../mocks/store';
import Map from './map';

describe('Component: Logo', () => {
  it('должен отображаться правильно', () => {
    const citiesListElementId = 'map-element';
    const {withStoreComponent} = withStore(<Map offers={[]} city={{ name: '', location: { latitude: 0, longitude: 0, zoom: 0 }}} selectedPlace={null} />, makeFakeStore());

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(citiesListElementId)).toBeInTheDocument();
  });
});
