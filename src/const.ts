export enum AppRoute {
    Main = '/',
    Login = '/login',
    Favorites = '/favorites',
    Offer = '/offer/:id',
    Error = '*',
}

export enum AuthorizationStatus {
    Auth = 'authorized',
    NoAuth = 'non-authorized'
}
