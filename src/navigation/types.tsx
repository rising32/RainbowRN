import {StackScreenProps} from '@react-navigation/stack';

export type PublicRootStackParamList = {
  Login: undefined;
  Signup: undefined;
};
export enum PUBLICSCREENS {
  LOGIN = 'Login',
  SIGNUP = 'Signup',
}

export type AuthenticatedRootStackParamList = {
  home: undefined;
  manage: undefined;
};

export enum AUTHENTICATEDSCREENS {
  HOME = 'home',
  MANAGE = 'manage',
}

export type LoginScreenProp = StackScreenProps<
  PublicRootStackParamList,
  PUBLICSCREENS.LOGIN
>;
export type SignUpScreenProp = StackScreenProps<
  PublicRootStackParamList,
  PUBLICSCREENS.SIGNUP
>;
export type HomeScreenProp = StackScreenProps<
  AuthenticatedRootStackParamList,
  AUTHENTICATEDSCREENS.HOME
>;
