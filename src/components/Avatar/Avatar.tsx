import React from 'react';
import {Pressable, Image, View, Text, StyleSheet} from 'react-native';
import {CameraSVG, MediaImageSVG, UserSVG} from '../Icons';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import useAvatar from './hooks/useAvatar';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

type Props = {
  width: number;
};

const {SlideInMenu} = renderers;
const Avatar = ({width}: Props) => {
  const {user, pickerImage} = useAvatar();

  const openCamera = React.useCallback(() => {
    launchCamera(
      {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra: true,
      },
      ({didCancel, assets}: ImagePickerResponse) => {
        if (didCancel) {
          console.log('User cancelled image picker');
        } else {
          if (assets && assets.length > 0) {
            const image = assets[0];
            pickerImage(image);
          }
        }
      },
    );
  }, [pickerImage]);
  const openGallery = React.useCallback(() => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra: true,
      },
      ({didCancel, assets}: ImagePickerResponse) => {
        if (didCancel) {
          console.log('User cancelled image picker');
        } else {
          if (assets && assets.length > 0) {
            const image = assets[0];
            pickerImage(image);
          }
        }
      },
    );
  }, [pickerImage]);

  return (
    <Pressable
      style={{
        width: width,
        height: width,
        borderRadius: width,
        backgroundColor: '#e4e6e7',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        {user?.photoUrl ? (
          <Image
            source={{uri: user?.photoUrl}}
            style={{width: width, height: width, borderRadius: width}}
          />
        ) : (
          <UserSVG height={width * 0.8} width={width * 0.8} />
        )}
      </View>

      <Menu renderer={SlideInMenu}>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {
              width: width,
              height: width,
              borderRadius: width,
            },
          }}
        />
        <MenuOptions
          customStyles={{
            optionsWrapper: {
              padding: 20,
              borderWidth: 1,
              borderColor: 'gray',
            },
          }}>
          <MenuOption onSelect={openCamera}>
            <View style={{flexDirection: 'row', paddingVertical: 5}}>
              <CameraSVG width={32} height={32} />
              <Text style={{fontSize: 24, marginLeft: 20}}>Camera</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={openGallery}>
            <View style={{flexDirection: 'row', paddingVertical: 5}}>
              <MediaImageSVG width={32} height={32} />
              <Text style={{fontSize: 24, marginLeft: 20}}>Photos</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </Pressable>
  );
};

export default Avatar;
