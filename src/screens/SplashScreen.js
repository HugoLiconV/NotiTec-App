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
    if (!userToken) {
      redirectToAuth();
      return;
    }
    redirectToHome();
  }

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="dark-content" />
      <Text>Cargando...</Text>
      <ActivityIndicator color={ACCENT_4} size="large" />
    </View>
  );
};

export default SplashScreen;
