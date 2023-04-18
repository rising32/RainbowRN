import {atom} from 'recoil';

export type CoreType = {
  loading: boolean;
  loadingText?: string;
};

export const coreState = atom<CoreType>({
  key: 'CoreState',
  default: {
    loading: false,
    loadingText: '',
  },
});
