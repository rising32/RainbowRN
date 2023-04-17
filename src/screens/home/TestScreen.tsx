import React from 'react';
import {
  Text,
  Pressable,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import useCalibrationItem from './hooks/useCalibrationItem';
import DropDownPicker from 'react-native-dropdown-picker';

const EditCalibrationScreen = () => {
  const {
    loading,
    error,
    dateString,
    timeString,
    visibleRLS,
    visibleMPT,
    rmlReading,
    mptForce,
    onChangeRmlReading,
    onChangeMptForce,
    photoURI,
    onChangePhoto,
    onCreateOrSave,
    pickerImage,
    instrumentList,
  } = useCalibrationItem();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  console.log(value);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          padding: 30,
          rowGap: 10,
          backgroundColor: 'white',
          width: '100%',
        }}>
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
        <View style={[styles.view, {zIndex: 3000}]}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Instrument S/N</Text>
          </View>
          <DropDownPicker
            open={open}
            value={value}
            items={instrumentList}
            setOpen={setOpen}
            setValue={setValue}
            zIndex={3000}
            zIndexInverse={1000}
          />
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
            editable={visibleRLS}
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
            editable={visibleMPT}
          />
        </View>
        <View style={styles.view}>
          <Text style={{fontSize: 18, color: 'black'}}>Calibration Photo</Text>
          <PhotoItem
            photoUri={photoURI}
            cancelPhoto={() => onChangePhoto(null)}
            pickerImage={pickerImage}
          />
        </View>

        {error && (
          <Text style={{textAlign: 'center', color: 'red'}}>{error}</Text>
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
            onPress={onCreateOrSave}>
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                Save & Exit
              </Text>
            )}
          </Pressable>
        </View>
      </View>
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
});
export default EditCalibrationScreen;
