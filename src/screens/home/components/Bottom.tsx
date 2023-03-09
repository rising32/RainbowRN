import React, {useState} from 'react';
import {Text, View, FlatList, Pressable} from 'react-native';
import {IMenu} from '../../../Interface';

const Bottom = () => {
  const [selectedVideo, setSelectedVideo] = useState<IMenu | null>(null);
  const menuList: IMenu[] = [
    {
      id: '0',
      title: 'SPICY RAINBOW ROLL',
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
      style={{
        padding: 10,
        backgroundColor: item.id === selectedVideo?.id ? '#EBAFAF' : 'black',
      }}
      onPress={() => setSelectedVideo(item)}>
      <View
        style={{
          width: 220,
          height: 100,
          backgroundColor: '#D9D9D9',
        }}
      />
      <View
        style={{
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:
            item.id === selectedVideo?.id ? '#EBAFAF' : '#495057',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 14,
            textTransform: 'uppercase',
            overflow: 'hidden',
          }}
          numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
  return (
    <View
      style={
        {
          //height: 200,
        }
      }>
      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: 12,
        }}>
        <FlatList
          data={menuList}
          horizontal
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Bottom;
