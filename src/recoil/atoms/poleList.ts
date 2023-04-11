import {IPole} from '../interface';
import {atom} from 'recoil';

export const poleListState = atom<IPole[]>({
  key: 'PoleListState',
  default: [],
});
