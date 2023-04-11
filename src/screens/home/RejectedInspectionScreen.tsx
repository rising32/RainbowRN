import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';
import {IInspection} from '../../recoil/interface';
import RejectedInspectionItem from './components/RejectedInspectionItem';
import useRejectedInspection, {
  AdditionalRejectedType,
} from './hooks/useRejectedInspection';
import useShowInspection from './hooks/useShowInspection';
import {AppDrawerScreenProps, DRAWERSCREENS} from '../../navigation/types';
import {SearchSVG} from '../../components/Icons';
import InspectionSearch from './components/InspectionSearch';
import ScreenLayout from '../../components/ScreenLayout';
import TableHeaderItem from './components/TableHeaderItem';

const RejectedInspectionScreen = ({
  navigation,
}: AppDrawerScreenProps<DRAWERSCREENS.REJECTEDINSPECTION>) => {
  const [showSearch, setShowSearch] = useState(false);
  const [sortDown, setSortDown] = useState(false);
  const [sortText, setSortText] = useState<keyof AdditionalRejectedType | null>(
    null,
  );
  const {filteredRejectedInspectionList, sort, filter} =
    useRejectedInspection();
  const {havingTodayCalibration} = useShowInspection();

  const showSearchDialog = useCallback(() => {
    setShowSearch(!showSearch);
  }, [showSearch]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={{marginRight: 20}} onPress={showSearchDialog}>
          <SearchSVG width={28} height={28} />
        </Pressable>
      ),
    });
  }, [navigation, showSearchDialog]);
  const headerTitle = useCallback(
    (title: keyof AdditionalRejectedType) => {
      setSortText(title);
      title === sortText ? setSortDown(!sortDown) : setSortDown(false);
      sort(title);
    },
    [sortText, sort, sortDown],
  );

  const renderItem = useCallback(
    ({
      item,
      index,
    }: ListRenderItemInfo<IInspection & AdditionalRejectedType>) => (
      <RejectedInspectionItem
        item={item}
        index={index}
        havingTodayCalibration={havingTodayCalibration}
      />
    ),
    [havingTodayCalibration],
  );
  const ListHeaderComponent = useCallback(
    () => (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: 'gainsboro',
          paddingVertical: 10,
        }}>
        <View
          style={{width: 50, alignItems: 'center', justifyContent: 'center'}}
        />
        <View
          style={{width: 50, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
            No
          </Text>
        </View>
        <TableHeaderItem
          title="WO Number"
          width={160}
          onPress={() => headerTitle('workNumberText')}
          iconActive={sortText === 'workNumberText'}
        />
        <TableHeaderItem
          title="Zone"
          width={160}
          onPress={() => headerTitle('zoneText')}
          iconActive={sortText === 'zoneText'}
        />
        <TableHeaderItem
          title="Location"
          width={550}
          onPress={() => headerTitle('locationText')}
          iconActive={sortText === 'locationText'}
          textAlign="left"
        />
        <TableHeaderItem
          title="Pole ID"
          width={160}
          onPress={() => headerTitle('poleIdText')}
          iconActive={sortText === 'poleIdText'}
        />
        <TableHeaderItem
          title="Test Date"
          width={200}
          onPress={() => headerTitle('testDateText')}
          iconActive={sortText === 'testDateText'}
        />
        <TableHeaderItem
          title="Reject Reason"
          width={200}
          onPress={() => headerTitle('rejectReasonText')}
          iconActive={sortText === 'rejectReasonText'}
        />
      </View>
    ),
    [headerTitle, sortText],
  );
  const keyExtractor = useCallback(
    (item: IInspection, index: number) => `cloth-${item._id}-${index}`,
    [],
  );
  const ListEmptyComponent = (
    <View style={{paddingLeft: 50, marginTop: 30}}>
      <Text>No data found</Text>
    </View>
  );
  return (
    <ScreenLayout>
      <InspectionSearch
        showSearch={showSearch}
        onHide={() => setShowSearch(false)}
        onSearchQuery={filter}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          data={filteredRejectedInspectionList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent}
          ListEmptyComponent={ListEmptyComponent}
        />
      </ScrollView>
    </ScreenLayout>
  );
};

export default RejectedInspectionScreen;
