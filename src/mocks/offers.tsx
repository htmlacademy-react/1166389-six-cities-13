export type OfferCard = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: {
      name: string;
      location: {
        latitude: number;
        longitude: number;
        zoom: number;
      };
    };
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
};

export const mockOffers: OfferCard[] = [
  {
    id: 'offer-1',
    title: 'Some house',
    type: 'apartment',
    price: 1,
    city: {
      name: 'Kiev',
      location: {
        latitude:  50.449635,
        longitude: 30.531219,
        zoom: 8,
      },
    },
    location: {
      latitude: 50.420635,
      longitude: 30.321219,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: false,
    rating: 5,
    previewImage: 'https://i.pravatar.cc/843',
  },
  {
    id: 'offer-2',
    title: 'Cool house',
    type: 'apartment',
    price: 10,
    city: {
      name: 'Brussels',
      location: {
        latitude: 97.420136,
        longitude: 8.420338,
        zoom: 8,
      },
    },
    location: {
      latitude: 36.420232,
      longitude: 3.420431,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: true,
    rating: 1,
    previewImage: 'https://i.pravatar.cc/842',
  },
  {
    id: 'offer-3',
    title: 'house somewhere',
    type: 'apartment',
    price: 100,
    city: {
      name: 'somewhere',
      location: {
        latitude: 51.766547,
        longitude: 6.699999,
        zoom: 8,
      },
    },
    location: {
      latitude: 48.123785,
      longitude: 2.123751,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: false,
    rating: 1,
    previewImage: 'https://i.pravatar.cc/841',
  },
  {
    id: 'offer-4',
    title: 'Normal apartments',
    type: 'apartment',
    price: 300,
    city: {
      name: 'Moscow',
      location: {
        latitude: 55.751244,
        longitude: 37.618423,
        zoom: 8,
      },
    },
    location: {
      latitude: 56.35514938496378,
      longitude: 6.673877537499948,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: true,
    rating: 3,
    previewImage: 'https://i.pravatar.cc/840',
  }
];
