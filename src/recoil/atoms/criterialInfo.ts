import {atom} from 'recoil';

export type CritialInfoType = {
  paramCriteriaA1: string;
  paramCriteriaA2: string;
  paramCriteriaA3: string;
  paramCriteriaA4: string;
  paramCriteriaA5: string;
  paramCriteriaB1: string;
  paramCriteriaB2: string;
  paramCriteriaB3: string;
  paramCriteriaB4: string;
  paramCriteriaB5: string;
  paramCriteriaC1: string;

  paramCriteriaC2: string;
  paramCriteriaC3: string;
  paramCriteriaC4: string;
  paramCriteriaC5: string;
  paramCriteriaD1: string;
  paramCriteriaD2: string;
  paramCriteriaD3: string;
  paramCriteriaD4: string;
  paramCriteriaD5: string;
  paramCriteriaE1: string;
  paramCriteriaE2: string;
  paramCriteriaE3: string;
  paramCriteriaE4: string;
  paramCriteriaE5: string;

  paramOverallBelow: number;
  paramOverallBelowWeight: number;
  paramOverallBetween: number;
  paramOverallBetween1: number;
  paramOverallBetweenWeight: number;
  paramOverallAbove: number;
  paramOverallAboveWeight: number;

  paramCriteriaA1From: number;
  paramCriteriaA1To: number;
  paramCriteriaA2From: number;
  paramCriteriaA2To: number;
  paramCriteriaA3From: number;
  paramCriteriaA3To: number;
  paramCriteriaA4From: number;
  paramCriteriaA4To: number;
  paramCriteriaA5From: number;
  paramCriteriaA5To: number;

  paramCrackA: string;
  paramCrackB: string;
  paramCrackC: string;
  paramCrackD: string;
  paramCrackE: string;
  paramNoCrackA: string;
  paramNoCrackB: string;
  paramNoCrackC: string;
  paramNoCrackD: string;
  paramNoCrackE: string;
  paramReadingCrack: string;
  paramReadingNoCrack: string;
  paramInstallMonth: number;
};

export const criterialInfoState = atom<CritialInfoType>({
  key: 'CreterialInfoState',
  default: {
    paramCriteriaA1: '',
    paramCriteriaA2: '',
    paramCriteriaA3: '',
    paramCriteriaA4: '',
    paramCriteriaA5: '',
    paramCriteriaB1: '',
    paramCriteriaB2: '',
    paramCriteriaB3: '',
    paramCriteriaB4: '',
    paramCriteriaB5: '',
    paramCriteriaC1: '',

    paramCriteriaC2: '',
    paramCriteriaC3: '',
    paramCriteriaC4: '',
    paramCriteriaC5: '',
    paramCriteriaD1: '',
    paramCriteriaD2: '',
    paramCriteriaD3: '',
    paramCriteriaD4: '',
    paramCriteriaD5: '',
    paramCriteriaE1: '',
    paramCriteriaE2: '',
    paramCriteriaE3: '',
    paramCriteriaE4: '',
    paramCriteriaE5: '',

    paramOverallBelow: 0,
    paramOverallBelowWeight: 0,
    paramOverallBetween: 0,
    paramOverallBetween1: 0,
    paramOverallBetweenWeight: 0,
    paramOverallAbove: 0,
    paramOverallAboveWeight: 0,

    paramCriteriaA1From: 0,
    paramCriteriaA1To: 0,
    paramCriteriaA2From: 0,
    paramCriteriaA2To: 0,
    paramCriteriaA3From: 0,
    paramCriteriaA3To: 0,
    paramCriteriaA4From: 0,
    paramCriteriaA4To: 0,
    paramCriteriaA5From: 0,
    paramCriteriaA5To: 0,

    paramCrackA: '',
    paramCrackB: '',
    paramCrackC: '',
    paramCrackD: '',
    paramCrackE: '',
    paramNoCrackA: '',
    paramNoCrackB: '',
    paramNoCrackC: '',
    paramNoCrackD: '',
    paramNoCrackE: '',
    paramReadingCrack: '',
    paramReadingNoCrack: '',
    paramInstallMonth: 0,
  },
});
