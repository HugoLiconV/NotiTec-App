/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
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
import UserService from '../services/UserService';
import {NotificationService} from '../services/NotificationService';

const TAG = 'PROFILE';

const Profile = props => {
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [career, setCareer] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  function validatePasswords() {
    if (newPassword && !currentPassword) {
      setValidationError(
        'Necesitas introducir tu contraseña actual para cambiarla.',
      );
      return true;
    }
    setValidationError('');
    return false;
  }

  async function me() {
    setLoading(true);
    const res = await UserService()
      .me()
      .catch(e => {
        setLoading(false);
      });
    setUser(res);
    setName(res.name);
    setCareer(getCareerNameFromValue(res.career));
    setLoading(false);
  }

  useEffect(() => {
    me();
  }, []);

  async function updateProfile() {
    const errors = validatePasswords();
    if (!errors) {
      console.log(`${TAG}: update profile with: `, {
        name,
        currentPassword,
        newPassword,
      });
      const requests = [];
      if (newPassword) {
        requests.push(
          UserService().updatePassword(
            user.id,
            user.email,
            currentPassword,
            newPassword,
          ),
        );
      }
      requests.push(
        UserService().updateUser(user.id, name, career.value, user.picture),
      );
      const res = await Promise.all(requests).catch(e => {
        NotificationService().showError(
          'No se pudo actualizar el perfil. Intentálo más tarde',
        );
      });
      if (res) {
        props.navigation.pop();
        NotificationService().showSuccess(
          'Tu perfil se actualizó correctamente',
        );
      }
    }
  }

  function getCareerNameFromValue(career) {
    const res = CARRERAS.find(c => c.value === career);
    return res;
  }

  if (loading) {
    return <Text styleName="h-center v-center">Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="dark-content" />
      <GoBack navigation={props.navigation} title="Perfil" />
      <Divider />
      <TouchableOpacity>
        <View styleName="horizontal h-center">
          <Image styleName="medium-avatar" source={{uri: user.picture}} />
        </View>
      </TouchableOpacity>
      <Caption styleName="h-center">Presiona para cambiar la foto</Caption>
      <Divider />
      <TextInput
        placeholder="Nombre"
        style={{selectionColor: ACCENT_4}}
        onChangeText={setName}
        value={name}
        defaultValue={user.name}
      />
      <TextInput
        placeholder={'Contraseña actual'}
        secureTextEntry
        keyboardType={showPassword ? 'visible-password' : null}
        autoCompleteType="password"
        onChangeText={setCurrentPassword}
        style={{selectionColor: ACCENT_4}}
      />
      <TextInput
        placeholder={'Nueva contraseña'}
        secureTextEntry
        autoCompleteType="password"
        keyboardType={showPassword ? 'visible-password' : null}
        onChangeText={setNewPassword}
        style={{selectionColor: ACCENT_4}}
      />
      <DropDownMenu
        styleName="horizontal"
        options={CARRERAS}
        selectedOption={career ? career : getCareerNameFromValue(user.career)}
        onOptionSelected={setCareer}
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
