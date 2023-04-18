import {useNavigation, useRoute} from '@react-navigation/native';
import {
  AUTHENTICATEDSCREENS,
  AuthenticatedStackScreenProps,
} from '../../../navigation/types';
import React from 'react';
import {Alert, Keyboard} from 'react-native';
import {ICalibration} from '../../../recoil/interface';
import {format} from 'date-fns';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {coreState, instrumentState, userState} from '../../../recoil/atoms';
import {AppContext} from '../../../libs/contexts/AppProvider';
import {request} from '../../../utils';
import {Asset} from 'react-native-image-picker';

export default function useCalibrationItem() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [calibration, setCalibration] = React.useState<ICalibration | null>(
    null,
  );
  const [date, setDate] = React.useState<Date>(new Date());
  const [instrumentSN, setInstrumentSN] = React.useState(0);
  const [instrumentValue, setInstrumentValue] = React.useState('');
  const [rmlReading, setRmlReading] = React.useState('');
  const [mptForce, setMptForce] = React.useState('');
  const [photoURI, setPhotoURI] = React.useState<string | null>(null);
  const [uploadPhotoURI, setUploadPhotoURI] = React.useState<string | null>(
    null,
  );
  const [instrumentPickerValue, setInstrumentPickerValue] =
    React.useState(null);

  const navigation =
    useNavigation<
      AuthenticatedStackScreenProps<AUTHENTICATEDSCREENS.EDITCALIBRATION>['navigation']
    >();
  const route =
    useRoute<
      AuthenticatedStackScreenProps<AUTHENTICATEDSCREENS.EDITCALIBRATION>['route']
    >();

  const {instrumentRLM, instrumentMPT} = useRecoilValue(instrumentState);
  const {defaultURL} = React.useContext(AppContext);
  const user = useRecoilValue(userState);
  const setCoreState = useSetRecoilState(coreState);

  React.useEffect(() => {
    if (route.params.item) {
      setLoading(false);
      setCalibration(route.params.item);
      setInstrumentSN(route.params.item.caliInstrumentSN + 1);
    }
  }, [route]);
  React.useEffect(() => {
    if (calibration && instrumentRLM.length > 0 && instrumentMPT.length > 0) {
      if (
        calibration.caliInstrumentSNType === 'RLM' &&
        calibration.caliInstrumentSN < instrumentRLM.length
      ) {
        setInstrumentSN(calibration.caliInstrumentSN + 1);
        setInstrumentValue(
          instrumentRLM[calibration.caliInstrumentSN].instrumentName,
        );
        setRmlReading(calibration.caliRLMReading || '');
      }
      if (
        calibration.caliInstrumentSNType === 'MPT' &&
        instrumentRLM.length > 0 &&
        calibration.caliInstrumentSN < instrumentMPT.length
      ) {
        setInstrumentSN(
          calibration.caliInstrumentSN + instrumentRLM.length + 1,
        );
        setInstrumentValue(
          instrumentMPT[calibration.caliInstrumentSN].instrumentName,
        );
        setMptForce(calibration.caliMPTForce || '');
      }
    }
  }, [calibration, instrumentRLM, instrumentMPT]);
  React.useEffect(() => {
    if (calibration?.caliPhoto) {
      setPhotoURI(calibration.caliPhoto);
    }
  }, [calibration]);
  React.useEffect(() => {
    if (calibration?.caliDate) {
      setDate(new Date(calibration.caliDate));
    } else {
      setDate(new Date());
    }
  }, [calibration]);

  const instrumentPickerList = React.useMemo(() => {
    let rlm: string[] = [];
    let mpt: string[] = [];
    if (instrumentRLM.length > 0) {
      rlm = instrumentRLM.map(element => element.instrumentName);
    }
    if (instrumentMPT.length > 0) {
      mpt = instrumentMPT.map(element => element.instrumentName);
    }
    return [...rlm, ...mpt];
  }, [instrumentRLM, instrumentMPT]);

  const instrumentList = React.useMemo(() => {
    let rlm: {label: string; value: string}[] = [];
    let mpt: {label: string; value: string}[] = [];
    if (instrumentRLM.length > 0) {
      rlm = instrumentRLM.map(element => ({
        label: element.instrumentName,
        value: element.instrumentName,
      }));
    }
    if (instrumentMPT.length > 0) {
      mpt = instrumentMPT.map(element => ({
        label: element.instrumentName,
        value: element.instrumentName,
      }));
    }
    return [...rlm, ...mpt];
  }, [instrumentRLM, instrumentMPT]);
  const dateString = React.useMemo(() => format(date, 'yyyy-MM-dd'), [date]);
  const timeString = React.useMemo(() => format(date, 'kk:mm:ss'), [date]);

  const changeInstrument = (value: string, index: number) => {
    setInstrumentValue(value);
    setInstrumentSN(index);

    if (index <= instrumentRLM.length) {
      setMptForce('');
    } else {
      setRmlReading('');
    }
  };

  const visibleRLS = React.useMemo(
    () =>
      instrumentRLM &&
      instrumentSN !== 0 &&
      instrumentSN <= instrumentRLM.length,
    [instrumentRLM, instrumentSN],
  );
  const visibleMPT = React.useMemo(
    () =>
      instrumentMPT &&
      instrumentSN !== 0 &&
      instrumentSN > instrumentRLM.length &&
      instrumentSN <= instrumentRLM.length + instrumentMPT.length,
    [instrumentMPT, instrumentRLM, instrumentSN],
  );

  const onChangeRmlReading = (text: string) => {
    setRmlReading(text);
    setError('');
  };
  const onChangeMptForce = (text: string) => {
    setMptForce(text);
    setError('');
  };
  const reset = () => {
    setInstrumentSN(0);
    setRmlReading('');
    setMptForce('');
  };
  const onChangePhoto = (photo: string | null) => {
    setPhotoURI(photo);
  };
  const onCreateOrSave = async () => {
    if (instrumentSN === 0) {
      setError('Instrument is required.');
      return;
    }
    const id = user?._id || user?.userId;
    if (!id) {
      return;
    }
    if (instrumentSN <= instrumentRLM.length) {
      if (!rmlReading) {
        setError('RML is required.');
        return;
      }
      if (isNaN(parseInt(rmlReading, 10))) {
        setError('RML must be number.');
        return;
      }
      if (parseInt(rmlReading, 10) > 0) {
        setError('RML must be less than zero.');
        return;
      }
    } else {
      if (!mptForce) {
        setError('MPT is required.');
        return;
      }
      if (isNaN(parseInt(mptForce, 10))) {
        setError('MPT must be number.');
        return;
      }
      if (parseInt(mptForce, 10) < 0) {
        setError('MPT must be greater than zero.');
        return;
      }
    }

    try {
      Keyboard.dismiss();
      setError('');
      setLoading(true);

      const instrumentRLMNum = instrumentRLM.length;
      let params = {
        userId: id,
        caliDate: date,
        caliInstrumentSN:
          instrumentSN > instrumentRLMNum
            ? instrumentSN - instrumentRLMNum - 1
            : instrumentSN - 1,
        caliInstrumentSNType: instrumentSN > instrumentRLMNum ? 'MPT' : 'RLM',
        caliRLMReading: rmlReading,
        caliMPTForce: mptForce,
        caliInspector: user._id,
        caliInspectorName: user.firstName + ' ' + user.lastName,
      };

      if (instrumentSN <= instrumentRLMNum) {
        const value = instrumentRLM[instrumentSN - 1];
        const max = Math.max(value.instrumentFrom, value.instrumentTo);
        const min = Math.min(value.instrumentFrom, value.instrumentTo);
        if (
          min <= parseInt(rmlReading, 10) &&
          parseInt(rmlReading, 10) <= max
        ) {
          params = Object.assign(params, {caliStatus: 1});
        } else {
          params = Object.assign(params, {caliStatus: 2});
        }
      } else {
        const value = instrumentMPT[instrumentSN - instrumentRLMNum - 1];
        const max = Math.max(value.instrumentFrom, value.instrumentTo);
        const min = Math.min(value.instrumentFrom, value.instrumentTo);
        if (
          min <= parseInt(rmlReading, 10) &&
          parseInt(rmlReading, 10) <= max
        ) {
          params = Object.assign(params, {caliStatus: 1});
        } else {
          params = Object.assign(params, {caliStatus: 2});
        }
      }

      if (uploadPhotoURI) {
        params = Object.assign(params, {caliPhoto: uploadPhotoURI});
      } else {
        if (photoURI) {
          params = Object.assign(params, {caliPhoto: photoURI});
        }
      }

      console.log(params);
      if (calibration) {
        await request(`${defaultURL}/api/inscalibration/${calibration._id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });
      } else {
        await request(`${defaultURL}/api/inscalibration`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });
      }
    } catch (err) {
      console.log(`${defaultURL}/api/inscalibration failed`, err);
      setError(calibration ? 'save error' : 'create error');
    } finally {
      setLoading(false);
      navigation.goBack();
    }
  };
  const pickerImage = async (image: Asset) => {
    try {
      setCoreState({loading: true, loadingText: 'Uploading'});
      setPhotoURI(`file://${image.uri}`);
      const form = new FormData();
      form.append('file', {
        uri: `file://${image.uri}`,
        name: 'calibration',
        type: image.type,
      });
      form.append('name', 'nuxt-rlm-bucket/calibration-image');
      form.append('fileType', image.type);
      const data = await request<{file: string}>(
        `${defaultURL}/api/awsobjectsinbucket`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: form,
        },
      );
      Alert.alert('Image Upload successed!', data.file);
      console.log('Image Upload successed!', data.file);
      setUploadPhotoURI(data.file);
      setCoreState({loading: false});
    } catch (err) {
      console.log(`${defaultURL}/api/inscalibration failed`, err);
      setError('image upload failed');
      Alert.alert('Image Upload failed!');
    }
  };

  return {
    loading,
    error,
    dateString,
    timeString,
    instrumentPickerList,
    changeInstrument,
    instrumentValue,
    instrumentSN,
    visibleRLS,
    visibleMPT,
    rmlReading,
    mptForce,
    onChangeRmlReading,
    onChangeMptForce,
    reset,
    photoURI,
    onChangePhoto,
    onCreateOrSave,
    pickerImage,
    instrumentList,
    instrumentPickerValue,
    setInstrumentPickerValue,
  };
}
