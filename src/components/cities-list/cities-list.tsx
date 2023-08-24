import CitiesItem from '../locations-item/locations-item';
import { CITIES } from '../../const/const';

function CitiesList(): JSX.Element{
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map(
          (city) =>
            (
              <CitiesItem key={city} city={city}/>
            )
        )};
      </ul>
    </section>
  );
}

export default CitiesList;
