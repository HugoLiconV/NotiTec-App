/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {
  TextInput,
  View,
  Button,
  Text,
  Divider,
  Heading,
  Caption,
  Subtitle,
} from '@shoutem/ui';
import {
  ACCENT_4,
  BACKGROUND_COLOR,
  BRAND,
  CREATE_ACCOUNT_SCREEN,
  HOME_SCREEN,
} from '../constants';

const TAG = '[LOGIN]:';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function login() {
    console.log(`${TAG} ${email} ${password}`);
    navigateToHome();
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
      <Button onPress={login}>
        <Text>Iniciar Sesión</Text>
      </Button>
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
