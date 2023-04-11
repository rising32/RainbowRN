import {atom} from 'recoil';
import {InstrumentType} from '../interface';

export const instrumentState = atom<InstrumentType>({
  key: 'InstrumentState',
  default: {
    instrumentRLM: [],
    instrumentMPT: [],
  },
});
