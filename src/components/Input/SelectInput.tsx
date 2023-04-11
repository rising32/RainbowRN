import React, {useState, useEffect, useMemo} from 'react';
import {Text, View, StyleSheet, FlatList, Pressable} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {CancelSVG, NavArrowDownSVG, NavArrowUpSVG} from '../Icons';

type OptionType = {
  isChecked: boolean;
  text: string;
};
type Props = {
  optionList: string[];
  selectedItems: string[];
  isMulti?: boolean;
  onSelectOption: (option: string, remove: boolean) => void;
};

const SelectInput = ({
  optionList,
  selectedItems,
  isMulti = false,
  onSelectOption,
}: Props) => {
  const [showOption, setShowOption] = useState(false);
  const [optionData, setOptionData] = useState<OptionType[]>([]);

  const onCheckItem = (value: boolean, option: OptionType) => {
    !isMulti && setShowOption(false);
    const data = optionData.map(element => {
      if (element.text === option.text) {
        return {...element, isChecked: value};
      } else {
        return isMulti ? element : {...element, isChecked: false};
      }
    });
    setOptionData(data);
    onSelectOption(option.text, value);
  };
  const onSelectItem = (option: OptionType) => {
    !isMulti && setShowOption(false);
    const data = optionData.map(element => {
      if (element.text === option.text) {
        onSelectOption(option.text, !element.isChecked);
        return {...element, isChecked: !element.isChecked};
      } else {
        return isMulti ? element : {...element, isChecked: false};
      }
    });
    setOptionData(data);
  };
  useEffect(() => {
    if (optionList.length > 0) {
      const data = optionList.map(option => {
        return {
          isChecked: false,
          text: option,
        };
      });
      if (selectedItems.length > 0) {
        const selectData = data.map(option => {
          return {
            ...option,
            isChecked: Boolean(
              selectedItems.find(element => element === option.text),
            ),
          };
        });
        setOptionData(selectData);
      } else {
        setOptionData(data);
      }
    }
  }, [optionList, selectedItems]);
  const selectedOptions = useMemo(
    () => optionData.filter(element => element.isChecked === true),
    [optionData],
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomWidth: showOption ? 1 : 0,
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 5,
          flexWrap: 'wrap',
        }}>
        {selectedOptions.map(option => (
          <View key={option.text}>
            {isMulti ? (
              <View
                style={{
                  paddingHorizontal: 5,
                  borderWidth: 1,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'lightgray',
                }}>
                <Text
                  style={{fontSize: 10, fontWeight: 'bold'}}
                  numberOfLines={1}>
                  {option.text}
                </Text>
                <Pressable onPress={() => onSelectItem(option)}>
                  <CancelSVG width={24} height={24} stroke="black" />
                </Pressable>
              </View>
            ) : (
              <View style={{maxWidth: 300}}>
                <Text style={{fontSize: 16}} numberOfLines={1}>
                  {option.text}
                </Text>
              </View>
            )}
          </View>
        ))}
        <Pressable
          style={{
            flex: 1,
            height: 40,
          }}
          onPress={() => setShowOption(!showOption)}
        />
        <Pressable
          style={{
            position: 'absolute',
            top: 5,
            right: 0,
            bottom: 5,
            borderLeftWidth: 1,
            justifyContent: 'center',
            borderLeftColor: 'gray',
          }}
          onPress={() => setShowOption(!showOption)}>
          {showOption ? (
            <NavArrowUpSVG width={24} height={24} stroke="black" />
          ) : (
            <NavArrowDownSVG width={24} height={24} stroke="black" />
          )}
        </Pressable>
      </View>
      {showOption && (
        <FlatList
          data={optionData}
          renderItem={({item}) => (
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => onSelectItem(item)}>
              <CheckBox
                disabled={false}
                value={item.isChecked}
                onValueChange={(value: boolean) => onCheckItem(value, item)}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  marginVertical: 5,
                  overflow: 'hidden',
                }}
                numberOfLines={1}>
                {item.text}
              </Text>
            </Pressable>
          )}
          style={{maxHeight: 250}}
          contentContainerStyle={{paddingVertical: 10}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    //
  },
});
export default SelectInput;
