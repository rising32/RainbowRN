import React from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {coreState, userState} from '../../../recoil/atoms';
import {AppContext} from '../../../libs/contexts/AppProvider';
import {request} from '../../../utils';
import {Asset} from 'react-native-image-picker';

export default function useAvatar() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const {defaultURL} = React.useContext(AppContext);
  const [user, setUser] = useRecoilState(userState);
  const setCoreState = useSetRecoilState(coreState);

  const pickerImage = async (image: Asset) => {
    const id = user?._id || user?.userId;
    if (!id) {
      return;
    }
    try {
      setLoading(true);
      setCoreState({loading: true, loadingText: 'Uploading'});
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
      setCoreState({loading: true, loadingText: 'Updating user avatar'});
      fetch(`${defaultURL}/api/usersadmin/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }).then(res => {
        console.log(res.status);
        setUser({...user, photoUrl: data.file});
        setCoreState({loading: false});
      });
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
    pickerImage,
  };
}
