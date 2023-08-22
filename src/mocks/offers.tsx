export type PlaceLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type CityLocation = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export type OfferCard = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: CityLocation;
    location: PlaceLocation;
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
      name: 'Amsterdam',
      location: {
        latitude: 52.377956,
        longitude: 4.897070,
        zoom: 11,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 13,
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
      name: 'Amsterdam',
      location: {
        latitude: 52.377956,
        longitude: 4.897070,
        zoom: 11,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 13,
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
      name: 'Amsterdam',
      location: {
        latitude: 52.377956,
        longitude: 4.897070,
        zoom: 11,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 13,
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
      name: 'Amsterdam',
      location: {
        latitude: 52.377956,
        longitude: 4.897070,
        zoom: 11,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 13,
    },
    isFavorite: false,
    isPremium: true,
    rating: 3,
    previewImage: 'https://i.pravatar.cc/840',
  }
];
