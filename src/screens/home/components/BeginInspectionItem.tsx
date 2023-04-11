import React from 'react';
import {View, Alert, Pressable} from 'react-native';
import {IInspection} from '../../../recoil/interface';
import {useNavigation} from '@react-navigation/native';
import {
  AUTHENTICATEDSCREENS,
  AppDrawerScreenProps,
  DRAWERSCREENS,
} from '../../../navigation/types';
import {AdditionalBeginType} from '../hooks/useBeginInspection';
import {PageEditSVG} from '../../../components/Icons';
import TableBodyItem from './TableBodyItem';

type Props = {
  item: IInspection & AdditionalBeginType;
  index: number;
  havingTodayCalibration?: boolean;
};
const BeginInspectionItem = ({
  item,
  index,
  havingTodayCalibration = false,
}: Props) => {
  const navigation =
    useNavigation<
      AppDrawerScreenProps<DRAWERSCREENS.BEGININSPECTION>['navigation']
    >();
  const onSelectItem = () => {
    if (!havingTodayCalibration) {
      Alert.alert('There is not any calibration today');
    } else {
      navigation.navigate(AUTHENTICATEDSCREENS.EDITINSPECTION, {
        item,
        status: 'begin',
        title: 'Begin Inspection',
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
      <TableBodyItem title={item.locationText} width={550} textAlign="left" />
      <TableBodyItem title={item.poleIdText} width={160} />
      <TableBodyItem title={item.inspectorText} width={200} />
    </View>
  );
};

export default React.memo(BeginInspectionItem);
