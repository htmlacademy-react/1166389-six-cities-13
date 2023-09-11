export const URL_MARKER_DEFAULT = 'markup/img/pin.svg';
export const URL_MARKER_CURRENT = 'markup/img/pin-active.svg';

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'] as const;

export enum AppRoute {
    Main = '/',
    Login = '/login',
    Favorites = '/favorites',
    Offer = '/offer/:id',
    Error = '*',
}

export enum AuthorizationStatus {
    Auth = 'authorized',
    NoAuth = 'non-authorized',
    Unknown = 'unknown',
}

export enum APIRoute {
  Offers = '/offers',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum NameSpace {
  Offers= 'offers',
  Sorting = 'sorting',
  Auth = 'auth',
  Comments = 'comments',
}
