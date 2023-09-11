import {NameSpace} from '../../const/const';
import {RootState} from '../../types/state';

export const getComments = (state: RootState) => state[NameSpace.Comments].comments;
