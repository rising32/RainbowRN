import React, {useState} from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import PressableButton from '../../../components/PressableButton/PressableButton';
import {IVideo} from '../../../Interface';

const Product = () => {
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);
  const videoList: IVideo[] = [
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

  const Item = ({item}: {item: IVideo}) => (
    <Pressable
      style={{
        padding: 5,
        backgroundColor: item.id === selectedVideo?.id ? '#EBAFAF' : 'white',
      }}
      onPress={() => setSelectedVideo(item)}>
      <View
        style={{
          borderWidth: item.id === selectedVideo?.id ? 0 : 1,
        }}>
        <View
          style={{
            width: '100%',
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
          Product
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
          text="Manage Products"
          style={{
            width: '80%',
            backgroundColor: '#65D986',
          }}
          textStyle={{
            fontSize: 18,
          }}
        />
      </View>
      <FlatList
        data={videoList}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
        style={{padding: 10, backgroundColor: 'white'}}
      />
    </View>
  );
};

export default Product;
