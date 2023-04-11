import {StackScreenProps} from '@react-navigation/stack';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {ICalibration, IInspection, InspectionStatus} from '../recoil/interface';

export type PublicRootStackParamList = {
  Login: undefined;
};
export enum PUBLICSCREENS {
  LOGIN = 'Login',
}

export type AuthenticatedRootStackParamList = {
  Main: NavigatorScreenParams<DrawerParamList>;
  EditCalibration: {item: ICalibration | null; title: string};
  EditInspection: {item: IInspection; status: InspectionStatus; title: string};
  Camera: undefined;
};
export type AuthenticatedRootStackScreenProps<
  T extends keyof AuthenticatedRootStackParamList,
> = StackScreenProps<AuthenticatedRootStackParamList, T>;

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
    AuthenticatedRootStackScreenProps<keyof AuthenticatedRootStackParamList>
  >;

export enum DRAWERSCREENS {
  CALIBRATION = 'Calibration',
  BEGININSPECTION = 'BeginInspection',
  REJECTEDINSPECTION = 'RejectedInspection',
  ACCEPTEDINSPECTION = 'AcceptedInspection',
  CAMERA = 'Camera',
}

export type LoginScreenProp = StackScreenProps<
  PublicRootStackParamList,
  PUBLICSCREENS.LOGIN
>;
export type CameraScreenProp = StackScreenProps<
  AuthenticatedRootStackParamList,
  AUTHENTICATEDSCREENS.CAMERA
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthenticatedRootStackParamList {}
  }
}
