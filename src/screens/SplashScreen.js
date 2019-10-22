/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text, View, ActivityIndicator, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  AUTH_TOKEN,
  HOME_SCREEN,
  BACKGROUND_COLOR,
  ACCENT_4,
  LOGIN_SCREEN,
} from '../constants';
import { Image, Divider } from '@shoutem/ui';

const SplashScreen = props => {
  useEffect(() => {
    console.log('[INFO]: Splash Screen Mounted');
    bootstrapAsync();
  }, []);

  function redirectToAuth() {
    props.navigation.navigate(LOGIN_SCREEN);
  }

  function redirectToHome() {
    props.navigation.navigate(HOME_SCREEN);
  }

  async function bootstrapAsync() {
    const userToken = await AsyncStorage.getItem(AUTH_TOKEN).catch(() => {
      console.log('[INFO]: Error getting token');
    });
    setTimeout(() => {
      if (!userToken) {
        redirectToAuth();
        return;
      }
      redirectToHome();
    }, 700);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="dark-content" />
      <View style={{display: 'flex', alignItems: 'center', marginBottom: 19}}>
        <Image
          source={require('../assets/bison.png')}
          style={{width: 72, height: 72}}
        />
      </View>
      <Text>Cargando...</Text>
      <Divider />
      <ActivityIndicator color={ACCENT_4} size="large" />
    </View>
  );
};

export default SplashScreen;
