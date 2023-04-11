import React from 'react';
import {AppContext} from './../../../libs/contexts/AppProvider';
import {userState} from './../../../recoil/atoms/user';
import {ICalibration} from '../../../recoil/interface';
import {useRecoilValue} from 'recoil';
import {useFocusEffect} from '@react-navigation/native';
import {request} from '../../../utils';

export default function useCalibration() {
  const [clibrationList, setCalibrationList] = React.useState<ICalibration[]>(
    [],
  );
  const user = useRecoilValue(userState);
  const {defaultURL} = React.useContext(AppContext);

  const calibrationList = React.useCallback(async () => {
    try {
      const dataList = await request<ICalibration[]>(
        `${defaultURL}/api/inscalibration`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      setCalibrationList(dataList);
      console.log('calibration list ...', defaultURL.length);
    } catch (error) {
      console.log(`${defaultURL}/api/inscalibration... failed`, error);
    }
  }, [defaultURL]);

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        calibrationList();
      }
    }, [calibrationList, user]),
  );

  return {
    user,
    clibrationList,
  };
}
