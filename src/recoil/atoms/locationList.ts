import {ILocation} from '../interface';
import {atom} from 'recoil';

export const locationListState = atom<ILocation[]>({
  key: 'LocationListState',
  default: [],
});
