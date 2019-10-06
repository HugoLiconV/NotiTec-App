/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Icon, Button, Divider, TouchableOpacity} from '@shoutem/ui';
import {BACKGROUND_COLOR, LOGIN_SCREEN, ERROR_COLOR, BOOKMARKS_SCREEN, PROFILE_SCREEN} from '../constants';
import {StyleSheet, StatusBar} from 'react-native';
import GoBack from '../components/GoBack';

const Settings = props => {


  function logout() {
    props.navigation.navigate(LOGIN_SCREEN);
  }

  function navigateToBookmarks() {
    props.navigation.navigate(BOOKMARKS_SCREEN);
  }

  function navigateToProfile() {
    props.navigation.navigate(PROFILE_SCREEN);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="dark-content" />
      <GoBack
        navigation={props.navigation}
        title="Ajustes"
        style={{padding: 16}}
      />
      <TouchableOpacity onPress={navigateToBookmarks}>
        <View
          styleName="horizontal h-start v-center"
          style={{
            ...styles.menuItem,
            borderBottomColor: '#979797',
            borderBottomWidth: 1,
            marginTop: 16,
          }}>
          <Icon
            name="add-to-favorites-on"
            style={{
              ...styles.menuIcon,
              color: ERROR_COLOR,
            }}
          />
          <Text>Guardados</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToProfile}>
        <View styleName="horizontal h-start v-center" style={styles.menuItem}>
          <Icon
            name="user-profile"
            style={{...styles.menuIcon, color: '#B6DE5C'}}
          />
          <Text>Perfil</Text>
        </View>
      </TouchableOpacity>
      <Divider />
      <Button onPress={logout}>
        <Text>Cerrar Sesión</Text>
      </Button>
    </View>
  );
};
const styles = new StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  menuIcon: {
    marginRight: 8,
  },
  menuItem: {
    backgroundColor: '#FFF',
    padding: 16,
  },
});
export default Settings;
