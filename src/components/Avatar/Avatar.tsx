import React, {useContext} from 'react';
import {View} from 'react-native';
import {CurrentUserContext} from '../../libs/contexts/AppProvider';
import Image from '../Image/Image';

type Props = {
  width: number;
};

const Avatar = ({width = 200}: Props) => {
  const {currentUser} = useContext(CurrentUserContext);

  return (
    <View>
      <View
        style={{
          width: width,
          height: width,
          borderRadius: width,
          backgroundColor: 'black',
        }}>
        {currentUser.role === 'guest' ? null : (
          <Image
            source={{
              uri: 'https://unsplash.it/400/400?image=1',
            }}
            width={width}
            isRound
          />
        )}
      </View>
    </View>
  );
};

export default Avatar;
