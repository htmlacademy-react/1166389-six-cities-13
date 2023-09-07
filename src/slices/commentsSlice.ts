import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../store/index';
import { OfferReview } from '../mocks/reviews';

export type initialStateType = {
  comments: OfferReview[];
  status: null | string;
}

export const initialState: initialStateType = {
  comments: [],
  status: null,
};

export type OfferComment = {
  rating: number;
  comment: string;
}

export type CommentWithId = OfferComment & {
  offerId: string;
}

export const fetchComments = createAsyncThunk<
OfferReview[],
string,
{
  extra: AxiosInstance;
  state: RootState;
}
>(
  'comments/fetchComments',
  async(offerId, { extra: api, rejectWithValue }) => {
    try {
      const response = await api.get<OfferReview[]>(`comments/${offerId}`);

      return response.data;
    } catch (err) {
      return rejectWithValue('error');
    }
  });

export const postComment = createAsyncThunk<
void,
CommentWithId,
{
  extra: AxiosInstance;
  state: RootState;
}
>('comments/postComment',
  async({offerId, rating, comment}, { extra: api, rejectWithValue }) => {
    try {
      await api.post<OfferComment>(`comments/${offerId}`, { rating, comment});
    } catch (err) {
      return rejectWithValue('error');
    }
  });

const commentsSlice = createSlice(
  {
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchComments.fulfilled, (state, action) => {
          state.status = 'success';
          state.comments = action.payload;
        })
        .addCase(fetchComments.rejected, (state) => {
          state.status = 'fail';
        });
    }
  }
);

export default commentsSlice.reducer;
