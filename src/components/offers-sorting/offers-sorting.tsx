import { useDispatch, useSelector } from 'react-redux';
import { sortByDefault, sortByPriceHighToLow, sortByPriceLowToHigh, sortByTopRated } from '../../slices/sortingSlice';
import { useEffect, useState } from 'react';
import { RootState } from '../../store';
import { updateOffers } from '../../slices/offersSlice';

function OffersSorting(): JSX.Element {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [initialLoad, setInitialLoad] = useState(true);
  const getOffers = useSelector(((store: RootState) => store.offersSlice.offers));
  const initialOffers = useSelector(((store: RootState) => store.offersSlice.initialOffers));
  const sortedOffers = useSelector((state: RootState) => state.sortingSlice.offers);
  const offers = [...getOffers];

  useEffect(() => {
    if (!initialLoad) {
      dispatch(updateOffers(sortedOffers));
    }
  }, [sortedOffers, dispatch, initialLoad]);

  const handleSortChange: React.MouseEventHandler<HTMLLIElement> = (event) => {
    const selectedSort = (event.target as HTMLElement).innerText;
    setSelectedOption(selectedSort);
    switch (selectedSort) {
      case 'Popular':
        dispatch(sortByDefault(initialOffers));
        break;
      case 'Price: low to high':
        dispatch(sortByPriceLowToHigh(offers));
        setInitialLoad(false);
        break;
      case 'Price: high to low':
        dispatch(sortByPriceHighToLow(offers));
        setInitialLoad(false);
        break;
      case 'Top rated first':
        dispatch(sortByTopRated(offers));
        setInitialLoad(false);
        break;
      default:
        break;
    }

    //setInitialLoad(false);
  };

  const toggleHovered = () => setIsHovered(!isHovered);

  return (
    <form className="places__sorting" action="#" method="get" onMouseEnter={toggleHovered} onMouseLeave={toggleHovered}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
                  Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isHovered ? 'places__options--opened' : ''}`}>
        <li className={`places__option ${selectedOption === 'popular' ? 'places__option--active' : ''}`} tabIndex={0} onClick={handleSortChange}>Popular</li>
        <li className={`places__option ${selectedOption === 'Price: low to high' ? 'places__option--active' : ''}`} tabIndex={0} onClick={handleSortChange}>Price: low to high</li>
        <li className={`places__option ${selectedOption === 'Price: high to low' ? 'places__option--active' : ''}`} tabIndex={0} onClick={handleSortChange}>Price: high to low</li>
        <li className={`places__option ${selectedOption === 'Top rated first' ? 'places__option--active' : ''}`}tabIndex={0} onClick={handleSortChange}>Top rated first</li>
      </ul>
    </form>
  );
}

export default OffersSorting;
