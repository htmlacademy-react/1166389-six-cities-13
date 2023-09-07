import store from '../store';

export type UserData = {
    id: string;
    email: string;
    token: string;
}

export type AuthData = {
  login: string;
  password: string;
}

export type State = ReturnType<typeof store.getState>;
