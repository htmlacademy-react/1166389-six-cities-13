import { useDispatch } from 'react-redux';
import { sortByPriceHighToLow, sortByPriceLowToHigh, sortByTopRated } from '../../slices/sortingSlice';

function OffersSorting(): JSX.Element {
  const dispatch = useDispatch();

  const handleSortChange: React.MouseEventHandler<HTMLLIElement> = (event) => {
    const selectedSort = (event.target as HTMLElement).innerText;
    switch (selectedSort) {
      case 'Popular':
        break;
      case 'Price: low to high':
        dispatch(sortByPriceLowToHigh());
        break;
      case 'Price: high to low':
        dispatch(sortByPriceHighToLow());
        break;
      case 'Top rated first':
        dispatch(sortByTopRated());
        break;
      default:
        break;
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
                  Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        <li className="places__option places__option--active" tabIndex={0} onClick={handleSortChange}>Popular</li>
        <li className="places__option" tabIndex={0} onClick={handleSortChange}>Price: low to high</li>
        <li className="places__option" tabIndex={0} onClick={handleSortChange}>Price: high to low</li>
        <li className="places__option" tabIndex={0} onClick={handleSortChange}>Top rated first</li>
      </ul>
    </form>
  );
}

export default OffersSorting;
