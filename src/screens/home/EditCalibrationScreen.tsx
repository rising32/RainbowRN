import React from 'react';
import {
  Text,
  Pressable,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import useCalibrationItem from './hooks/useCalibrationItem';

const EditCalibrationScreen = () => {
  const {
    loading,
    error,
    dateString,
    timeString,
    changeInstrument,
    instrumentValue,
    instrumentPickerList,
    visibleRLS,
    visibleMPT,
    rmlReading,
    mptForce,
    onChangeRmlReading,
    onChangeMptForce,
    photoURI,
    onChangePhoto,
    onCreateOrSave,
  } = useCalibrationItem();

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
              selectedValue={instrumentValue}
              onValueChange={(itemValue, itemIndex) =>
                changeInstrument(itemValue, itemIndex)
              }>
              <Picker.Item
                label={'Select'}
                value={'Select'}
                style={{
                  color: 'ligthblue',
                }}
              />
              {instrumentPickerList.map(pickerItem => (
                <Picker.Item
                  key={pickerItem}
                  label={pickerItem}
                  value={pickerItem}
                  style={{
                    color: instrumentValue === pickerItem ? 'black' : 'gray',
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
            pickerImage={() => {}}
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
