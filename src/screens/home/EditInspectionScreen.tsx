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
import useInspectionItem from './hooks/useInspectionItem';
import {Asset} from 'react-native-image-picker';
import {RefreshSVG} from '../../components/Icons';

const EditInspectionScreen = () => {
  const {
    loading,
    error,
    inspectionType,
    paramMaterial,
    paramShape,
    paramBrand,
    paramType,
    paramSurface,
    paramGround,
    paramRust,
    workNumber,
    inspectionDateString,
    poleItem,
    locationItem,
    gpsCoordinates,
    getGPSCordinate,
    onChangeGPSCoordinate,
    inspectorName,
    selectedPoleShape,
    selectedPoleMaterial,
    selectedPoleBrand,
    selectedPoleYear,
    selectedPoleType,
    selectedPoleSurface,
    selectedPoleGround,
    selectedPoleBase,
    selectedPoleBody,
    selectedPoleArm,
    selectedRustCondition,
    changePoleShape,
    changePoleMaterial,
    changePoleBrand,
    changePoleYear,
    changePoleType,
    changePoleSurface,
    changePoleGround,
    changePoleBase,
    changePoleBody,
    changePoleArm,
    changeRustCondition,
    observation,
    onChangeObservation,
    lossMass1,
    lossMass2,
    lossMass3,
    lossMass4,
    magnetic1,
    magnetic2,
    magnetic3,
    magnetic4,
    onChangeLossMass1,
    onChangeLossMass2,
    onChangeLossMass3,
    onChangeLossMass4,
    onChangeMagnetic1,
    onChangeMagnetic2,
    onChangeMagnetic3,
    onChangeMagnetic4,
    observationLast,
    onChangeObservationLast,
    poleTypeIndex,
    poleYearList,
    poleParamList,
    photosPoleId,
    photosPoleLabel,
    photosEntirePole,
    photosOther,
    photosPoleBase1,
    photosPoleBase2,
    photosPoleBase3,
    photosPoleBase4,
    cancelPhoto,
    onSave,
    pickerImage,
  } = useInspectionItem();

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
            <Text style={{fontSize: 18, color: 'black'}}>WO No.</Text>
          </View>

          <TextInput
            style={styles.input}
            value={workNumber?.woNumber}
            editable={false}
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Inspection Date</Text>
          </View>

          <TextInput
            style={styles.input}
            value={inspectionDateString}
            editable={false}
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Location</Text>
          </View>

          <TextInput
            style={styles.input}
            value={locationItem?.locationName}
            editable={false}
            multiline
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole ID</Text>
          </View>

          <TextInput
            style={styles.input}
            value={poleItem?.poleidName}
            editable={false}
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>GPS Coordinates</Text>
          </View>

          <View>
            <TextInput
              style={styles.input}
              value={gpsCoordinates}
              onChangeText={onChangeGPSCoordinate}
              editable={false}
            />
            {inspectionType !== 'accepted' && (
              <Pressable
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 15,
                }}
                onPress={getGPSCordinate}>
                <RefreshSVG width={22} height={22} stroke="black" />
              </Pressable>
            )}
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Inspector Name</Text>
          </View>

          <TextInput
            style={styles.input}
            value={inspectorName}
            editable={false}
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Material</Text>
          </View>
          <View style={[{height: 54, borderWidth: 1, borderRadius: 5}]}>
            <Picker
              selectedValue={selectedPoleMaterial}
              onValueChange={itemValue => changePoleMaterial(itemValue)}
              enabled={inspectionType !== 'accepted'}>
              <Picker.Item
                label={'Select'}
                value={'Select'}
                style={{
                  color: 'ligthblue',
                }}
              />
              {paramMaterial.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleMaterial === element ? 'black' : 'gray',
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Shape</Text>
          </View>
          <View style={[{height: 54, borderWidth: 1, borderRadius: 5}]}>
            <Picker
              selectedValue={selectedPoleShape}
              onValueChange={itemValue => changePoleShape(itemValue)}
              enabled={inspectionType !== 'accepted'}>
              <Picker.Item
                label={'Select'}
                value={'Select'}
                style={{
                  color: 'ligthblue',
                }}
              />
              {paramShape.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleShape === element ? 'black' : 'gray',
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Brand</Text>
          </View>
          <View style={[{height: 54, borderWidth: 1, borderRadius: 5}]}>
            <Picker
              selectedValue={selectedPoleBrand}
              onValueChange={itemValue => changePoleBrand(itemValue)}
              placeholder="dsdfsd"
              enabled={inspectionType !== 'accepted'}>
              <Picker.Item
                label={'Select'}
                value={'Select'}
                style={{
                  color: 'ligthblue',
                }}
              />
              {paramBrand.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleBrand === element ? 'black' : 'gray',
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Year</Text>
          </View>
          <View style={[{height: 54, borderWidth: 1, borderRadius: 5}]}>
            <Picker
              selectedValue={selectedPoleYear}
              onValueChange={itemValue => changePoleYear(itemValue)}
              enabled={inspectionType !== 'accepted'}>
              <Picker.Item
                label={'Select'}
                value={'Select'}
                style={{
                  color: 'ligthblue',
                }}
              />
              {poleYearList.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleYear === element ? 'black' : 'gray',
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Type</Text>
          </View>
          <View style={[{height: 54, borderWidth: 1, borderRadius: 5}]}>
            <Picker
              selectedValue={selectedPoleType}
              onValueChange={itemValue => changePoleType(itemValue)}
              enabled={inspectionType !== 'accepted'}>
              <Picker.Item
                label={'Select'}
                value={'Select'}
                style={{
                  color: 'ligthblue',
                }}
              />
              {paramType.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleType === element ? 'black' : 'gray',
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Surface</Text>
          </View>
          <View style={[{height: 54, borderWidth: 1, borderRadius: 5}]}>
            <Picker
              selectedValue={selectedPoleSurface}
              onValueChange={itemValue => changePoleSurface(itemValue)}
              enabled={inspectionType !== 'accepted'}>
              <Picker.Item
                label={'Select'}
                value={'Select'}
                style={{
                  color: 'ligthblue',
                }}
              />
              {paramSurface.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleSurface === element ? 'black' : 'gray',
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Ground</Text>
          </View>
          <View style={[{height: 54, borderWidth: 1, borderRadius: 5}]}>
            <Picker
              selectedValue={selectedPoleGround}
              onValueChange={itemValue => changePoleGround(itemValue)}
              enabled={inspectionType !== 'accepted'}>
              <Picker.Item
                label={'Select'}
                value={'Select'}
                style={{
                  color: 'ligthblue',
                }}
              />
              {paramGround.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleGround === element ? 'black' : 'gray',
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>
        <Text style={{fontSize: 20, color: 'black', marginVertical: 10}}>
          Visual Inspection
        </Text>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Base</Text>
          </View>
          <View style={[{height: 54, borderWidth: 1, borderRadius: 5}]}>
            <Picker
              selectedValue={selectedPoleBase}
              onValueChange={itemValue => changePoleBase(itemValue)}
              enabled={inspectionType !== 'accepted'}>
              <Picker.Item
                label={'Select'}
                value={'Select'}
                style={{
                  color: 'ligthblue',
                }}
              />
              {poleParamList.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleBase === element ? 'black' : 'gray',
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Body</Text>
          </View>
          <View style={[{height: 54, borderWidth: 1, borderRadius: 5}]}>
            <Picker
              selectedValue={selectedPoleBody}
              onValueChange={itemValue => changePoleBody(itemValue)}
              enabled={inspectionType !== 'accepted'}>
              <Picker.Item
                label={'Select'}
                value={'Select'}
                style={{
                  color: 'ligthblue',
                }}
              />
              {poleParamList.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleBody === element ? 'black' : 'gray',
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Arm</Text>
          </View>
          <View style={[{height: 54, borderWidth: 1, borderRadius: 5}]}>
            <Picker
              selectedValue={selectedPoleArm}
              onValueChange={itemValue => changePoleArm(itemValue)}
              enabled={inspectionType !== 'accepted'}>
              <Picker.Item
                label={'Select'}
                value={'Select'}
                style={{
                  color: 'ligthblue',
                }}
              />
              {poleParamList.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleArm === element ? 'black' : 'gray',
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Note:</Text>
          </View>

          <TextInput
            style={[styles.input, {height: 150, textAlignVertical: 'top'}]}
            value={observation}
            editable={inspectionType !== 'accepted'}
            onChangeText={onChangeObservation}
            multiline
          />
        </View>
        <Text style={{fontSize: 20, color: 'black', marginVertical: 10}}>
          {poleTypeIndex === 1
            ? 'Magnetic Particle Inspection:'
            : 'Relative Loss of Mass:'}
        </Text>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>#1</Text>
          </View>
          {poleTypeIndex === 1 ? (
            <TextInput
              style={styles.input}
              value={magnetic1}
              onChangeText={onChangeMagnetic1}
              keyboardType="numeric"
              editable={inspectionType !== 'accepted'}
            />
          ) : (
            <TextInput
              style={styles.input}
              value={lossMass1}
              onChangeText={onChangeLossMass1}
              keyboardType="numeric"
              editable={inspectionType !== 'accepted'}
            />
          )}
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>#2</Text>
          </View>
          {poleTypeIndex === 1 ? (
            <TextInput
              style={styles.input}
              value={magnetic2}
              onChangeText={onChangeMagnetic2}
              keyboardType="numeric"
              editable={inspectionType !== 'accepted'}
            />
          ) : (
            <TextInput
              style={styles.input}
              value={lossMass2}
              onChangeText={onChangeLossMass2}
              keyboardType="numeric"
              editable={inspectionType !== 'accepted'}
            />
          )}
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>#3</Text>
          </View>
          {poleTypeIndex === 1 ? (
            <TextInput
              style={styles.input}
              value={magnetic3}
              onChangeText={onChangeMagnetic3}
              keyboardType="numeric"
              editable={inspectionType !== 'accepted'}
            />
          ) : (
            <TextInput
              style={styles.input}
              value={lossMass3}
              onChangeText={onChangeLossMass3}
              keyboardType="numeric"
              editable={inspectionType !== 'accepted'}
            />
          )}
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>#4</Text>
          </View>
          {poleTypeIndex === 1 ? (
            <TextInput
              style={styles.input}
              value={magnetic4}
              onChangeText={onChangeMagnetic4}
              keyboardType="numeric"
              editable={inspectionType !== 'accepted'}
            />
          ) : (
            <TextInput
              style={styles.input}
              value={lossMass4}
              onChangeText={onChangeLossMass4}
              keyboardType="numeric"
              editable={inspectionType !== 'accepted'}
            />
          )}
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Rust condition</Text>
          </View>
          <View style={[{height: 54, borderWidth: 1, borderRadius: 5}]}>
            <Picker
              selectedValue={selectedRustCondition}
              onValueChange={itemValue => changeRustCondition(itemValue)}
              enabled={inspectionType !== 'accepted'}>
              <Picker.Item
                label={'Select'}
                value={'Select'}
                style={{
                  color: 'ligthblue',
                }}
              />
              {paramRust.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedRustCondition === element ? 'black' : 'gray',
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Observation</Text>
          </View>

          <TextInput
            style={[styles.input, {height: 150, textAlignVertical: 'top'}]}
            value={observationLast}
            onChangeText={onChangeObservationLast}
            editable={inspectionType !== 'accepted'}
            multiline
          />
        </View>
        <Text style={{fontSize: 20, color: 'black', marginVertical: 10}}>
          Photos:
        </Text>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole ID</Text>
          </View>
          <PhotoItem
            photoUri={photosPoleId}
            cancelPhoto={() => cancelPhoto('id')}
            pickerImage={(image: Asset) => pickerImage(image, 'id')}
            placeText="Pole ID number confirming right pole tested"
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Label</Text>
          </View>
          <PhotoItem
            photoUri={photosPoleLabel}
            cancelPhoto={() => cancelPhoto('label')}
            pickerImage={(image: Asset) => pickerImage(image, 'label')}
            placeText="Label of pole manufacturing information"
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Entire Pole</Text>
          </View>
          <PhotoItem
            photoUri={photosEntirePole}
            cancelPhoto={() => cancelPhoto('entire')}
            pickerImage={(image: Asset) => pickerImage(image, 'entire')}
            placeText="From pole base to lantern with background"
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Other</Text>
          </View>
          <PhotoItem
            photoUri={photosOther}
            cancelPhoto={() => cancelPhoto('other')}
            pickerImage={(image: Asset) => pickerImage(image, 'other')}
            placeText="Only when require for Pole internal by RVI or anti-rust treatment"
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Base #1</Text>
          </View>
          <PhotoItem
            photoUri={photosPoleBase1}
            cancelPhoto={() => cancelPhoto('base1')}
            pickerImage={(image: Asset) => pickerImage(image, 'base1')}
            placeText="Pole base section of about 300mm from ground line, photo taken horizontally"
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Base #2</Text>
          </View>
          <PhotoItem
            photoUri={photosPoleBase2}
            cancelPhoto={() => cancelPhoto('base2')}
            pickerImage={(image: Asset) => pickerImage(image, 'base2')}
            placeText="Pole base section of about 300mm from ground line, photo taken horizontally"
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Base #3</Text>
          </View>
          <PhotoItem
            photoUri={photosPoleBase3}
            cancelPhoto={() => cancelPhoto('base3')}
            pickerImage={(image: Asset) => pickerImage(image, 'base3')}
            placeText="Pole base section of about 300mm from ground line, photo taken horizontally"
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Base #4</Text>
          </View>
          <PhotoItem
            photoUri={photosPoleBase4}
            cancelPhoto={() => cancelPhoto('base4')}
            pickerImage={(image: Asset) => pickerImage(image, 'base4')}
            placeText="Pole base section of about 300mm from ground line, photo taken horizontally"
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
          {inspectionType !== 'accepted' && (
            <Pressable
              style={{
                backgroundColor: 'red',
                width: '40%',
                paddingVertical: 10,
                borderRadius: 100,
              }}
              disabled={loading}
              onPress={() => onSave(false)}>
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text
                  style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                  Save
                </Text>
              )}
            </Pressable>
          )}
          {inspectionType === 'begin' && (
            <Pressable
              style={{
                backgroundColor: 'darkcyan',
                width: '40%',
                paddingVertical: 10,
                borderRadius: 100,
              }}
              disabled={loading}
              onPress={() => onSave(true)}>
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 20,
                  }}>
                  Save Draft
                </Text>
              )}
            </Pressable>
          )}
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
});
export default EditInspectionScreen;
