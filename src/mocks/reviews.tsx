import { datatype, date, lorem, name, image } from 'faker';

export type UserInfo = {
    name: string;
    avatarUrl: string;
};


export type OfferReview = {
      id: string;
      user: UserInfo;
      rating: number;
      date: string;
      comment: string;
  };

export const makeMockReview = (): OfferReview[] => ([{
  id: crypto.randomUUID(),
  date: String(date.soon()),
  user: {
    name: name.title(),
    avatarUrl: image.avatar()
  },
  comment: lorem.text(),
  rating: datatype.number({ precision: 1 })
}]);

export const mockReviews: OfferReview[] = [
  {
    id: 'offer-1',
    user: {
      name: 'Keks',
      avatarUrl: 'https://i.pravatar.cc/843'
    },
    rating: 1,
    date: 'April 2019',
    comment: 'some review text',
  },
  {
    id: 'offer-2',
    user: {
      name: 'Rudolf',
      avatarUrl: 'https://i.pravatar.cc/143'
    },
    rating: 2,
    date: 'April 2009',
    comment: 'some review text vol.2',
  },
  {
    id: 'offer-3',
    user: {
      name: 'Kit',
      avatarUrl: 'https://i.pravatar.cc/142'
    },
    rating: 4,
    date: 'April 2002',
    comment: 'some review text vol.3',
  },
];
