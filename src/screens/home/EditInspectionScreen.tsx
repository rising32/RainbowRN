import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
  Text,
  Pressable,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import {format} from 'date-fns';
import {AppContext} from '../../libs/contexts/AppProvider';
import {useRecoilValue} from 'recoil';
import {
  criterialInfoState,
  locationListState,
  poleListState,
  settingState,
  userListState,
  workListState,
} from '../../recoil/atoms';
import Geolocation from '@react-native-community/geolocation';
import {
  AUTHENTICATEDSCREENS,
  AuthenticatedStackScreenProps,
} from '../../navigation/types';
import {Picker} from '@react-native-picker/picker';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import {request} from '../../utils';

type PhotoKind =
  | 'id'
  | 'label'
  | 'entire'
  | 'other'
  | 'base1'
  | 'base2'
  | 'base3'
  | 'base4';
const EditInspectionScreen = ({
  route,
  navigation,
}: AuthenticatedStackScreenProps<AUTHENTICATEDSCREENS.EDITINSPECTION>) => {
  const item = route.params.item;
  const status = route.params.status;
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [inspectionDate, setInspectionDate] = useState<Date | null>(null);
  const [gpsCoordinates, setGPSCoordinate] = useState('');
  const [marterialIndex, setMaterialIndex] = useState<number | null>(null);
  const [shapeIndex, setShapeIndex] = useState<number | null>(null);
  const [brandIndex, setBrandIndex] = useState<number | null>(null);
  const [poleYear, setPoleYear] = useState<string | null>(null);
  const [poleTypeIndex, setPoleTypeIndex] = useState<number | null>(null);
  const [poleSurfaceIndex, setPoleSurfaceIndex] = useState<number | null>(null);
  const [poleGroundIndex, setPoleGroundIndex] = useState<number | null>(null);
  const [poleBase, setPoleBase] = useState<string | null>(null);
  const [poleBody, setPoleBody] = useState<string | null>(null);
  const [poleArm, setPoleArm] = useState<string | null>(null);
  const [observation, setObservation] = useState('');
  const [lossMass1, setLossMass1] = useState('');
  const [lossMass2, setLossMass2] = useState('');
  const [lossMass3, setLossMass3] = useState('');
  const [lossMass4, setLossMass4] = useState('');
  const [magnetic1, setMagnetic1] = useState('');
  const [magnetic2, setMagnetic2] = useState('');
  const [magnetic3, setMagnetic3] = useState('');
  const [magnetic4, setMagnetic4] = useState('');
  const [observationLast, setObservationLast] = useState('');
  const [photosPoleId, setPhotosPoleId] = useState<string | null>(null);
  const [photosPoleLabel, setPhotosPoleLabel] = useState<string | null>(null);
  const [photosEntirePole, setPhotosEntirePole] = useState<string | null>(null);
  const [photosOther, setPhotosOther] = useState<string | null>(null);
  const [photosPoleBase1, setPhotosPoleBase1] = useState<string | null>(null);
  const [photosPoleBase2, setPhotosPoleBase2] = useState<string | null>(null);
  const [photosPoleBase3, setPhotosPoleBase3] = useState<string | null>(null);
  const [photosPoleBase4, setPhotosPoleBase4] = useState<string | null>(null);
  const [photoKind, setPhotoKind] = useState<PhotoKind>('id');

  const [selectedPoleMaterial, setSelectedPoleMaterial] = useState<
    string | null
  >(null);
  const [selectedPoleShape, setSelectedPoleShape] = useState<string | null>(
    null,
  );
  const [selectedPoleBrand, setSelectedPoleBrand] = useState<string | null>(
    null,
  );
  const [selectedPoleYear, setSelectedPoleYear] = useState<string | null>(null);
  const [selectedPoleType, setSelectedPoleType] = useState<string | null>(null);
  const [selectedPoleSurface, setSelectedPoleSurface] = useState<string | null>(
    null,
  );
  const [selectedPoleGround, setSelectedPoleGround] = useState<string | null>(
    null,
  );
  const [selectedPoleBase, setSelectedPoleBase] = useState<string | null>(null);
  const [selectedPoleBody, setSelectedPoleBody] = useState<string | null>(null);
  const [selectedPoleArm, setSelectedPoleArm] = useState<string | null>(null);
  const [selectedRustCondition, setSelectedRustCondition] = useState<
    string | null
  >(null);

  const {defaultURL} = React.useContext(AppContext);

  const [rustConditionIndex, setRustConditionIndex] = useState<number | null>(
    null,
  );

  const workList = useRecoilValue(workListState);
  const locationList = useRecoilValue(locationListState);
  const poleList = useRecoilValue(poleListState);
  const userList = useRecoilValue(userListState);
  const criterialInfo = useRecoilValue(criterialInfoState);
  const {
    paramMaterial,
    paramShape,
    paramBrand,
    paramType,
    paramSurface,
    paramGround,
    paramRust,
  } = useRecoilValue(settingState);

  useEffect(() => {
    if (item?.poleMaterial !== undefined && Number(item?.poleMaterial) >= 0) {
      setSelectedPoleMaterial(paramMaterial[item.poleMaterial]);
    }
    if (item?.poleShape !== undefined && Number(item?.poleShape) >= 0) {
      setSelectedPoleShape(paramShape[item.poleShape]);
    }
    if (item?.poleBrand !== undefined && Number(item?.poleBrand) >= 0) {
      setSelectedPoleBrand(paramBrand[item.poleBrand]);
    }
    if (item?.poleYear !== undefined && Number(item?.poleYear) >= 0) {
      setSelectedPoleYear(item.poleYear);
    }
    if (item?.poleType !== undefined && Number(item?.poleType) >= 0) {
      setSelectedPoleType(paramType[item.poleType]);
    }
    if (item?.poleSurface !== undefined && Number(item?.poleSurface) >= 0) {
      setSelectedPoleSurface(paramSurface[item.poleSurface]);
    }
    if (item?.poleGround !== undefined && Number(item?.poleGround) >= 0) {
      setSelectedPoleGround(paramGround[item.poleGround]);
    }
    if (item?.poleBase !== undefined && item?.poleBase !== null) {
      setSelectedPoleBase(item.poleBase);
    }
    if (item?.poleBody !== undefined && item?.poleBody !== null) {
      setSelectedPoleBody(item.poleBody);
    }
    if (item?.poleArm !== undefined && item?.poleArm !== null) {
      setSelectedPoleArm(item.poleArm);
    }
    if (item?.rustCondition !== undefined && Number(item?.rustCondition) >= 0) {
      setSelectedRustCondition(paramRust[item.rustCondition]);
    }
    if (item) {
      setPhotosPoleId(item.photosPoleId ? item.photosPoleId : null);
      setPhotosPoleLabel(item.photosPoleLabel ? item.photosPoleLabel : null);
      setPhotosEntirePole(item.photosEntirePole ? item.photosEntirePole : null);
      setPhotosOther(item.photosOther ? item.photosOther : null);
      setPhotosPoleBase1(item.photosPoleBase1 ? item.photosPoleBase1 : null);
      setPhotosPoleBase2(item.photosPoleBase2 ? item.photosPoleBase2 : null);
      setPhotosPoleBase3(item.photosPoleBase3 ? item.photosPoleBase3 : null);
      setPhotosPoleBase4(item.photosPoleBase4 ? item.photosPoleBase4 : null);
      setInspectionDate(
        item.inspectionDate ? new Date(item.inspectionDate) : new Date(),
      );
      setMaterialIndex(
        item?.poleMaterial === undefined ? null : item?.poleMaterial,
      );
      setShapeIndex(item?.poleShape === undefined ? null : item?.poleShape);
      setBrandIndex(item?.poleBrand === undefined ? null : item?.poleBrand);
      setPoleYear(item?.poleYear === undefined ? null : item?.poleYear);
      setPoleTypeIndex(item?.poleType === undefined ? null : item?.poleType);
      setPoleSurfaceIndex(
        item?.poleSurface === undefined ? null : item?.poleSurface,
      );
      setPoleGroundIndex(
        item?.poleGround === undefined ? null : item?.poleGround,
      );
      setPoleBase(item?.poleBase === undefined ? null : item?.poleBase);
      setPoleBody(item?.poleBody === undefined ? null : item?.poleBody);
      setPoleArm(item?.poleArm === undefined ? null : item?.poleArm);
      setObservation(item?.observation === undefined ? '' : item?.observation);
      setLossMass1(
        item?.lossMass1 === undefined || item?.lossMass1 === null
          ? ''
          : item?.lossMass1.toString(),
      );
      setLossMass2(
        item?.lossMass2 === undefined || item?.lossMass2 === null
          ? ''
          : item?.lossMass2.toString(),
      );
      setLossMass3(
        item?.lossMass3 === undefined || item?.lossMass3 === null
          ? ''
          : item?.lossMass3.toString(),
      );
      setLossMass4(
        item?.lossMass4 === undefined || item?.lossMass4 === null
          ? ''
          : item?.lossMass4.toString(),
      );
      setMagnetic1(
        item?.magnetic1 === undefined || item?.magnetic1 === null
          ? ''
          : item?.magnetic1.toString(),
      );
      setMagnetic2(
        item?.magnetic2 === undefined || item?.magnetic2 === null
          ? ''
          : item?.magnetic2.toString(),
      );
      setMagnetic3(
        item?.magnetic3 === undefined || item?.magnetic3 === null
          ? ''
          : item?.magnetic3.toString(),
      );
      setMagnetic4(
        item?.magnetic4 === undefined || item?.magnetic4 === null
          ? ''
          : item?.magnetic4.toString(),
      );
      setRustConditionIndex(
        item?.rustCondition === undefined || item?.magnetic4 === null
          ? null
          : item?.rustCondition,
      );
      setObservationLast(item?.observationLast ? item?.observationLast : '');
    } else {
      resetForm();
    }
  }, [
    item,
    paramBrand,
    paramGround,
    paramMaterial,
    paramRust,
    paramShape,
    paramSurface,
    paramType,
  ]);
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            info => {
              setGPSCoordinate(
                `${info.coords.latitude} , ${info.coords.longitude}`,
              );
            },
            error => {
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          console.log('Permission Denied');
        }
      } catch (err) {
        console.log('err', err);
      }
    };
    requestLocationPermission();
  }, []);
  const resetForm = () => {
    setObservation('');
    setLossMass1('');
    setLossMass2('');
    setLossMass3('');
    setLossMass4('');
    setMagnetic1('');
    setMagnetic2('');
    setMagnetic3('');
    setMagnetic4('');
    setObservationLast('');
  };
  const workNumber = workList.find(work =>
    item ? item.wonoid === work._id : '',
  );
  const inspectionDateString = useMemo(
    () => (inspectionDate ? format(inspectionDate, 'yyyy-MM-dd kk:mm:ss') : ''),
    [inspectionDate],
  );
  const poleItem = poleList.find(work =>
    item ? item.poleid === work._id : '',
  );
  const locationItem = useMemo(
    () =>
      locationList.find(location => poleItem?.poleidLocation === location._id),
    [locationList, poleItem?.poleidLocation],
  );
  const onChangeGPSCoordinate = (text: string) => {
    setGPSCoordinate(text);
    setErrorText('');
  };
  const onChangeObservation = (text: string) => {
    setObservation(text);
    setErrorText('');
  };
  const onChangeLossMass1 = (text: string) => {
    setLossMass1(text);
    setErrorText('');
  };
  const onChangeLossMass2 = (text: string) => {
    setLossMass2(text);
    setErrorText('');
  };
  const onChangeLossMass3 = (text: string) => {
    setLossMass3(text);
    setErrorText('');
  };
  const onChangeLossMass4 = (text: string) => {
    setLossMass4(text);
    setErrorText('');
  };
  const onChangeMagnetic1 = (text: string) => {
    setMagnetic1(text);
    setErrorText('');
  };
  const onChangeMagnetic2 = (text: string) => {
    setMagnetic2(text);
    setErrorText('');
  };
  const onChangeMagnetic3 = (text: string) => {
    setMagnetic3(text);
    setErrorText('');
  };
  const onChangeMagnetic4 = (text: string) => {
    setMagnetic4(text);
    setErrorText('');
  };
  const onChangeObservationLast = (text: string) => {
    setObservationLast(text);
    setErrorText('');
  };
  const inspectorItem = userList.find(user =>
    item ? item.inspectorid === user._id : null,
  );
  const inspectorName = useMemo(
    () => inspectorItem?.firstName + ' ' + inspectorItem?.lastName,
    [inspectorItem?.firstName, inspectorItem?.lastName],
  );
  const poleYearList = Array.from({length: 70}, (v, i) => i + 1980).map(year =>
    year.toString(),
  );
  const poleBaseList = ['A', 'B', 'C', 'D', 'E', 'F'];

  const saveInspection = useCallback(
    async (draft: boolean) => {
      if (!item) {
        return;
      }
      if (poleTypeIndex === 1) {
        if (magnetic1) {
          if (isNaN(parseInt(magnetic1, 10))) {
            setErrorText('#1 must be number.');
            return;
          }
          if (parseInt(magnetic1, 10) < 0) {
            setErrorText('#1 must be greater than zero.');
            return;
          }
        }
        if (magnetic2) {
          if (isNaN(parseInt(magnetic2, 10))) {
            setErrorText('#2 must be number.');
            return;
          }
          if (parseInt(magnetic2, 10) < 0) {
            setErrorText('#2 must be greater than zero.');
            return;
          }
        }
        if (magnetic3) {
          if (isNaN(parseInt(magnetic3, 10))) {
            setErrorText('#3 must be number.');
            return;
          }
          if (parseInt(magnetic3, 10) < 0) {
            setErrorText('#3 must be greater than zero.');
            return;
          }
        }
        if (magnetic4) {
          if (isNaN(parseInt(magnetic4, 10))) {
            setErrorText('#4 must be number.');
            return;
          }
          if (parseInt(magnetic4, 10) < 0) {
            setErrorText('#4 must be greater than zero.');
            return;
          }
        }
      } else {
        if (lossMass1) {
          if (isNaN(parseInt(lossMass1, 10))) {
            setErrorText('#1 must be number.');
            return;
          }
          if (parseInt(lossMass1, 10) > 0) {
            setErrorText('#1 must be less than zero.');
            return;
          }
        }
        if (lossMass2) {
          if (isNaN(parseInt(lossMass2, 10))) {
            setErrorText('#2 must be number.');
            return;
          }
          if (parseInt(lossMass2, 10) > 0) {
            setErrorText('#2 must be less than zero.');
            return;
          }
        }
        if (lossMass3) {
          if (isNaN(parseInt(lossMass3, 10))) {
            setErrorText('#3 must be number.');
            return;
          }
          if (parseInt(lossMass3, 10) > 0) {
            setErrorText('#3 must be less than zero.');
            return;
          }
        }
        if (lossMass4) {
          if (isNaN(parseInt(lossMass4, 10))) {
            setErrorText('#4 must be number.');
            return;
          }
          if (parseInt(lossMass4, 10) > 0) {
            setErrorText('#4 must be less than zero.');
            return;
          }
        }
      }
      Keyboard.dismiss();
      setErrorText('');
      setLoading(true);

      try {
        let formData = {
          inspectionDate: inspectionDateString,
          gpsCoordinates: gpsCoordinates,

          poleMaterial: marterialIndex,
          poleShape: shapeIndex,
          poleBrand: brandIndex,
          poleYear: poleYear,

          poleType: poleTypeIndex,
          poleSurface: poleSurfaceIndex,
          poleGround: poleGroundIndex,

          poleBase: poleBase,
          poleBody: poleBody,
          poleArm: poleArm,
          observation: observation,

          rustCondition: rustConditionIndex,
          observationLast: observationLast,

          isSaved: true,
        };

        if (!draft) {
          formData = Object.assign(formData, {
            status: 'validate',
          });
        }

        if (poleTypeIndex === 1) {
          const magneticList = [
            parseInt(magnetic1, 10),
            parseInt(magnetic2, 10),
            parseInt(magnetic3, 10),
            parseInt(magnetic4, 10),
          ];

          const isPositive = magneticList.find(magnetic => magnetic > 0);

          const magneticDefect = isPositive ? 'Crack' : 'No Crack';

          const magnecticData = {
            magnetic1: parseInt(magnetic1, 10),
            magnetic2: parseInt(magnetic2, 10),
            magnetic3: parseInt(magnetic3, 10),
            magnetic4: parseInt(magnetic4, 10),

            magneticDefect,
          };

          formData = Object.assign(formData, magnecticData);
        } else {
          const lossMassList = [
            parseInt(lossMass1, 10),
            parseInt(lossMass2, 10),
            parseInt(lossMass3, 10),
            parseInt(lossMass4, 10),
          ];
          let sum: number = 0;
          lossMassList.map(element => {
            if (!isNaN(element)) {
              sum = sum + element;
            }
          });
          const minValue = sum / 4;
          const realLossMassList = lossMassList.filter(
            lossItem => !isNaN(lossItem),
          );
          const meanValue = sum / realLossMassList.length;
          let weight = 0;

          if (minValue) {
            if (minValue >= criterialInfo.paramOverallBelow) {
              weight = criterialInfo.paramOverallBelowWeight;
            }
            if (
              minValue <= criterialInfo.paramOverallBetween &&
              minValue >= criterialInfo.paramOverallBetween1
            ) {
              weight = criterialInfo.paramOverallBetweenWeight;
            }
            if (minValue <= criterialInfo.paramOverallAbove) {
              weight = criterialInfo.paramOverallAboveWeight;
            }

            const lossMassLSU = meanValue + weight;

            let lossMassClass = 0;

            if (
              lossMassLSU <= criterialInfo.paramCriteriaA1From &&
              lossMassLSU >= criterialInfo.paramCriteriaA1To
            ) {
              lossMassClass = 1;
            }
            if (
              lossMassLSU <= criterialInfo.paramCriteriaA2From &&
              lossMassLSU >= criterialInfo.paramCriteriaA2To
            ) {
              lossMassClass = 2;
            }
            if (
              lossMassLSU <= criterialInfo.paramCriteriaA3From &&
              lossMassLSU >= criterialInfo.paramCriteriaA3To
            ) {
              lossMassClass = 3;
            }
            if (
              lossMassLSU <= criterialInfo.paramCriteriaA4From &&
              lossMassLSU >= criterialInfo.paramCriteriaA4To
            ) {
              lossMassClass = 4;
            }
            if (
              lossMassLSU <= criterialInfo.paramCriteriaA5From &&
              lossMassLSU >= criterialInfo.paramCriteriaA5To
            ) {
              lossMassClass = 5;
            }

            const lossData = {
              lossMass1: parseInt(lossMass1, 10),
              lossMass2: parseInt(lossMass2, 10),
              lossMass3: parseInt(lossMass3, 10),
              lossMass4: parseInt(lossMass4, 10),

              lossMassLSU,
              lossMassClass,
            };

            formData = Object.assign(formData, lossData);
          }
        }

        if (photosPoleId) {
          formData = Object.assign(formData, {
            photosPoleId,
          });
        }
        if (photosPoleLabel) {
          formData = Object.assign(formData, {
            photosPoleLabel,
          });
        }
        if (photosEntirePole) {
          formData = Object.assign(formData, {
            photosEntirePole,
          });
        }
        if (photosOther) {
          formData = Object.assign(formData, {
            photosOther,
          });
        }
        if (photosPoleBase1) {
          formData = Object.assign(formData, {
            photosPoleBase1,
          });
        }
        if (photosPoleBase2) {
          formData = Object.assign(formData, {
            photosPoleBase2,
          });
        }
        if (photosPoleBase3) {
          formData = Object.assign(formData, {
            photosPoleBase3,
          });
        }
        if (photosPoleBase4) {
          formData = Object.assign(formData, {
            photosPoleBase4,
          });
        }

        console.log('updating inspection .....');
        await request(`${defaultURL}/api/inspection/${item._id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        console.log('updating inspection successed.....');
        navigation.goBack();
      } catch (error) {
        console.log('updating inspection failed = ', error);
        setErrorText('updating inspection is failed.');
      } finally {
        setLoading(false);
      }
    },
    [
      item,
      poleTypeIndex,
      magnetic1,
      magnetic2,
      magnetic3,
      magnetic4,
      lossMass1,
      lossMass2,
      lossMass3,
      lossMass4,
      inspectionDateString,
      gpsCoordinates,
      marterialIndex,
      shapeIndex,
      brandIndex,
      poleYear,
      poleSurfaceIndex,
      poleGroundIndex,
      poleBase,
      poleBody,
      poleArm,
      observation,
      rustConditionIndex,
      observationLast,
      photosPoleId,
      photosPoleLabel,
      photosEntirePole,
      photosOther,
      photosPoleBase1,
      photosPoleBase2,
      photosPoleBase3,
      photosPoleBase4,
      defaultURL,
      navigation,
      criterialInfo.paramOverallBelow,
      criterialInfo.paramOverallBetween,
      criterialInfo.paramOverallBetween1,
      criterialInfo.paramOverallAbove,
      criterialInfo.paramCriteriaA1From,
      criterialInfo.paramCriteriaA1To,
      criterialInfo.paramCriteriaA2From,
      criterialInfo.paramCriteriaA2To,
      criterialInfo.paramCriteriaA3From,
      criterialInfo.paramCriteriaA3To,
      criterialInfo.paramCriteriaA4From,
      criterialInfo.paramCriteriaA4To,
      criterialInfo.paramCriteriaA5From,
      criterialInfo.paramCriteriaA5To,
      criterialInfo.paramOverallBelowWeight,
      criterialInfo.paramOverallBetweenWeight,
      criterialInfo.paramOverallAboveWeight,
    ],
  );

  const openImageBottomSheet = (kind: PhotoKind) => {
    setPhotoKind(kind);
  };
  const cancelPhotosPoleId = () => {
    setPhotosPoleId(null);
  };
  const cancelPhotosPoleLabel = () => {
    setPhotosPoleLabel(null);
  };
  const cancelPhotosEntirePole = () => {
    setPhotosEntirePole(null);
  };
  const cancelPhotosOther = () => {
    setPhotosOther(null);
  };
  const cancelPhotosPoleBase1 = () => {
    setPhotosPoleBase1(null);
  };
  const cancelPhotosPoleBase2 = () => {
    setPhotosPoleBase2(null);
  };
  const cancelPhotosPoleBase3 = () => {
    setPhotosPoleBase3(null);
  };
  const cancelPhotosPoleBase4 = () => {
    setPhotosPoleBase4(null);
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

          <TextInput
            style={styles.input}
            value={gpsCoordinates}
            onChangeText={onChangeGPSCoordinate}
            editable={false}
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Inspector Name</Text>
          </View>

          <TextInput
            style={styles.input}
            value={inspectorName}
            onChangeText={onChangeGPSCoordinate}
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
              onValueChange={itemValue => setSelectedPoleMaterial(itemValue)}
              enabled={status !== 'accepted'}>
              {paramMaterial.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleMaterial === element ? 'red' : 'black',
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
              onValueChange={itemValue => setSelectedPoleShape(itemValue)}
              enabled={status !== 'accepted'}>
              {paramShape.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleShape === element ? 'red' : 'black',
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
              onValueChange={itemValue => setSelectedPoleBrand(itemValue)}
              placeholder="dsdfsd"
              enabled={status !== 'accepted'}>
              {paramBrand.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleBrand === element ? 'red' : 'black',
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
              onValueChange={itemValue => setSelectedPoleYear(itemValue)}
              enabled={status !== 'accepted'}>
              {poleYearList.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleYear === element ? 'red' : 'black',
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
              onValueChange={itemValue => setSelectedPoleType(itemValue)}
              enabled={status !== 'accepted'}>
              {paramType.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleType === element ? 'red' : 'black',
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
              onValueChange={itemValue => setSelectedPoleSurface(itemValue)}
              enabled={status !== 'accepted'}>
              {paramSurface.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleSurface === element ? 'red' : 'black',
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
              onValueChange={itemValue => setSelectedPoleGround(itemValue)}
              enabled={status !== 'accepted'}>
              {paramGround.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleGround === element ? 'red' : 'black',
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
              onValueChange={itemValue => setSelectedPoleBase(itemValue)}
              enabled={status !== 'accepted'}>
              {poleBaseList.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleBase === element ? 'red' : 'black',
                  }}
                />
              ))}
            </Picker>
          </View>
          {/* <PopUpMenu2
            title={!poleBase ? 'Select Base' : poleBase}
            optionList={poleBaseList}
            selectedValue={poleBase}
            selectMenuValue={(value: string | number) =>
              setPoleBase(value.toString())
            }
          /> */}
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Body</Text>
          </View>
          <View style={[{height: 54, borderWidth: 1, borderRadius: 5}]}>
            <Picker
              selectedValue={selectedPoleBody}
              onValueChange={itemValue => setSelectedPoleBody(itemValue)}
              enabled={status !== 'accepted'}>
              {poleBaseList.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleBody === element ? 'red' : 'black',
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
              onValueChange={itemValue => setSelectedPoleArm(itemValue)}
              enabled={status !== 'accepted'}>
              {poleBaseList.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedPoleArm === element ? 'red' : 'black',
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
            editable={status !== 'accepted'}
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
              editable={status !== 'accepted'}
            />
          ) : (
            <TextInput
              style={styles.input}
              value={lossMass1}
              onChangeText={onChangeLossMass1}
              keyboardType="numeric"
              editable={status !== 'accepted'}
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
              editable={status !== 'accepted'}
            />
          ) : (
            <TextInput
              style={styles.input}
              value={lossMass2}
              onChangeText={onChangeLossMass2}
              keyboardType="numeric"
              editable={status !== 'accepted'}
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
              editable={status !== 'accepted'}
            />
          ) : (
            <TextInput
              style={styles.input}
              value={lossMass3}
              onChangeText={onChangeLossMass3}
              keyboardType="numeric"
              editable={status !== 'accepted'}
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
              editable={status !== 'accepted'}
            />
          ) : (
            <TextInput
              style={styles.input}
              value={lossMass4}
              onChangeText={onChangeLossMass4}
              keyboardType="numeric"
              editable={status !== 'accepted'}
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
              onValueChange={itemValue => setSelectedRustCondition(itemValue)}
              enabled={status !== 'accepted'}>
              {paramRust.map(element => (
                <Picker.Item
                  key={element}
                  label={element}
                  value={element}
                  style={{
                    color: selectedRustCondition === element ? 'red' : 'black',
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
            editable={status !== 'accepted'}
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
            cancelPhoto={cancelPhotosPoleId}
            pickerImage={() => openImageBottomSheet('id')}
            placeText="Pole ID number confirming right pole tested"
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Label</Text>
          </View>
          <PhotoItem
            photoUri={photosPoleLabel}
            cancelPhoto={cancelPhotosPoleLabel}
            pickerImage={() => openImageBottomSheet('label')}
            placeText="Label of pole manufacturing information"
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Entire Pole</Text>
          </View>
          <PhotoItem
            photoUri={photosEntirePole}
            cancelPhoto={cancelPhotosEntirePole}
            pickerImage={() => openImageBottomSheet('entire')}
            placeText="From pole base to lantern with background"
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Other</Text>
          </View>
          <PhotoItem
            photoUri={photosOther}
            cancelPhoto={cancelPhotosOther}
            pickerImage={() => openImageBottomSheet('other')}
            placeText="Only when require for Pole internal by RVI or anti-rust treatment"
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Base #1</Text>
          </View>
          <PhotoItem
            photoUri={photosPoleBase1}
            cancelPhoto={cancelPhotosPoleBase1}
            pickerImage={() => openImageBottomSheet('base1')}
            placeText="Pole base section of about 300mm from ground line, photo taken horizontally"
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Base #2</Text>
          </View>
          <PhotoItem
            photoUri={photosPoleBase2}
            cancelPhoto={cancelPhotosPoleBase2}
            pickerImage={() => openImageBottomSheet('base2')}
            placeText="Pole base section of about 300mm from ground line, photo taken horizontally"
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Base #3</Text>
          </View>
          <PhotoItem
            photoUri={photosPoleBase3}
            cancelPhoto={cancelPhotosPoleBase3}
            pickerImage={() => openImageBottomSheet('base3')}
            placeText="Pole base section of about 300mm from ground line, photo taken horizontally"
          />
        </View>
        <View style={styles.view}>
          <View style={styles.label}>
            <Text style={{fontSize: 18, color: 'black'}}>Pole Base #4</Text>
          </View>
          <PhotoItem
            photoUri={photosPoleBase4}
            cancelPhoto={cancelPhotosPoleBase4}
            pickerImage={() => openImageBottomSheet('base4')}
            placeText="Pole base section of about 300mm from ground line, photo taken horizontally"
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
          {status !== 'accepted' && (
            <Pressable
              style={{
                backgroundColor: 'red',
                width: '40%',
                paddingVertical: 10,
                borderRadius: 100,
              }}
              disabled={loading}
              onPress={() => saveInspection(false)}>
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
          {status === 'begin' && (
            <Pressable
              style={{
                backgroundColor: 'darkcyan',
                width: '40%',
                paddingVertical: 10,
                borderRadius: 100,
              }}
              disabled={loading}
              onPress={() => saveInspection(true)}>
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
    color: 'lightslategrey',
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
export default EditInspectionScreen;
