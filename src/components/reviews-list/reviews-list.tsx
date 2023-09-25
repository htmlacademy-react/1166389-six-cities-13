import { useSelector } from 'react-redux';
import { OfferReview } from '../../mocks/reviews';
import ReviewsItem from '../reviews-item/reviews-item';
import { getComments } from '../../store/comments/selectors';

function ReviewsList(): JSX.Element{
  const reviews = useSelector(getComments);

  return (
    <ul className="reviews__list" data-testid="reviews-list-element">
      {reviews.map(
        (review: OfferReview) =>
          (
            <ReviewsItem
              key={review.id}
              review={review}
            />
          )
      )}
    </ul>
  );
}

export default ReviewsList;
