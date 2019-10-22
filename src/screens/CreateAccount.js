/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {
  TextInput,
  View,
  Button,
  Text,
  Divider,
  DropDownMenu,
  Heading,
  Caption,
  Subtitle,
  Spinner,
} from '@shoutem/ui';
import {
  ACCENT_4,
  CARRERAS,
  BACKGROUND_COLOR,
  BRAND,
  LOGIN_SCREEN,
  HOME_SCREEN,
  AUTH_TOKEN,
} from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import UserService from '../services/UserService';
import {NotificationService} from '../services/NotificationService';

const TAG = '[CREATE_ACCOUNT]:';

const CreateAccount = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [selectedCarrera, setSelectedCarrera] = useState(CARRERAS[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function validatePasswords() {
    if (password !== confirmPassword) {
      setValidationError('Las contraseñas no coinciden');
      return true;
    } else if (password.length < 6) {
      setValidationError('La contraseña debe de tener 6 o más dígitos');
      return true;
    } else if (
      email === '' ||
      password === '' ||
      name === '' ||
      confirmPassword === ''
    ) {
      setValidationError('No debe haber campos vacios.');
    }
    setValidationError('');
    return false;
  }

  async function createAccount() {
    const errors = validatePasswords();
    if (!errors) {
      setLoading(true);
      const res = await UserService()
        .createAccount(email, password, name, selectedCarrera.value)
        .catch(({response}) => {
          console.log(`${TAG}: LOGIN FAILED: `, response);
          let message = '';
          if (response.status === 409) {
            message = 'El correo ya está registrado. Intenta con otro';
          } else {
            message = 'No se pudo crear cuenta, vuelve a intentarlo luego';
          }
          NotificationService().showError(message);
        });
      setLoading(true);
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

  function navigateToLogin() {
    props.navigation.navigate(LOGIN_SCREEN);
  }

  return (
    <View styleName="fill-parent vertical v-center" style={styles.container}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="dark-content" />
      <Heading styleName="h-center">Crear nueva cuenta</Heading>
      <Divider />
      <TextInput
        placeholder={'email'}
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={setEmail}
        style={{selectionColor: ACCENT_4}}
      />
      <TextInput
        placeholder="Nombre"
        style={{selectionColor: ACCENT_4}}
        onChangeText={setName}
      />
      <TextInput
        placeholder={'Contraseña'}
        secureTextEntry
        keyboardType={showPassword ? 'visible-password' : null}
        autoCompleteType="password"
        onChangeText={setPassword}
        style={{selectionColor: ACCENT_4}}
      />
      <TextInput
        placeholder={'Confirma tu contraseña'}
        secureTextEntry
        autoCompleteType="password"
        keyboardType={showPassword ? 'visible-password' : null}
        onChangeText={setConfirmPassword}
        style={{selectionColor: ACCENT_4}}
      />
      <DropDownMenu
        styleName="horizontal"
        options={CARRERAS}
        selectedOption={selectedCarrera ? selectedCarrera : CARRERAS[0]}
        onOptionSelected={setSelectedCarrera}
        titleProperty="name"
        valueProperty="value"
        style={{
          selectedOption: {
            backgroundColor: 'white',
          },
        }}
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
      <Button onPress={createAccount} disabled={loading}>
        {loading ? (
          <Spinner style={{size: 'large'}} />
        ) : (
          <Text>Crear Cuenta</Text>
        )}
      </Button>
      <Divider />
      <Subtitle
        styleName="h-center"
        style={{color: BRAND}}
        onPress={navigateToLogin}>
        Iniciar sesión
      </Subtitle>
      <Divider />
      <Text styleName="h-center" style={{color: '#a2423d'}}>
        {validationError}
      </Text>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    padding: 16,
  },
});

export default CreateAccount;
