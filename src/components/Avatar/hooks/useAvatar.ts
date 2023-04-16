import React from 'react';
import {useRecoilState} from 'recoil';
import {userState} from '../../../recoil/atoms';
import {AppContext} from '../../../libs/contexts/AppProvider';
import {request} from '../../../utils';
import {Asset} from 'react-native-image-picker';

export default function useAvatar() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const {defaultURL} = React.useContext(AppContext);
  const [photoURI, setPhotoURI] = React.useState<string | null>(null);
  const [user, setUser] = useRecoilState(userState);

  const pickerImage = async (image: Asset) => {
    const id = user?._id || user?.userId;
    if (!id) {
      return;
    }
    try {
      setLoading(true);
      console.log(image);
      const form = new FormData();
      form.append('file', {
        uri: `file://${image.uri}`,
        name: 'user',
        type: image.type,
      });
      form.append('name', 'nuxt-rlm-bucket/user-image');
      form.append('fileType', image.type);
      const data = await request<{file: string}>(
        `${defaultURL}/api/awsobjectsinbucket`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: form,
        },
      );
      const params = {photoUrl: data.file};
      console.log(params);
      await request(`${defaultURL}/api/usersadmin/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      setUser({...user, photoUrl: data.file});
      setPhotoURI(data.file);
    } catch (err) {
      console.log(`${defaultURL}/api/usersadmin/${id}`, err);
      setError('image upload failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    user,
    photoURI,
    pickerImage,
  };
}
