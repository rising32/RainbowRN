import React from 'react';
import {View, Pressable} from 'react-native';
import {IInspection} from '../../../recoil/interface';
import {useNavigation} from '@react-navigation/native';
import {
  AUTHENTICATEDSCREENS,
  AppDrawerScreenProps,
  DRAWERSCREENS,
} from '../../../navigation/types';
import {AdditionalAcceptedType} from '../hooks/useAcceptedInspection';
import TableBodyItem from './TableBodyItem';
import {PageEditSVG} from '../../../components/Icons';

type Props = {
  item: IInspection & AdditionalAcceptedType;
  index: number;
};
const AcceptedInspectionItem = ({item, index}: Props) => {
  const navigation =
    useNavigation<
      AppDrawerScreenProps<DRAWERSCREENS.BEGININSPECTION>['navigation']
    >();
  const onSelectItem = () => {
    navigation.navigate(AUTHENTICATEDSCREENS.EDITINSPECTION, {
      item,
      type: 'accepted',
      title: 'Accepted Inspection',
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
      <TableBodyItem title={(index + 1).toString()} width={50} />
      <TableBodyItem title={item.workNumberText} width={160} />
      <TableBodyItem title={item.zoneText} width={160} />
      <TableBodyItem title={item.locationText} width={550} textAlign="left" />
      <TableBodyItem title={item.poleIdText} width={160} />
      <TableBodyItem title={item.testDateText} width={200} />
      <TableBodyItem title={item.viText} width={100} />
      <TableBodyItem title={item.rlmText} width={100} />
      <TableBodyItem title={item.mptText} width={100} />
    </View>
  );
};

export default React.memo(AcceptedInspectionItem);
