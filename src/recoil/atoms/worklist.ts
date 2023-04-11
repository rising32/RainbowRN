import {IWorkNumber} from '../interface';
import {atom} from 'recoil';

export const workListState = atom<IWorkNumber[]>({
  key: 'WorkListState',
  default: [],
});
