import {ICalibration} from './../../../recoil/interface';
import {AppContext} from './../../../libs/contexts/AppProvider';
import {userState} from './../../../recoil/atoms/user';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {useFocusEffect} from '@react-navigation/native';
import {request} from '../../../utils';

export default function useShowInspection() {
  const [havingTodayCalibration, setHavingTodayCalibration] =
    React.useState(false);
  const user = useRecoilValue(userState);
  const {defaultURL} = React.useContext(AppContext);

  useFocusEffect(
    React.useCallback(() => {
      const todayCalibration = async () => {
        try {
          const dataList = await request<ICalibration[]>(
            `${defaultURL}/api/inscalibrationtoday`,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            },
          );
          if (dataList.length > 0) {
            setHavingTodayCalibration(true);
          } else {
            setHavingTodayCalibration(false);
          }
        } catch (error) {
          console.log(
            `${defaultURL}/api/inscalibrationtoday ... failed`,
            error,
          );
        }
      };

      if (user) {
        todayCalibration();
      }
    }, [defaultURL, user]),
  );

  return {
    user,
    havingTodayCalibration,
  };
}
