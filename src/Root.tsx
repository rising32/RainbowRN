import React from 'react';
import NavigationRoot from './navigation/NavigationRoot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {
  SettingType,
  locationListState,
  poleListState,
  settingState,
  userListState,
  userState,
  workListState,
  CritialInfoType,
  criterialInfoState,
  instrumentState,
} from './recoil/atoms';
import SplashScreen from 'react-native-splash-screen';
import {request} from './utils';
import {
  IAdmin,
  ILocation,
  IPole,
  IUser,
  IWorkNumber,
  InstrumentType,
} from './recoil/interface';
import {AppContext} from './libs/contexts/AppProvider';

const Root = () => {
  const [isReady, setIsReady] = React.useState(false);
  const [isSplashShown, setIsSplashShown] = React.useState(true);
  const [isNavigationReady, setIsNavigationReady] = React.useState(false);

  const [user, setUser] = useRecoilState(userState);
  const {defaultURL} = React.useContext(AppContext);
  const setSetting = useSetRecoilState(settingState);
  const setWorkList = useSetRecoilState(workListState);
  const setPoleList = useSetRecoilState(poleListState);
  const setLocationList = useSetRecoilState(locationListState);
  const setUserList = useSetRecoilState(userListState);
  const setCriterialInfo = useSetRecoilState(criterialInfoState);
  const setInstrument = useSetRecoilState(instrumentState);

  const fetchUser = React.useCallback(async () => {
    try {
      console.log('checking AsyncStorage.........');
      const token = await AsyncStorage.getItem('@user_id');
      console.log('token value = ', token);
      if (token) {
        const userInfo = await request<IUser>(
          `${defaultURL}/api/usersadmin/${token}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        if (userInfo.role === 2) {
          setUser(userInfo);
        }
      }
    } catch (error) {
      console.log('login with AsyncStorage failed ..... error = ', error);
      await AsyncStorage.removeItem('@user_token');
      console.log('AsyncStorage remove user_token.....');
    } finally {
      setIsReady(true);
    }
  }, [defaultURL, setUser]);

  React.useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [fetchUser, user]);

  const fetchCalibrationSetting = React.useCallback(async () => {
    try {
      const settingType = await request<SettingType[]>(
        `${defaultURL}/api/settingparameters`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      setSetting(settingType[0]);
    } catch (error) {
      console.log(`${defaultURL}/api/settingparameters ... failed`, error);
    }
  }, [defaultURL, setSetting]);

  React.useEffect(() => {
    if (user) {
      fetchCalibrationSetting();
    }
  }, [fetchCalibrationSetting, user]);

  const fetchWorkList = React.useCallback(async () => {
    try {
      const workNumberList = await request<IWorkNumber[]>(
        `${defaultURL}/api/workorder`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      setWorkList(workNumberList);
    } catch (error) {
      console.log(`${defaultURL}/api/workorder ... failed`, error);
    }
  }, [defaultURL, setWorkList]);

  React.useEffect(() => {
    if (user) {
      fetchWorkList();
    }
  }, [fetchWorkList, user]);

  const fetchPoleList = React.useCallback(async () => {
    try {
      const poleList = await request<IPole[]>(
        `${defaultURL}/api/settingpoleid`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      setPoleList(poleList);
    } catch (error) {
      console.log(`${defaultURL}/api/settingpoleid ... failed`, error);
    }
  }, [defaultURL, setPoleList]);

  React.useEffect(() => {
    if (user) {
      fetchPoleList();
    }
  }, [fetchPoleList, user]);

  const fetchLocationList = React.useCallback(async () => {
    try {
      const locationList = await request<ILocation[]>(
        `${defaultURL}/api/settinglocation`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      setLocationList(locationList);
    } catch (error) {
      console.log(`${defaultURL}/api/settinglocation ... failed`, error);
    }
  }, [defaultURL, setLocationList]);

  React.useEffect(() => {
    if (user) {
      fetchLocationList();
    }
  }, [fetchLocationList, user]);

  const fetchAdminList = React.useCallback(async () => {
    try {
      const userList = await request<IAdmin[]>(`${defaultURL}/api/usersadmin`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      setUserList(userList);
    } catch (error) {
      console.log(`${defaultURL}/api/usersadmin ... failed`, error);
    }
  }, [defaultURL, setUserList]);

  React.useEffect(() => {
    if (user) {
      fetchAdminList();
    }
  }, [fetchAdminList, user]);

  const fetchCriterialInfo = React.useCallback(async () => {
    try {
      const critialInfoList = await request<CritialInfoType[]>(
        `${defaultURL}/api/settingcriteria`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      setCriterialInfo(critialInfoList[0]);
    } catch (error) {
      console.log(`${defaultURL}/api/settingcriteria ... failed`, error);
    }
  }, [defaultURL, setCriterialInfo]);

  React.useEffect(() => {
    if (user) {
      fetchCriterialInfo();
    }
  }, [fetchCriterialInfo, user]);

  const fetchInstrument = React.useCallback(async () => {
    try {
      const settingInstrumentList = await request<InstrumentType[]>(
        `${defaultURL}/api/settinginstruments`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      setInstrument(settingInstrumentList[0]);
    } catch (error) {
      console.log(`${defaultURL}/api/settinginstruments failed`, error);
    }
  }, [defaultURL, setInstrument]);

  React.useEffect(() => {
    if (user) {
      fetchInstrument();
    }
  }, [fetchInstrument, user]);

  const navigationReady = () => {
    console.log('navigation ready!');
    setIsNavigationReady(true);
  };
  const isAuthenticated = React.useCallback(() => {
    const authToken = user?.userId;
    return Boolean(authToken);
  }, [user?.userId]);
  React.useEffect(() => {
    if (!isNavigationReady || !isSplashShown) {
      return;
    }
    const shouldHideSplash = !isAuthenticated() || isReady;
    if (shouldHideSplash) {
      SplashScreen.hide();
      setIsSplashShown(false);
    }
  }, [isAuthenticated, isNavigationReady, isReady, isSplashShown]);

  return <NavigationRoot onReady={navigationReady} />;
};

export default Root;
