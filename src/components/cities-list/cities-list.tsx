import CitiesItem from '../cities-item/cities-item';
import { CITIES } from '../../const/const';

function CitiesList(): JSX.Element{
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list" data-testid="cities-list-element">
        {CITIES.map(
          (city) =>
            (
              <CitiesItem key={city} city={city}/>
            )
        )}
      </ul>
    </section>
  );
}

export default CitiesList;
