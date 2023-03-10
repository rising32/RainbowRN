import React, {useContext} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';
import {CurrentUserContext} from '../../libs/contexts/AppProvider';
import Image from '../Image/Image';

interface Props extends ViewProps {
  width: number;
  style?: ViewStyle;
}

const Avatar = ({width = 200, style}: Props) => {
  const {currentUser} = useContext(CurrentUserContext);

  return (
    <View
      style={[
        {
          width: width,
          height: width,
          borderRadius: width,
          backgroundColor: 'black',
        },
        style,
      ]}>
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
  );
};

export default Avatar;
