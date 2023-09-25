import { useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import { OfferCard, CityLocation } from '../../mocks/offers';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const/const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: OfferCard[];
  city: CityLocation;
  selectedPlace: OfferCard | null;
  isOfferPage?: boolean;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {city, selectedPlace, offers, isOfferPage} = props;

  const getMapStyle = () =>
    isOfferPage
      ? {height: '100%', width: '1150px', margin: '0 auto'}
      : {height: '100%'};

  const mapRef = useRef(null);
  const map = useMap({mapRef, city});
  const {latitude: cityLatitude, longitude: cityLongitude, zoom} = city.location;

  useEffect(() => {
    if (map) {
      map.flyTo([cityLatitude, cityLongitude], zoom);
      const markerLayer = layerGroup().addTo(map);
      offers.forEach(({location, id}) => {
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker
          .setIcon(
            selectedPlace !== undefined && id === selectedPlace?.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedPlace, cityLongitude, cityLatitude, zoom]);

  return <div style={getMapStyle()} ref={mapRef} data-testid="map-element"></div>;
}

export default Map;
