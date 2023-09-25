import {NameSpace} from '../../const/const';
import {RootState} from '../../types/state';

export const getAuthorizationStatus = (state: RootState) => state[NameSpace.Auth].authorizationStatus;
export const getUserInfo = (state: RootState) => state[NameSpace.Auth].userInfo;
