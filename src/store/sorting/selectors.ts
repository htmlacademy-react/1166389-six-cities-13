import { NameSpace } from '../../const/const';
import { RootState } from '../../types/state';

export const getSortedOffers = (state: RootState) => state[NameSpace.Sorting].offers;
