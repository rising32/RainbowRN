import React from 'react';
import {Pressable, Image} from 'react-native';
import {UserSVG} from '../Icons';
import {useRecoilValue} from 'recoil';
import {userState} from '../../recoil/atoms';

type Props = {
  width: number;
  onSelectAvatar?: () => void;
};

const Avatar = ({width, onSelectAvatar}: Props) => {
  const user = useRecoilValue(userState);

  return (
    <Pressable
      style={{
        width: width,
        height: width,
        borderRadius: width,
        backgroundColor: '#e4e6e7',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onSelectAvatar}>
      {user?.photoUrl ? (
        <Image
          source={{uri: user.photoUrl}}
          style={{width: width, height: width, borderRadius: width}}
        />
      ) : (
        <UserSVG height={width * 0.8} width={width * 0.8} />
      )}
    </Pressable>
  );
};

export default Avatar;
