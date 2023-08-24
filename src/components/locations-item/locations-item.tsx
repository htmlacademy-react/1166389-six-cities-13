import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {InitialStateType, changeCity} from '../../slices/offersSlice.ts';

type CitiesItemProps = {
  city: string;
}

function CitiesItem({city}: CitiesItemProps): JSX.Element{
  const activeCity = useSelector(((store: InitialStateType) => store.city));
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
