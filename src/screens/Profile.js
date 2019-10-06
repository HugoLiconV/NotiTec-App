/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  Heading,
  Button,
  Image,
  TextInput,
  DropDownMenu,
  Caption,
  Divider,
  TouchableOpacity,
} from '@shoutem/ui';
import {BACKGROUND_COLOR, CARRERAS, ACCENT_4} from '../constants';
import {StyleSheet, StatusBar} from 'react-native';
import GoBack from '../components/GoBack';

const TAG = 'PROFILE';

const Profile = props => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [selectedCarrera, setSelectedCarrera] = useState(CARRERAS[0]);
  const [showPassword, setShowPassword] = useState(false);

  function validatePasswords() {
    if (password !== confirmPassword) {
      setValidationError('Las contraseñas no coinciden');
      return true;
    }
    setValidationError('');
    return false;
  }

  function updateProfile() {
    const errors = validatePasswords();
    if (!errors) {
      console.log(`${TAG}: update profile with: `, {
        name,
        password,
        confirmPassword,
      });
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="dark-content" />
      <GoBack navigation={props.navigation} title="Perfil" />
      <Divider />
      <TouchableOpacity>
        <View styleName="horizontal h-center">
          <Image
            styleName="medium-avatar"
            source={require('../assets/avatar.jpg')}
          />
        </View>
      </TouchableOpacity>
      <Caption styleName="h-center">Presiona para cambiar la foto</Caption>
      <Divider />
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
      <Button onPress={updateProfile}>
        <Text>Actualizar</Text>
      </Button>
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
    flex: 1,
  },
});
export default Profile;
