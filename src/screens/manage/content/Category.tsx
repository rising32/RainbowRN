import React, {useContext, useState} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import PressableButton from '../../../components/PressableButton/PressableButton';
import {IMenu} from '../../../Interface';
import {LayoutContext} from '../../../libs/contexts/LayoutProvider';

const Category = () => {
  const [selectedMenu, setSelectedMenu] = useState<IMenu | null>(null);
  const {width} = useContext(LayoutContext);

  const menuList: IMenu[] = [
    {
      id: '0',
      title: 'Appetisers',
    },
    {
      id: '1',
      title: 'Sushi Boxes',
    },
    {
      id: '2',
      title: 'Uramaki',
    },
    {
      id: '3',
      title: 'Special Rolls',
    },
    {
      id: '4',
      title: 'Crazy Crunchy Rolls',
    },
    {
      id: '5',
      title: 'Maki Rolls',
    },
    {
      id: '6',
      title: 'Sashimi',
    },
    {
      id: '7',
      title: 'Nigiri',
    },
    {
      id: '8',
      title: 'Temaki',
    },
    {
      id: '9',
      title: 'Hot Dishes',
    },
    {
      id: '10',
      title: 'Poke Bowls',
    },
    {
      id: '11',
      title: 'Vegan',
    },
  ];

  const Item = ({item}: {item: IMenu}) => (
    <Pressable
      onPress={() => setSelectedMenu(item)}
      style={{
        width: width * 0.07,
        marginTop: 10,
      }}>
      <View
        style={{
          width: width * 0.07,
          height: width * 0.07,
          backgroundColor: '#D9D9D9',
          borderRadius: 10,
          borderWidth: 2,
          borderColor: item.id === selectedMenu?.id ? '#ff0001' : '#D9D9D9',
        }}
      />
      <View
        style={{height: 40, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            color: item.id === selectedMenu?.id ? '#ff0001' : 'black',
            fontSize: 12,
            fontWeight: 'bold',
          }}
          numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
  return (
    <View
      style={{
        flex: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
      }}>
      <View
        style={{
          height: 60,
          borderBottomWidth: 1,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 24,
            color: 'black',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Category
        </Text>
      </View>
      <View
        style={{
          height: 80,
          borderBottomWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <PressableButton
          text="Manage Category"
          style={{
            width: '80%',
            backgroundColor: '#FFB950',
          }}
          textStyle={{
            fontSize: 18,
          }}
        />
      </View>
      <FlatList
        data={menuList}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      />
    </View>
  );
};

export default Category;
