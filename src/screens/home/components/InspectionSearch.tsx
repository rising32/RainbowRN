import React, {useMemo, useState} from 'react';
import {Text, View, Pressable} from 'react-native';
import {useRecoilValue} from 'recoil';
import {
  settingState,
  poleListState,
  locationListState,
} from '../../../recoil/atoms';
import SelectInput from '../../../components/Input/SelectInput';
import {FilterQuery} from '../types';

type Props = {
  showSearch: boolean;
  onHide: () => void;
  onSearchQuery: (query: FilterQuery) => void;
};

const InspectionSearch = ({onHide, showSearch, onSearchQuery}: Props) => {
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPoleIds, setSelectedPoleIds] = useState<string[]>([]);
  const {paramZone} = useRecoilValue(settingState);
  const poleList = useRecoilValue(poleListState);
  const locationList = useRecoilValue(locationListState);

  const locationIDData = useMemo(
    () =>
      locationList.map(element => {
        return element.locationName;
      }),
    [locationList],
  );
  const poleIDData = useMemo(
    () =>
      poleList.map(element => {
        return element.poleidName;
      }),
    [poleList],
  );
  const onSelectZoneOption = (option: string, remove: boolean) => {
    if (remove) {
      setSelectedZones([option]);
    } else {
      setSelectedZones([]);
    }
  };
  const onSelectLocationOption = (option: string, remove: boolean) => {
    if (remove) {
      setSelectedLocations([option]);
    } else {
      setSelectedLocations([]);
    }
  };
  const onSelectPoleIdOption = (option: string, remove: boolean) => {
    if (remove) {
      setSelectedPoleIds([option]);
    } else {
      setSelectedPoleIds([]);
    }
  };

  if (!showSearch) {
    return <View />;
  }
  const onSearch = () => {
    onSearchQuery({
      zoneText: selectedZones,
      locationText: selectedLocations,
      poleIdText: selectedPoleIds,
    });
    onHide();
  };
  const onReset = () => {
    setSelectedZones([]);
    setSelectedLocations([]);
    setSelectedPoleIds([]);
    onSearchQuery({
      zoneText: [],
      locationText: [],
      poleIdText: [],
    });
    onHide();
  };

  return (
    <View
      style={{
        marginHorizontal: 30,
        marginBottom: 10,
        rowGap: 10,
      }}>
      <View style={{width: '100%'}}>
        <View style={{marginBottom: 3, paddingLeft: 10}}>
          <Text style={{fontSize: 18, color: 'black'}}>Zone</Text>
        </View>
        <SelectInput
          selectedItems={selectedZones}
          optionList={paramZone}
          onSelectOption={onSelectZoneOption}
        />
      </View>
      <View style={{width: '100%'}}>
        <View style={{marginBottom: 3, paddingLeft: 10}}>
          <Text style={{fontSize: 18, color: 'black'}}>Location</Text>
        </View>
        <SelectInput
          optionList={locationIDData}
          selectedItems={selectedLocations}
          onSelectOption={onSelectLocationOption}
        />
      </View>
      <View style={{width: '100%'}}>
        <View style={{marginBottom: 3, paddingLeft: 10}}>
          <Text style={{fontSize: 18, color: 'black'}}>Pole ID</Text>
        </View>
        <SelectInput
          optionList={poleIDData}
          selectedItems={selectedPoleIds}
          onSelectOption={onSelectPoleIdOption}
        />
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Pressable
          style={{
            backgroundColor: 'darkcyan',
            width: '40%',
            paddingVertical: 5,
            borderRadius: 100,
          }}
          onPress={onReset}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
            Reset
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: 'red',
            width: '40%',
            paddingVertical: 5,
            borderRadius: 100,
          }}
          onPress={onSearch}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 20,
            }}>
            Search
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default InspectionSearch;
