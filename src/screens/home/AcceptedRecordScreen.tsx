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
import AcceptedInspectionItem from './components/AcceptedInspectionItem';
import useAcceptedInspection, {
  AdditionalAcceptedType,
} from './hooks/useAcceptedInspection';
import {AppDrawerScreenProps, DRAWERSCREENS} from '../../navigation/types';
import {SearchSVG} from '../../components/Icons';
import InspectionSearch from './components/InspectionSearch';
import ScreenLayout from '../../components/ScreenLayout';
import TableHeaderItem from './components/TableHeaderItem';

const AcceptedRecordScreen = ({
  navigation,
}: AppDrawerScreenProps<DRAWERSCREENS.ACCEPTEDINSPECTION>) => {
  const [showSearch, setShowSearch] = useState(false);
  const [sortDown, setSortDown] = useState(false);
  const [sortText, setSortText] = useState<keyof AdditionalAcceptedType | null>(
    null,
  );
  const {filteredAcceptedInspectionList, sort, filter} =
    useAcceptedInspection();

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

  const renderItem = useCallback(
    ({
      item,
      index,
    }: ListRenderItemInfo<IInspection & AdditionalAcceptedType>) => (
      <AcceptedInspectionItem item={item} index={index} />
    ),
    [],
  );

  const headerTitle = useCallback(
    (title: keyof AdditionalAcceptedType) => {
      setSortText(title);
      title === sortText ? setSortDown(!sortDown) : setSortDown(false);
      sort(title);
    },
    [sortText, sort, sortDown],
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
          style={{width: 100, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
            Select
          </Text>
        </View>
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
          title="VI"
          width={100}
          onPress={() => headerTitle('viText')}
          iconActive={sortText === 'viText'}
        />
        <TableHeaderItem
          title="RLM"
          width={100}
          onPress={() => headerTitle('rlmText')}
          iconActive={sortText === 'rlmText'}
        />
        <TableHeaderItem
          title="MPT"
          width={100}
          onPress={() => headerTitle('mptText')}
          iconActive={sortText === 'mptText'}
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
          data={filteredAcceptedInspectionList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent}
          ListEmptyComponent={ListEmptyComponent}
        />
      </ScrollView>
    </ScreenLayout>
  );
};

export default AcceptedRecordScreen;
