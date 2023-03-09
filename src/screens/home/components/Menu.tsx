import React, {useContext} from 'react';
import {Text, View, FlatList} from 'react-native';
import {MenuSVG} from '../../../assets/svgs';
import {IMenu} from '../../../Interface';
import {LayoutContext} from '../../../libs/contexts/LayoutProvider';

const Menu = () => {
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
    <View
      style={{
        width: width * 0.1,
        marginTop: 10,
      }}>
      <View
        style={{
          width: width * 0.1,
          height: width * 0.1,
          backgroundColor: '#D9D9D9',
          borderRadius: 10,
        }}
      />
      <View
        style={{height: 40, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{textAlign: 'center', color: 'white', fontSize: 14}}
          numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 15,
      }}>
      <View style={{position: 'absolute', top: 10, left: 10}}>
        <MenuSVG width={36} height={36} />
      </View>
      <FlatList
        data={menuList}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
        numColumns={3}
        columnWrapperStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        ListHeaderComponentStyle={{marginBottom: 25}}
        ListHeaderComponent={() => (
          <Text style={{textAlign: 'center', color: 'white', fontSize: 24}}>
            CATEGORY
          </Text>
        )}
      />
    </View>
  );
};

export default Menu;
