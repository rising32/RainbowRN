import {IUser} from '../interface';
import {atom} from 'recoil';

export const userState = atom<IUser | null>({
  key: 'UserState',
  default: null,
});
