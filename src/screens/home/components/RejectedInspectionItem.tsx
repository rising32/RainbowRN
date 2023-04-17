import React from 'react';
import {View, Alert, Pressable} from 'react-native';
import {IInspection} from '../../../recoil/interface';
import {useNavigation} from '@react-navigation/native';
import {
  AUTHENTICATEDSCREENS,
  AppDrawerScreenProps,
  DRAWERSCREENS,
} from '../../../navigation/types';
import {AdditionalRejectedType} from '../hooks/useRejectedInspection';
import TableBodyItem from './TableBodyItem';
import {PageEditSVG} from '../../../components/Icons';

type Props = {
  item: IInspection & AdditionalRejectedType;
  index: number;
  havingTodayCalibration?: boolean;
};
const RejectedInspectionItem = ({
  item,
  index,
  havingTodayCalibration = false,
}: Props) => {
  const navigation =
    useNavigation<
      AppDrawerScreenProps<DRAWERSCREENS.REJECTEDINSPECTION>['navigation']
    >();
  const onSelectItem = () => {
    if (!havingTodayCalibration) {
      Alert.alert('There is not any calibration today');
    } else {
      navigation.navigate(AUTHENTICATEDSCREENS.EDITINSPECTION, {
        item,
        type: 'rejected',
        title: 'Rejected Inspection',
      });
    }
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
      <TableBodyItem title={(index + 1).toString()} width={50} />
      <TableBodyItem title={item.workNumberText} width={160} />
      <TableBodyItem title={item.zoneText} width={160} />
      <Pressable onPress={onSelectItem}>
        <TableBodyItem title={item.locationText} width={550} textAlign="left" />
      </Pressable>
      <Pressable onPress={onSelectItem}>
        <TableBodyItem title={item.poleIdText} width={160} />
      </Pressable>
      <TableBodyItem title={item.testDateText} width={200} />
      <TableBodyItem title={item.rejectReasonText} width={200} />
    </View>
  );
};

export default React.memo(RejectedInspectionItem);
