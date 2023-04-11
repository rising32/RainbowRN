import {atom} from 'recoil';

export const configState = atom<string>({
  key: 'ConfigState',
  default: 'http://18.217.36.36',
});
