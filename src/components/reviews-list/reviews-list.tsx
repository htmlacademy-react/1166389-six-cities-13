import { OfferReview } from '../../mocks/reviews';
import ReviewsItem from '../reviews-item/reviews-item';

type ReviewsListProps = {
  reviews: OfferReview[];
}

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element{
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
