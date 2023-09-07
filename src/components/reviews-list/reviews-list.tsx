import { useSelector } from 'react-redux';
import { OfferReview } from '../../mocks/reviews';
import ReviewsItem from '../reviews-item/reviews-item';
import { RootState } from '../../store';

function ReviewsList(): JSX.Element{
  const reviews = useSelector(((store: RootState) => store.commentsSlice.comments));

  return (
    <ul className="reviews__list">
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
