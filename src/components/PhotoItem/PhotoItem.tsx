import React from 'react';
import {
  Alert,
  Pressable,
  Image,
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {CameraSVG, CancelSVG, MediaImageSVG, UploadSVG} from '../Icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

type Props = {
  placeText?: string;
  photoUri: string | null;
  pickerImage: (image: Asset) => void;
  cancelPhoto: () => void;
};

const {SlideInMenu} = renderers;

const requestWritePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }

  // const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  const permission =
    Number(Platform.Version) >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  if (permission == null) {
    return false;
  }
  let hasPermission = await PermissionsAndroid.check(permission);
  console.log('hasPermission = ', hasPermission);
  if (!hasPermission) {
    const permissionRequestResult = await PermissionsAndroid.request(
      permission,
    );
    console.log('permissionRequestResult = ', permissionRequestResult);
    hasPermission =
      permissionRequestResult === PermissionsAndroid.RESULTS.GRANTED;
  }
  return hasPermission;
};

const PhotoItem = ({placeText, photoUri, pickerImage, cancelPhoto}: Props) => {
  const openCamera = React.useCallback(async () => {
    try {
      const hasWritePermission = await requestWritePermission();
      if (!hasWritePermission) {
        Alert.alert(
          'Permission denied!',
          'app does not have write permission.',
        );
        return;
      }

      await launchCamera(
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
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e);
      Alert.alert(
        'Failed to open Camera!',
        `An unexpected error occured while trying to open camera. ${message}`,
      );
    }
  }, [pickerImage]);
  const openGallery = React.useCallback(async () => {
    try {
      await launchImageLibrary(
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
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e);
      Alert.alert(
        'Failed to launch image gallery!',
        `An unexpected error occured while trying to launch image gallery. ${message}`,
      );
    }
  }, [pickerImage]);
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
      <Menu renderer={SlideInMenu}>
        <MenuTrigger
          text=""
          customStyles={{
            triggerWrapper: {
              width: '100%',
              height: '100%',
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
      {photoUri && (
        <Pressable
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          onPress={cancelPhoto}>
          <CancelSVG height={36} width={36} stroke="gray" />
        </Pressable>
      )}
    </Pressable>
  );
};

export default PhotoItem;
