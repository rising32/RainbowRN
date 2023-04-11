import React, {useCallback} from 'react';
import {View, Text, Pressable} from 'react-native';
import {AUTHENTICATEDSCREENS, DRAWERSCREENS, DrawerParamList} from '../types';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Avatar from '../../components/Avatar/Avatar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import {userState} from '../../recoil/atoms';
import CalibrationScreen from '../../screens/home/CalibrationScreen';
import BeginInspectionScreen from '../../screens/home/BeginInspectionScreen';
import RejectedInspectionScreen from '../../screens/home/RejectedInspectionScreen';
import AcceptedRecordScreen from '../../screens/home/AcceptedRecordScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent props={props} />}
      screenOptions={{
        drawerStyle: {
          width: 200,
        },
      }}>
      <Drawer.Screen
        name={DRAWERSCREENS.CALIBRATION}
        component={CalibrationScreen}
        options={({navigation}) => ({
          title: 'Calibration',
          headerRight: () => (
            <Pressable
              style={{marginRight: 20}}
              onPress={() =>
                navigation.navigate(AUTHENTICATEDSCREENS.EDITCALIBRATION, {
                  item: null,
                  title: 'New Calibration',
                })
              }>
              <Text style={{color: 'darkcyan', fontSize: 20}}>New</Text>
            </Pressable>
          ),
        })}
      />
      <Drawer.Screen
        name={DRAWERSCREENS.BEGININSPECTION}
        component={BeginInspectionScreen}
        options={{
          title: 'Begin Inspection',
        }}
      />
      <Drawer.Screen
        name={DRAWERSCREENS.REJECTEDINSPECTION}
        component={RejectedInspectionScreen}
        options={{
          title: 'Rejected Inspection',
        }}
      />
      <Drawer.Screen
        name={DRAWERSCREENS.ACCEPTEDINSPECTION}
        component={AcceptedRecordScreen}
        options={{
          title: 'Accepted Records',
        }}
      />
    </Drawer.Navigator>
  );
};

type CustomDrawerProps = {
  props: DrawerContentComponentProps;
};

function CustomDrawerContent({props}: CustomDrawerProps) {
  const [user, setUser] = useRecoilState(userState);
  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('@user_id');
      setUser(null);
    } catch (error) {
      console.log('log out error = ', error);
    }
  }, [setUser]);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
      <View
        style={{
          marginTop: 60,
          paddingHorizontal: 10,
          marginBottom: 30,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Avatar width={80} />
        <View
          style={{
            marginLeft: 10,
          }}>
          <Text style={{fontSize: 18}}>{user?.username || user?.userName}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'red',
                marginRight: 5,
              }}
            />
            <Text>Inspector</Text>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Log Out" onPress={signOut} />
      <View style={{justifyContent: 'flex-end', flex: 1}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 10,
            marginBottom: 30,
            marginTop: 15,
          }}>
          {'@2023 EXATEC PTE LTD. All rights reserved.'}
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default DrawerNavigator;
