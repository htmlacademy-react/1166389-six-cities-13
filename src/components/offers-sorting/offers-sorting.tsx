import { useDispatch } from 'react-redux';
import { sortByDefault, sortByPriceHighToLow, sortByPriceLowToHigh, sortByTopRated } from '../../slices/sortingSlice';
import { useState } from 'react';

function OffersSorting(): JSX.Element {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSortChange: React.MouseEventHandler<HTMLLIElement> = (event) => {
    const selectedSort = (event.target as HTMLElement).innerText;
    setSelectedOption(selectedSort);
    switch (selectedSort) {
      case 'Popular':
        dispatch(sortByDefault());
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
