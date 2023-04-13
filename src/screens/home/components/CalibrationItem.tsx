import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {ICalibration} from '../../../recoil/interface';
import {useRecoilValue} from 'recoil';
import {instrumentState, userListState} from '../../../recoil/atoms';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {
  AUTHENTICATEDSCREENS,
  AppDrawerScreenProps,
  DRAWERSCREENS,
} from '../../../navigation/types';
import {PageEditSVG} from '../../../components/Icons';

type Props = {
  item: ICalibration;
  index: number;
};
const CalibrationItem = ({item, index}: Props) => {
  const {instrumentRLM, instrumentMPT} = useRecoilValue(instrumentState);
  const userList = useRecoilValue(userListState);

  const inspectorItem = userList.find(user => item.caliInspector === user._id);
  const result = React.useMemo(() => {
    switch (item.caliStatus) {
      case 0:
        return '';
      case 1:
        return 'Pass';
      case 2:
        return 'Fail';
      default:
        console.log('Sorry, we are out of photo.');
    }
  }, [item.caliStatus]);

  const instrument = React.useMemo(() => {
    if (
      instrumentRLM.length > 0 &&
      instrumentMPT.length > 0 &&
      item.caliInstrumentSN < instrumentMPT.length &&
      item.caliInstrumentSN < instrumentRLM.length
    ) {
      if (item.caliInstrumentSNType === 'RLM') {
        return instrumentRLM[item.caliInstrumentSN].instrumentName;
      }
      if (item.caliInstrumentSNType === 'MPT') {
        return instrumentMPT[item.caliInstrumentSN].instrumentName;
      }
    }
  }, [
    item.caliInstrumentSNType,
    item.caliInstrumentSN,
    instrumentRLM,
    instrumentMPT,
  ]);

  const navigation =
    useNavigation<
      AppDrawerScreenProps<DRAWERSCREENS.CALIBRATION>['navigation']
    >();
  const onSelectItem = () => {
    navigation.navigate(AUTHENTICATEDSCREENS.EDITCALIBRATION, {
      item,
      title: 'Edit Calibration',
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gainsboro',
        paddingVertical: 10,
      }}>
      <View style={{width: 50, alignItems: 'center', justifyContent: 'center'}}>
        <Pressable onPress={onSelectItem}>
          <PageEditSVG width={24} height={24} />
        </Pressable>
      </View>
      <View style={{width: 50, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 14}}>{index + 1}</Text>
      </View>
      <View
        style={{width: 200, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 14}}>
          {format(new Date(item.caliDate), 'yyyy-MM-dd kk:mm:ss')}
        </Text>
      </View>
      <View
        style={{width: 100, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 14}}>{instrument}</Text>
      </View>
      <View
        style={{width: 100, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 14}}>
          {item.caliRLMReading}
        </Text>
      </View>
      <View
        style={{width: 100, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 14}}>
          {item.caliMPTForce}
        </Text>
      </View>
      <View
        style={{width: 150, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 14}}>
          {inspectorItem
            ? inspectorItem?.firstName + ' ' + inspectorItem?.lastName
            : ''}
        </Text>
      </View>
      <View
        style={{width: 100, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 14, color: 'dodgerblue'}}>
          {result}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(CalibrationItem);
