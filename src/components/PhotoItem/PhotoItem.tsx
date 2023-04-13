import React from 'react';
import {Pressable, Image, Text, View, StyleSheet} from 'react-native';
import {CameraSVG, CancelSVG, MediaImageSVG, UploadSVG} from '../Icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

type Props = {
  placeText?: string;
  photoUri: string | null;
  pickerImage: () => void;
  cancelPhoto: () => void;
};

const PhotoItem = ({placeText, photoUri, pickerImage, cancelPhoto}: Props) => {
  const [isTouch, setIsTouch] = React.useState(false);
  const [response, setResponse] = React.useState<ImagePickerResponse | null>(
    null,
  );
  const openCamera = React.useCallback(() => {
    launchCamera(
      {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra: true,
      },
      setResponse,
    );
  }, []);
  const openGallery = React.useCallback(() => {
    launchImageLibrary(
      {
        selectionLimit: 0,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra: true,
      },
      setResponse,
    );
  }, []);
  return (
    <Pressable
      style={{
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        backgroundColor: 'aliceblue',
        height: 150,
        justifyContent: 'center',
        paddingVertical: 1,
      }}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        {photoUri ? (
          <View style={{width: '100%', height: '100%'}}>
            <Image
              source={{uri: photoUri}}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
            <Pressable
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
              }}
              onPress={cancelPhoto}>
              <CancelSVG height={36} width={36} stroke="gray" />
            </Pressable>
          </View>
        ) : (
          <>
            {placeText ? (
              <Text style={{textAlign: 'center', marginHorizontal: 50}}>
                {placeText}
              </Text>
            ) : (
              <UploadSVG width={32} height={32} style={{alignSelf: 'center'}} />
            )}
          </>
        )}
      </View>
      <Menu onSelect={() => setIsTouch(true)}>
        <MenuTrigger
          text=""
          customStyles={{
            triggerWrapper: {
              width: '100%',
              height: '100%',
            },
          }}
        />
        <MenuOptions>
          <MenuOption onSelect={openCamera}>
            <View style={{flexDirection: 'row', columnGap: 20}}>
              <CameraSVG width={32} height={32} />
              <Text style={{fontSize: 24}}>Camera</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={openGallery}>
            <View style={{flexDirection: 'row', columnGap: 20}}>
              <MediaImageSVG width={32} height={32} />
              <Text style={{fontSize: 24}}>Photos</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </Pressable>
  );
};

export default PhotoItem;
