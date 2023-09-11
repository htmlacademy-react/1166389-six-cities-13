import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { OfferComment, fetchComments, postComment } from '../../store/comments/slice';
import { useParams } from 'react-router-dom';

function OfferCommentForm(): JSX.Element{
  const {id}: {id?: string} = useParams();
  const [commentFormData, setCommentFormData] = useState<OfferComment>({
    rating: 0,
    comment: '',
  });

  const dispatch = useDispatch();
  const isFormValid = commentFormData.rating === 0 || commentFormData.comment.length < 50;

  const handleRadioChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setCommentFormData({...commentFormData, [name]: Number(value)});
  };

  const handleTextAreaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = evt.target;

    setCommentFormData({...commentFormData, comment: value});
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(postComment({
      offerId: id,
      rating: commentFormData.rating,
      comment: commentFormData.comment,
    }));
    dispatch(fetchComments(id));
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" onChange={handleRadioChange} value="5" name="rating" id="5-stars" type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleRadioChange} value="4" name="rating" id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleRadioChange} value="3" name="rating" id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleRadioChange} value="2" name="rating" id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleRadioChange} value="1" name="rating" id="1-star" type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" onChange={handleTextAreaChange} value={commentFormData.comment} id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isFormValid}>Submit</button>
      </div>
    </form>
  );
}

export default OfferCommentForm;
