import React, {useCallback} from 'react';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  ListRenderItemInfo,
} from 'react-native';
import {ICalibration} from '../../recoil/interface';
import CalibrationItem from './components/CalibrationItem';
import useCalibration from './hooks/useCalibration';
import ScreenLayout from '../../components/ScreenLayout';

const CalibrationScreen = () => {
  const {clibrationList} = useCalibration();

  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<ICalibration>) => (
      <CalibrationItem item={item} index={index} />
    ),
    [],
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
        <View
          style={{width: 200, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
            Date
          </Text>
        </View>
        <View
          style={{width: 100, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
            Instrument
          </Text>
        </View>
        <View
          style={{width: 100, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
            RLM
          </Text>
        </View>
        <View
          style={{width: 100, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
            MPT
          </Text>
        </View>
        <View
          style={{width: 150, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
            Inspector
          </Text>
        </View>
        <View
          style={{width: 100, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
            Result
          </Text>
        </View>
      </View>
    ),
    [],
  );
  const keyExtractor = useCallback(
    (item: ICalibration, index: number) => `cloth-${item.caliDate}-${index}`,
    [],
  );

  return (
    <ScreenLayout>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          data={clibrationList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent}
        />
      </ScrollView>
    </ScreenLayout>
  );
};

export default CalibrationScreen;
