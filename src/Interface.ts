export type ThemeContextType = 'light' | 'dark';

export type LayoutContextType = {
  width: number;
  height: number;
  heightRatio: number;
  widthRatio: number;
  isLandscape: boolean;
  fontScale: number;
};

export type IUserRole = 'guest' | 'admin' | 'user';

export type IUser = {
  id: string;
  username: string;
  role: IUserRole;
};

export const DefaultUser: IUser = {
  id: '0',
  username: 'guest',
  role: 'guest',
};

export type IMenu = {
  id: string;
  title: string;
};

export type IVideo = {
  id: string;
  title: string;
};
