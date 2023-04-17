import {useNavigation, useRoute} from '@react-navigation/native';
import {
  AUTHENTICATEDSCREENS,
  AuthenticatedStackScreenProps,
} from '../../../navigation/types';
import React from 'react';
import {Alert, Keyboard, PermissionsAndroid} from 'react-native';
import {useRecoilValue} from 'recoil';
import {
  criterialInfoState,
  locationListState,
  poleListState,
  settingState,
  userListState,
  userState,
  workListState,
} from '../../../recoil/atoms';
import Geolocation from '@react-native-community/geolocation';
import {format} from 'date-fns';
import {request} from '../../../utils';
import {AppContext} from '../../../libs/contexts/AppProvider';
import {Asset} from 'react-native-image-picker';

type PhotoKind =
  | 'id'
  | 'label'
  | 'entire'
  | 'other'
  | 'base1'
  | 'base2'
  | 'base3'
  | 'base4';

const requestLocationPermission = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
  if (permission == null) {
    return false;
  }
  let hasPermission = await PermissionsAndroid.check(permission);
  if (!hasPermission) {
    const permissionRequestResult = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message: 'This App needs to Access your location',
        buttonPositive: 'OK',
      },
    );
    hasPermission = permissionRequestResult === 'granted';
  }
  return hasPermission;
};

export default function useInspectionItem() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [gpsCoordinates, setGPSCoordinate] = React.useState('');
  const [selectedPoleMaterial, setSelectedPoleMaterial] = React.useState<
    string | null
  >(null);
  const [selectedPoleShape, setSelectedPoleShape] = React.useState<
    string | null
  >(null);
  const [selectedPoleBrand, setSelectedPoleBrand] = React.useState<
    string | null
  >(null);
  const [selectedPoleYear, setSelectedPoleYear] = React.useState<string | null>(
    null,
  );
  const [poleTypeIndex, setPoleTypeIndex] = React.useState(0);
  const [selectedPoleType, setSelectedPoleType] = React.useState<string | null>(
    null,
  );
  const [selectedPoleSurface, setSelectedPoleSurface] = React.useState<
    string | null
  >(null);
  const [selectedPoleGround, setSelectedPoleGround] = React.useState<
    string | null
  >(null);
  const [selectedPoleBase, setSelectedPoleBase] = React.useState<string | null>(
    null,
  );
  const [selectedPoleBody, setSelectedPoleBody] = React.useState<string | null>(
    null,
  );
  const [selectedPoleArm, setSelectedPoleArm] = React.useState<string | null>(
    null,
  );
  const [observation, setObservation] = React.useState('');
  const [selectedRustCondition, setSelectedRustCondition] = React.useState<
    string | null
  >(null);
  const [lossMass1, setLossMass1] = React.useState('');
  const [lossMass2, setLossMass2] = React.useState('');
  const [lossMass3, setLossMass3] = React.useState('');
  const [lossMass4, setLossMass4] = React.useState('');
  const [magnetic1, setMagnetic1] = React.useState('');
  const [magnetic2, setMagnetic2] = React.useState('');
  const [magnetic3, setMagnetic3] = React.useState('');
  const [magnetic4, setMagnetic4] = React.useState('');
  const [observationLast, setObservationLast] = React.useState('');
  const [photosPoleId, setPhotosPoleId] = React.useState('');
  const [photosPoleLabel, setPhotosPoleLabel] = React.useState('');
  const [photosEntirePole, setPhotosEntirePole] = React.useState('');
  const [photosOther, setPhotosOther] = React.useState('');
  const [photosPoleBase1, setPhotosPoleBase1] = React.useState('');
  const [photosPoleBase2, setPhotosPoleBase2] = React.useState('');
  const [photosPoleBase3, setPhotosPoleBase3] = React.useState('');
  const [photosPoleBase4, setPhotosPoleBase4] = React.useState('');

  const navigation =
    useNavigation<
      AuthenticatedStackScreenProps<AUTHENTICATEDSCREENS.EDITINSPECTION>['navigation']
    >();
  const route =
    useRoute<
      AuthenticatedStackScreenProps<AUTHENTICATEDSCREENS.EDITINSPECTION>['route']
    >();

  const workList = useRecoilValue(workListState);
  const poleList = useRecoilValue(poleListState);
  const locationList = useRecoilValue(locationListState);
  const userList = useRecoilValue(userListState);
  const {
    paramMaterial,
    paramShape,
    paramBrand,
    paramType,
    paramSurface,
    paramGround,
    paramRust,
  } = useRecoilValue(settingState);
  const user = useRecoilValue(userState);
  const criterialInfo = useRecoilValue(criterialInfoState);
  const {defaultURL} = React.useContext(AppContext);

  const inspection = React.useMemo(
    () => route.params.item,
    [route.params.item],
  );
  const poleYearList = Array.from({length: 70}, (v, i) => i + 1980).map(year =>
    year.toString(),
  );
  const poleParamList = ['A', 'B', 'C', 'D', 'E', 'F'];
  const inspectionType = React.useMemo(
    () => route.params.type,
    [route.params.type],
  );
  const workNumber = workList.find(work => inspection.wonoid === work._id);
  const inspectionDateString = React.useMemo(
    () =>
      format(
        inspection.inspectionDate
          ? new Date(inspection.inspectionDate)
          : new Date(),
        'yyyy-MM-dd kk:mm:ss',
      ),
    [inspection],
  );
  const poleItem = poleList.find(pole => inspection.poleid === pole._id);
  const locationItem = React.useMemo(
    () =>
      locationList.find(location => poleItem?.poleidLocation === location._id),
    [locationList, poleItem?.poleidLocation],
  );
  React.useEffect(() => {
    if (inspection) {
      if (inspection?.gpsCoordinates) {
        setGPSCoordinate(inspection.gpsCoordinates);
      } else {
        getGPSCordinate();
      }
    }
  }, [inspection, inspection.gpsCoordinates]);
  const getGPSCordinate = async () => {
    if (!(await requestLocationPermission())) {
      Alert.alert(
        'Permission denied!',
        'This app does not have permission to get your location.',
      );
      return;
    }
    Geolocation.getCurrentPosition(
      info => {
        setGPSCoordinate(
          `${Number.parseFloat(info.coords.latitude.toString()).toFixed(
            10,
          )}, ${Number.parseFloat(info.coords.longitude.toString()).toFixed(
            10,
          )}`,
        );
      },
      err => {
        console.log(err.code, err.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const onChangeGPSCoordinate = (text: string) => {
    setGPSCoordinate(text);
  };
  const inspectorItem = userList.find(
    element => inspection.inspectorid === element._id,
  );
  const inspectorName = React.useMemo(
    () => inspectorItem?.firstName + ' ' + inspectorItem?.lastName,
    [inspectorItem?.firstName, inspectorItem?.lastName],
  );
  React.useEffect(() => {
    if (
      inspection?.poleMaterial !== undefined &&
      Number(inspection?.poleMaterial) <= paramMaterial.length
    ) {
      setSelectedPoleMaterial(paramMaterial[inspection.poleMaterial]);
    }
  }, [inspection?.poleMaterial, paramMaterial]);
  const changePoleMaterial = (value: string | null) => {
    setSelectedPoleMaterial(value);
    setError('');
  };
  React.useEffect(() => {
    if (
      inspection?.poleShape !== undefined &&
      Number(inspection?.poleShape) <= paramShape.length
    ) {
      setSelectedPoleShape(paramShape[inspection.poleShape]);
    }
  }, [inspection?.poleShape, paramShape]);
  const changePoleShape = (value: string | null) => {
    setSelectedPoleShape(value);
    setError('');
  };
  React.useEffect(() => {
    if (
      inspection?.poleBrand !== undefined &&
      Number(inspection?.poleBrand) <= paramBrand.length
    ) {
      setSelectedPoleBrand(paramBrand[inspection.poleBrand]);
    }
  }, [inspection?.poleBrand, paramBrand]);
  const changePoleBrand = (value: string | null) => {
    setSelectedPoleBrand(value);
    setError('');
  };
  React.useEffect(() => {
    if (inspection?.poleYear && Number(inspection?.poleYear) > 0) {
      setSelectedPoleYear(inspection.poleYear);
    }
  }, [inspection?.poleYear]);
  const changePoleYear = (value: string | null) => {
    setSelectedPoleYear(value);
    setError('');
  };
  React.useEffect(() => {
    if (
      inspection?.poleType !== undefined &&
      Number(inspection?.poleType) <= paramType.length
    ) {
      setPoleTypeIndex(inspection.poleType);
      setSelectedPoleType(paramType[inspection.poleType]);
    }
  }, [inspection?.poleType, paramType]);
  const changePoleType = (value: string | null) => {
    setSelectedPoleType(value);
    setError('');
  };
  React.useEffect(() => {
    if (
      inspection?.poleSurface !== undefined &&
      Number(inspection?.poleSurface) <= paramSurface.length
    ) {
      setSelectedPoleSurface(paramSurface[inspection.poleSurface]);
    }
  }, [inspection?.poleSurface, paramSurface]);
  const changePoleSurface = (value: string | null) => {
    setSelectedPoleSurface(value);
    setError('');
  };
  React.useEffect(() => {
    if (
      inspection?.poleGround !== undefined &&
      Number(inspection?.poleGround) <= paramGround.length
    ) {
      setSelectedPoleGround(paramGround[inspection.poleGround]);
    }
  }, [inspection?.poleGround, paramGround]);
  const changePoleGround = (value: string | null) => {
    setSelectedPoleGround(value);
    setError('');
  };
  React.useEffect(() => {
    if (inspection?.poleBase) {
      setSelectedPoleBase(inspection.poleBase);
    }
  }, [inspection?.poleBase]);
  const changePoleBase = (value: string | null) => {
    setSelectedPoleBase(value);
    setError('');
  };
  React.useEffect(() => {
    if (inspection?.poleBody) {
      setSelectedPoleBody(inspection.poleBody);
    }
  }, [inspection?.poleBody]);
  const changePoleBody = (value: string | null) => {
    setSelectedPoleBody(value);
    setError('');
  };
  React.useEffect(() => {
    if (inspection?.poleArm) {
      setSelectedPoleArm(inspection.poleArm);
    }
  }, [inspection?.poleArm]);
  const changePoleArm = (value: string | null) => {
    setSelectedPoleArm(value);
    setError('');
  };
  React.useEffect(() => {
    if (inspection?.observation) {
      setObservation(inspection.observation);
    }
  }, [inspection?.observation]);
  const onChangeObservation = (text: string) => {
    setObservation(text);
    setError('');
  };
  React.useEffect(() => {
    if (
      inspection?.rustCondition !== undefined &&
      Number(inspection?.rustCondition) <= paramRust.length
    ) {
      setSelectedRustCondition(paramRust[inspection.rustCondition]);
    }
  }, [inspection?.rustCondition, paramRust]);
  const changeRustCondition = (value: string | null) => {
    setSelectedRustCondition(value);
    setError('');
  };
  React.useEffect(() => {
    if (inspection?.lossMass1) {
      setLossMass1(inspection.lossMass1.toString());
    }
  }, [inspection?.lossMass1]);
  const onChangeLossMass1 = (text: string) => {
    setLossMass1(text);
    setError('');
  };
  React.useEffect(() => {
    if (inspection?.lossMass2) {
      setLossMass2(inspection.lossMass2.toString());
    }
  }, [inspection?.lossMass2]);
  const onChangeLossMass2 = (text: string) => {
    setLossMass2(text);
    setError('');
  };
  React.useEffect(() => {
    if (inspection?.lossMass3) {
      setLossMass3(inspection.lossMass3.toString());
    }
  }, [inspection?.lossMass3]);
  const onChangeLossMass3 = (text: string) => {
    setLossMass3(text);
    setError('');
  };
  React.useEffect(() => {
    if (inspection?.lossMass4) {
      setLossMass4(inspection.lossMass4.toString());
    }
  }, [inspection?.lossMass4]);
  const onChangeLossMass4 = (text: string) => {
    setLossMass4(text);
    setError('');
  };
  React.useEffect(() => {
    if (inspection?.magnetic1) {
      setMagnetic1(inspection.magnetic1.toString());
    }
  }, [inspection?.magnetic1]);
  const onChangeMagnetic1 = (text: string) => {
    setMagnetic1(text);
    setError('');
  };
  React.useEffect(() => {
    if (inspection?.magnetic2) {
      setMagnetic2(inspection.magnetic2.toString());
    }
  }, [inspection?.magnetic2]);
  const onChangeMagnetic2 = (text: string) => {
    setMagnetic2(text);
    setError('');
  };
  React.useEffect(() => {
    if (inspection?.magnetic3) {
      setMagnetic3(inspection.magnetic3.toString());
    }
  }, [inspection?.magnetic3]);
  const onChangeMagnetic3 = (text: string) => {
    setMagnetic3(text);
    setError('');
  };
  React.useEffect(() => {
    if (inspection?.magnetic4) {
      setMagnetic4(inspection.magnetic4.toString());
    }
  }, [inspection?.magnetic4]);
  const onChangeMagnetic4 = (text: string) => {
    setMagnetic4(text);
    setError('');
  };
  React.useEffect(() => {
    if (inspection?.observationLast) {
      setObservationLast(inspection.observationLast);
    }
  }, [inspection?.observationLast]);
  const onChangeObservationLast = (value: string | null) => {
    setObservationLast(value || '');
    setError('');
  };
  const cancelPhoto = (kind: PhotoKind) => {
    switch (kind) {
      case 'id':
        setPhotosPoleId('');
        break;
      case 'label':
        setPhotosPoleLabel('');
        break;
      case 'entire':
        setPhotosEntirePole('');
        break;
      case 'other':
        setPhotosOther('');
        break;
      case 'base1':
        setPhotosPoleBase1('');
        break;
      case 'base2':
        setPhotosPoleBase2('');
        break;
      case 'base3':
        setPhotosPoleBase3('');
        break;
      case 'base4':
        setPhotosPoleBase4('');
        break;
      default:
        console.log('Sorry, we are out of photo.');
    }
  };
  React.useEffect(() => {
    if (inspection?.photosPoleId) {
      setPhotosPoleId(inspection.photosPoleId);
    }
  }, [inspection?.photosPoleId]);
  React.useEffect(() => {
    if (inspection?.photosPoleLabel) {
      setPhotosPoleLabel(inspection.photosPoleLabel);
    }
  }, [inspection?.photosPoleLabel]);
  React.useEffect(() => {
    if (inspection?.photosEntirePole) {
      setPhotosEntirePole(inspection.photosEntirePole);
    }
  }, [inspection?.photosEntirePole]);
  React.useEffect(() => {
    if (inspection?.photosOther) {
      setPhotosOther(inspection.photosOther);
    }
  }, [inspection?.photosOther]);
  React.useEffect(() => {
    if (inspection?.photosPoleBase1) {
      setPhotosPoleBase1(inspection.photosPoleBase1);
    }
  }, [inspection?.photosPoleBase1]);
  React.useEffect(() => {
    if (inspection?.photosPoleBase2) {
      setPhotosPoleBase2(inspection.photosPoleBase2);
    }
  }, [inspection?.photosPoleBase2]);
  React.useEffect(() => {
    if (inspection?.photosPoleBase3) {
      setPhotosPoleBase3(inspection.photosPoleBase3);
    }
  }, [inspection?.photosPoleBase3]);
  React.useEffect(() => {
    if (inspection?.photosPoleBase4) {
      setPhotosPoleBase4(inspection.photosPoleBase4);
    }
  }, [inspection?.photosPoleBase4]);

  const onSave = async (draft: boolean) => {
    if (poleTypeIndex === 1) {
      if (magnetic1) {
        if (isNaN(parseInt(magnetic1, 10))) {
          setError('#1 must be number.');
          return;
        }
        if (parseInt(magnetic1, 10) < 0) {
          setError('#1 must be greater than zero.');
          return;
        }
      }
      if (magnetic2) {
        if (isNaN(parseInt(magnetic2, 10))) {
          setError('#2 must be number.');
          return;
        }
        if (parseInt(magnetic2, 10) < 0) {
          setError('#2 must be greater than zero.');
          return;
        }
      }
      if (magnetic3) {
        if (isNaN(parseInt(magnetic3, 10))) {
          setError('#3 must be number.');
          return;
        }
        if (parseInt(magnetic3, 10) < 0) {
          setError('#3 must be greater than zero.');
          return;
        }
      }
      if (magnetic4) {
        if (isNaN(parseInt(magnetic4, 10))) {
          setError('#4 must be number.');
          return;
        }
        if (parseInt(magnetic4, 10) < 0) {
          setError('#4 must be greater than zero.');
          return;
        }
      }
    } else {
      if (lossMass1) {
        if (isNaN(parseInt(lossMass1, 10))) {
          setError('#1 must be number.');
          return;
        }
        if (parseInt(lossMass1, 10) > 0) {
          setError('#1 must be less than zero.');
          return;
        }
      }
      if (lossMass2) {
        if (isNaN(parseInt(lossMass2, 10))) {
          setError('#2 must be number.');
          return;
        }
        if (parseInt(lossMass2, 10) > 0) {
          setError('#2 must be less than zero.');
          return;
        }
      }
      if (lossMass3) {
        if (isNaN(parseInt(lossMass3, 10))) {
          setError('#3 must be number.');
          return;
        }
        if (parseInt(lossMass3, 10) > 0) {
          setError('#3 must be less than zero.');
          return;
        }
      }
      if (lossMass4) {
        if (isNaN(parseInt(lossMass4, 10))) {
          setError('#4 must be number.');
          return;
        }
        if (parseInt(lossMass4, 10) > 0) {
          setError('#4 must be less than zero.');
          return;
        }
      }
    }
    const id = user?._id || user?.userId;
    if (!id) {
      return;
    }

    try {
      Keyboard.dismiss();
      setError('');
      setLoading(true);

      let params = {
        userId: id,
        inspectionDate: inspectionDateString,
        gpsCoordinates,
        observation,
        observationLast,

        isSaved: true,
      };
      if (selectedPoleMaterial) {
        const poleMaterial = paramMaterial.findIndex(
          element => element === selectedPoleMaterial,
        );
        params = Object.assign(params, {poleMaterial});
      }
      if (selectedPoleShape) {
        const poleShape = paramShape.findIndex(
          element => element === selectedPoleShape,
        );
        params = Object.assign(params, {poleShape});
      }
      if (selectedPoleBrand) {
        const poleBrand = paramBrand.findIndex(
          element => element === selectedPoleBrand,
        );
        params = Object.assign(params, {poleBrand});
      }
      if (selectedPoleType) {
        const poleType = paramType.findIndex(
          element => element === selectedPoleType,
        );
        params = Object.assign(params, {poleType});
      }
      if (selectedPoleSurface) {
        const poleSurface = paramSurface.findIndex(
          element => element === selectedPoleSurface,
        );
        params = Object.assign(params, {poleSurface});
      }
      if (selectedPoleGround) {
        const poleGround = paramGround.findIndex(
          element => element === selectedPoleGround,
        );
        params = Object.assign(params, {poleGround});
      }
      if (selectedRustCondition) {
        const rustCondition = paramRust.findIndex(
          element => element === selectedRustCondition,
        );
        params = Object.assign(params, {rustCondition});
      }
      if (selectedPoleYear) {
        params = Object.assign(params, {poleYear: selectedPoleYear});
      }
      if (selectedPoleBase) {
        params = Object.assign(params, {poleBase: selectedPoleBase});
      }
      if (selectedPoleBody) {
        params = Object.assign(params, {poleBody: selectedPoleBody});
      }
      if (selectedPoleArm) {
        params = Object.assign(params, {poleArm: selectedPoleArm});
      }

      if (!draft) {
        params = Object.assign(params, {status: 'validate'});
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

        params = Object.assign(params, magnecticData);
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

          params = Object.assign(params, lossData);
        }
      }
      if (photosPoleId) {
        params = Object.assign(params, {
          photosPoleId,
        });
      }
      if (photosPoleLabel) {
        params = Object.assign(params, {
          photosPoleLabel,
        });
      }
      if (photosEntirePole) {
        params = Object.assign(params, {
          photosEntirePole,
        });
      }
      if (photosOther) {
        params = Object.assign(params, {
          photosOther,
        });
      }
      if (photosPoleBase1) {
        params = Object.assign(params, {
          photosPoleBase1,
        });
      }
      if (photosPoleBase2) {
        params = Object.assign(params, {
          photosPoleBase2,
        });
      }
      if (photosPoleBase3) {
        params = Object.assign(params, {
          photosPoleBase3,
        });
      }
      if (photosPoleBase4) {
        params = Object.assign(params, {
          photosPoleBase4,
        });
      }

      if (inspectionType === 'begin') {
        params = Object.assign(params, {
          dashboard: 'Begin Inspection',
        });
      } else if (inspectionType === 'accepted') {
        params = Object.assign(params, {
          dashboard: 'Accepted Inspection',
        });
      } else if (inspectionType === 'rejected') {
        params = Object.assign(params, {
          dashboard: 'Rejected Inspection',
        });
      }

      console.log(params);
      await request(`${defaultURL}/api/inspection/${inspection._id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
    } catch (err) {
      console.log(`${defaultURL}/api/inspection/${inspection._id} failed`, err);
      setError('inpection save error');
    } finally {
      setLoading(false);
      navigation.goBack();
    }
  };
  const pickerImage = async (image: Asset, kind: PhotoKind) => {
    try {
      const form = new FormData();
      form.append('file', {
        uri: `file://${image.uri}`,
        name: 'inspection',
        type: image.type,
      });
      form.append('name', 'nuxt-rlm-bucket/inspection-image');
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
      switch (kind) {
        case 'id':
          setPhotosPoleId(data.file);
          break;
        case 'label':
          setPhotosPoleLabel(data.file);
          break;
        case 'entire':
          setPhotosEntirePole(data.file);
          break;
        case 'other':
          setPhotosOther(data.file);
          break;
        case 'base1':
          setPhotosPoleBase1(data.file);
          break;
        case 'base2':
          setPhotosPoleBase2(data.file);
          break;
        case 'base3':
          setPhotosPoleBase3(data.file);
          break;
        case 'base4':
          setPhotosPoleBase4(data.file);
          break;
        default:
          console.log('Sorry, we are out of photo.');
      }
    } catch (err) {
      console.log(`${defaultURL}/api/inscalibration failed`, err);
      setError('image upload failed');
    }
  };

  return {
    loading,
    error,
    inspection,
    poleYearList,
    poleParamList,
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
  };
}
