import {atom} from 'recoil';

export type CoreType = {
  loading: boolean;
};

export const coreState = atom<CoreType>({
  key: 'CoreState',
  default: {
    loading: false,
  },
});
