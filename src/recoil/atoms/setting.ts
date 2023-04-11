import {atom} from 'recoil';

export type SettingType = {
  paramMaterial: string[];
  paramMounting: string[];
  paramBrand: string[];
  paramType: string[];
  paramSurface: string[];
  paramGround: string[];
  paramNote: string[];
  paramRust: string[];
  paramInstrument: string[];
  paramDiv: string[];
  paramZone: string[];
  paramShape: string[];
};

export const settingState = atom<SettingType>({
  key: 'SettingState',
  default: {
    paramMaterial: [],
    paramMounting: [],
    paramBrand: [],
    paramType: [],
    paramSurface: [],
    paramGround: [],
    paramNote: [],
    paramRust: [],
    paramInstrument: [],
    paramDiv: [],
    paramZone: [],
    paramShape: [],
  },
});
