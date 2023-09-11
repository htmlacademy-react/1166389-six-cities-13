import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {changeCity} from '../../store/offers/slice.ts';
import { getSelectedCity } from '../../store/offers/selectors.ts';

type CitiesItemProps = {
  city: string;
}

function CitiesItem({city}: CitiesItemProps): JSX.Element{
  const activeCity = useSelector(getSelectedCity);
  const dispatch = useDispatch();

  return (
    <li className="locations__item">
      <Link className={`locations__item-link tabs__item ${activeCity === city ? 'tabs__item--active' : ''}`} onClick={() => dispatch(changeCity(city))} to="#">
        <span>{city}</span>
      </Link>
    </li>
  );
}

export default CitiesItem;
