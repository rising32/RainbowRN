import {StackScreenProps} from '@react-navigation/stack';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {ICalibration, IInspection, InspectionType} from '../recoil/interface';

export type PublicStackParamList = {
  Login: undefined;
};
export enum PUBLICSCREENS {
  LOGIN = 'Login',
}

export type AuthenticatedStackParamList = {
  Main: NavigatorScreenParams<DrawerParamList>;
  EditCalibration: {item: ICalibration | null; title: string};
  EditInspection: {item: IInspection; type: InspectionType; title: string};
  Camera: undefined;
};
export type AuthenticatedStackScreenProps<
  T extends keyof AuthenticatedStackParamList,
> = StackScreenProps<AuthenticatedStackParamList, T>;

export enum AUTHENTICATEDSCREENS {
  MAIN = 'Main',
  CAMERA = 'Camera',
  EDITCALIBRATION = 'EditCalibration',
  EDITINSPECTION = 'EditInspection',
}

export type DrawerParamList = {
  Calibration: undefined;
  BeginInspection: undefined;
  RejectedInspection: undefined;
  AcceptedInspection: undefined;
  Camera: undefined;
};

export type AppDrawerScreenProps<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    AuthenticatedStackScreenProps<keyof AuthenticatedStackParamList>
  >;

export enum DRAWERSCREENS {
  CALIBRATION = 'Calibration',
  BEGININSPECTION = 'BeginInspection',
  REJECTEDINSPECTION = 'RejectedInspection',
  ACCEPTEDINSPECTION = 'AcceptedInspection',
  CAMERA = 'Camera',
}

export type LoginScreenProp = StackScreenProps<
  PublicStackParamList,
  PUBLICSCREENS.LOGIN
>;
export type CameraScreenProp = StackScreenProps<
  AuthenticatedStackParamList,
  AUTHENTICATEDSCREENS.CAMERA
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthenticatedStackParamList {}
  }
}
