/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import {
  TextInput,
  View,
  Button,
  Text,
  Divider,
  Heading,
  Caption,
  Subtitle,
  Spinner,
} from '@shoutem/ui';
import {
  ACCENT_4,
  BACKGROUND_COLOR,
  BRAND,
  CREATE_ACCOUNT_SCREEN,
  HOME_SCREEN,
  AUTH_TOKEN,
  ERROR_COLOR,
} from '../constants';
import AuthService from '../services/AuthService';
import {NotificationService} from '../services/NotificationService';

const TAG = '[LOGIN]:';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  function validateForm() {
    if (!email || !password) {
      setValidationError('No debe haber campos vacios.');
      return true;
    }
    setValidationError('');
    return false;
  }

  async function login() {
    const errors = validateForm();
    console.log("TCL: login -> errors", errors)
    if (!errors) {
      setLoading(true);
      const res = await AuthService()
        .login(email, password)
        .catch(({response}) => {
          console.log(`${TAG}: LOGIN FAILED: `, response);
          if (response.status === 401) {
            NotificationService().showError(
              'Email o contraseña incorrecta. Verifica los datos',
            );
          }
          NotificationService().showError(
            'Error en el servidor. Intenta de nuevo luego.',
          );
          setLoading(false);
        });
      setLoading(false);
      if (res && res.token) {
        storeToken(res.token);
        navigateToHome();
      }
    }
  }

  async function storeToken(token) {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN, token);
    } catch (e) {
      console.log(`${TAG} Error saving token: `, e);
    }
  }

  function navigateToHome() {
    props.navigation.navigate(HOME_SCREEN);
  }

  function navigateToCreateAccount() {
    props.navigation.navigate(CREATE_ACCOUNT_SCREEN);
  }

  return (
    <View styleName="fill-parent vertical v-center" style={styles.container}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="dark-content" />
      <Heading styleName="h-center">Iniciar sesión</Heading>
      <Divider />
      <TextInput
        placeholder={'email'}
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={setEmail}
        style={{selectionColor: ACCENT_4}}
      />
      <TextInput
        placeholder={'Contraseña'}
        secureTextEntry
        keyboardType={showPassword ? 'visible-password' : null}
        autoCompleteType="password"
        onChangeText={setPassword}
        style={{selectionColor: ACCENT_4}}
      />
      <Caption
        onPress={() => {
          setShowPassword(!showPassword);
        }}
        style={{
          color: showPassword ? ACCENT_4 : '#6F6F6F',
          textAlign: 'right',
        }}>
        {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      </Caption>
      <Divider />
      <Button onPress={login} disabled={loading}>
        {loading ? (
          <Spinner style={{size: 'large'}} />
        ) : (
          <Text>Iniciar Sesión</Text>
        )}
      </Button>
      <Text styleName="h-center" style={{color: '#a2423d'}}>
        {validationError}
      </Text>
      <Divider />
      <Subtitle
        styleName="h-center"
        style={{color: BRAND}}
        onPress={navigateToCreateAccount}>
        Crear usuario
      </Subtitle>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    padding: 16,
  },
});

export default Login;
