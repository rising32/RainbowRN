import React, {useState, useCallback, useEffect} from 'react';
import {
  Text,
  Pressable,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {AppContext} from '../../libs/contexts/AppProvider';
import {useRecoilValue} from 'recoil';
import {instrumentState, userState} from '../../recoil/atoms';
import {
  AUTHENTICATEDSCREENS,
  AuthenticatedStackScreenProps,
} from '../../navigation/types';
import {request} from '../../utils';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import useCalibrationItem from './hooks/useCalibrationItem';

const EditCalibrationScreen = ({
  route,
  navigation,
}: AuthenticatedStackScreenProps<AUTHENTICATEDSCREENS.EDITCALIBRATION>) => {
  const item = route.params.item;
  const [instrumentSN, setInstrumentSN] = useState<number | null>(null);
  const [rmlReading, setRmlReading] = useState('');
  const [mptForce, setMptForce] = useState('');
  const [caliPhoto, setCaliPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const {instrumentRLM, instrumentMPT} = useRecoilValue(instrumentState);
  const [selectedInstrumentValue, setSelectedInstrumentRLMValue] = useState('');

  const {defaultURL} = React.useContext(AppContext);
  const user = useRecoilValue(userState);
  const {dateString, timeString} = useCalibrationItem();

  useEffect(() => {
    if (item) {
      setRmlReading(item.caliRLMReading);
      setMptForce(item.caliMPTForce || '');
      setCaliPhoto(item.caliPhoto);

      if (
        item.caliInstrumentSNType === 'RLM' &&
        item.caliInstrumentSN < instrumentRLM.length
      ) {
        setInstrumentSN(item.caliInstrumentSN);
        setSelectedInstrumentRLMValue(
          instrumentRLM[item.caliInstrumentSN].instrumentName,
        );
      } else if (
        item.caliInstrumentSNType === 'MPT' &&
        item.caliInstrumentSN < instrumentMPT.length
      ) {
        setInstrumentSN(item.caliInstrumentSN + 4);
        setSelectedInstrumentRLMValue(
          instrumentMPT[item.caliInstrumentSN].instrumentName,
        );
      }
    } else {
      resetForm();
    }
  }, [instrumentMPT, instrumentRLM, item]);

  const onChangeRmlReading = (text: string) => {
    setRmlReading(text);
    setErrorText('');
  };
  const onChangeMptForce = (text: string) => {
    setMptForce(text);
    setErrorText('');
  };
  const resetForm = () => {
    setInstrumentSN(null);
    setRmlReading('');
    setMptForce('');
  };

  const createCalibration = useCallback(async () => {
    if (instrumentSN === null) {
      setErrorText('Instrument is required.');
      return;
    }
    if (instrumentSN < 4) {
      if (!rmlReading) {
        setErrorText('RML is required.');
        return;
      }
      if (isNaN(parseInt(rmlReading, 10))) {
        setErrorText('RML must be number.');
        return;
      }
      if (parseInt(rmlReading, 10) > 0) {
        setErrorText('RML must be less than zero.');
        return;
      }
    } else {
      if (!mptForce) {
        setErrorText('MPT is required.');
        return;
      }
      if (isNaN(parseInt(mptForce, 10))) {
        setErrorText('MPT must be number.');
        return;
      }
      if (parseInt(mptForce, 10) < 0) {
        setErrorText('MPT must be greater than zero.');
        return;
      }
    }

    Keyboard.dismiss();
    setErrorText('');
    setLoading(true);

    try {
      console.log('creating calibration .....');
      const id = user?._id || user?.userId;

      const instrumentRLMNum = instrumentRLM.length;
      let formData = {
        // caliDate,
        caliInstrumentSN:
          instrumentSN > instrumentRLMNum - 1
            ? instrumentSN - instrumentRLMNum
            : instrumentSN,
        caliInstrumentSNType:
          instrumentSN > instrumentRLMNum - 1 ? 'MPT' : 'RLM',
        caliRLMReading: rmlReading,
        caliMPTForce: mptForce,
        caliInspector: id,
        caliInspectorName: user?.firstName + ' ' + user?.lastName,
      };
      if (instrumentSN < 4) {
        const value = instrumentRLM[instrumentSN];
        const max = Math.max(value.instrumentFrom, value.instrumentTo);
        const min = Math.min(value.instrumentFrom, value.instrumentTo);
        if (min < parseInt(rmlReading, 10) && parseInt(rmlReading, 10) < max) {
          formData = Object.assign(formData, {
            caliStatus: 1,
          });
        } else {
          formData = Object.assign(formData, {
            caliStatus: 2,
          });
        }
      } else {
        const value = instrumentMPT[instrumentSN - 3];
        const max = Math.max(value.instrumentFrom, value.instrumentTo);
        const min = Math.min(value.instrumentFrom, value.instrumentTo);
        if (min < parseInt(rmlReading, 10) && parseInt(rmlReading, 10) < max) {
          formData = Object.assign(formData, {
            caliStatus: 1,
          });
        } else {
          formData = Object.assign(formData, {
            caliStatus: 2,
          });
        }
      }

      if (caliPhoto) {
        formData = Object.assign(formData, {
          caliPhoto,
        });
      }

      if (item) {
        await request(`${defaultURL}/api/inscalibration/${item._id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        await request(`${defaultURL}/api/inscalibration`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      navigation.goBack();
    } catch (error) {
      console.log(`${defaultURL}/api/inscalibration/ failed`, error);
      setErrorText('Creating Calibration is failed.');
    } finally {
      setLoading(false);
    }
  }, [
    instrumentSN,
    rmlReading,
    mptForce,
    user?._id,
    user?.userId,
    user?.firstName,
    user?.lastName,
    instrumentRLM,
    caliPhoto,
    item,
    defaultURL,
    navigation,
    instrumentMPT,
  ]);

  const selectInstrument = (index: number) => {
    if (instrumentSN === null) {
      setRmlReading('');
      setMptForce('');
    } else if (instrumentSN < 4) {
      index > 3 && setRmlReading('');
    } else {
      index < 4 && setMptForce('');
    }
    setInstrumentSN(index);
  };
  const cancelPhoto = () => {
    setCaliPhoto(null);
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{
          padding: 30,
          rowGap: 10,
          backgroundColor: 'white',
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Date</Text>
          </View>

          <TextInput style={styles.input} value={dateString} editable={false} />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Time</Text>
          </View>
          <TextInput style={styles.input} value={timeString} editable={false} />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Instrument S/N</Text>
          </View>
          <View style={[{height: 54, borderWidth: 1, borderRadius: 5}]}>
            <Picker
              selectedValue={selectedInstrumentValue}
              placeholder=""
              onValueChange={(itemValue, itemIndex) => {
                console.log(itemValue, itemIndex);
                setSelectedInstrumentRLMValue(itemValue);
                selectInstrument(itemIndex);
              }}>
              <Picker.Item label={'Select'} value={'Select'} />
              {instrumentRLM.map(rlm => (
                <Picker.Item
                  key={rlm.instrumentType}
                  label={rlm.instrumentName}
                  value={rlm.instrumentName}
                  style={{
                    color:
                      selectedInstrumentValue === rlm.instrumentName
                        ? 'red'
                        : 'black',
                  }}
                />
              ))}
              {instrumentMPT.map(rlm => (
                <Picker.Item
                  key={rlm.instrumentType}
                  label={rlm.instrumentName}
                  value={rlm.instrumentName}
                  style={{
                    color:
                      selectedInstrumentValue === rlm.instrumentName
                        ? 'red'
                        : 'black',
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>{'RLS (LSU)'}</Text>
          </View>
          <TextInput
            style={styles.input}
            value={rmlReading}
            onChangeText={onChangeRmlReading}
            keyboardType="numeric"
            editable={instrumentSN !== null && instrumentSN < 4 ? true : false}
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>{'MPT (kg)'}</Text>
          </View>
          <TextInput
            style={styles.input}
            value={mptForce}
            onChangeText={onChangeMptForce}
            keyboardType="numeric"
            editable={instrumentSN !== null && instrumentSN > 3 ? true : false}
          />
        </View>
        <View style={styles.view}>
          <Text style={{fontSize: 18, color: 'black'}}>Calibration Photo</Text>
          <PhotoItem
            photoUri={caliPhoto}
            cancelPhoto={cancelPhoto}
            pickerImage={() => {}}
          />
        </View>

        {errorText && (
          <Text style={{textAlign: 'center', color: 'red'}}>{errorText}</Text>
        )}

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Pressable
            style={{
              backgroundColor: 'red',
              width: '100%',
              paddingVertical: 10,
              borderRadius: 100,
              marginTop: 20,
            }}
            disabled={loading}
            onPress={createCalibration}>
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                Save & Exit
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
  },
  label: {
    marginBottom: 3,
    paddingLeft: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  disableInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'aliceblue',
  },
  dropdownStyle: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  dropdownBtnTxtStyle: {fontSize: 16, textAlign: 'left'},
  photoView: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'aliceblue',
    height: 150,
    justifyContent: 'center',
    paddingVertical: 1,
  },
});
export default EditCalibrationScreen;
