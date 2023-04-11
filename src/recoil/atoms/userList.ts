import {IAdmin} from '../interface';
import {atom} from 'recoil';

export const userListState = atom<IAdmin[]>({
  key: 'UserListState',
  default: [],
});
