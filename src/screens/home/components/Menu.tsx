import React, {useContext, useState} from 'react';
import {Text, View, FlatList, Pressable} from 'react-native';
import {EditSVG, MenuSVG} from '../../../assets/svgs';
import {IMenu} from '../../../Interface';
import {LayoutContext} from '../../../libs/contexts/LayoutProvider';
import {
  AUTHENTICATEDSCREENS,
  AuthenticatedRootStackParamList,
} from '../../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<
    AuthenticatedRootStackParamList,
    AUTHENTICATEDSCREENS.HOME,
    undefined
  >;
};

const Menu = ({navigation}: Props) => {
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
        width: width * 0.1,
        marginTop: 10,
      }}>
      <View
        style={{
          width: width * 0.1,
          height: width * 0.1,
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
            color: item.id === selectedMenu?.id ? '#ff0001' : 'white',
            fontSize: 14,
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
        paddingHorizontal: 15,
      }}>
      <FlatList
        data={menuList}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        ListHeaderComponentStyle={{marginVertical: 25}}
        ListHeaderComponent={() => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{}}>
              <MenuSVG width={36} height={36} />
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 24}}>
                CATEGORY
              </Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate(AUTHENTICATEDSCREENS.MANAGE)}>
              <EditSVG width={32} height={32} />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default Menu;
