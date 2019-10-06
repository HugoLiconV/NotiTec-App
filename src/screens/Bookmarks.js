import React from 'react';
import {Text, View} from '@shoutem/ui';
import {BACKGROUND_COLOR} from '../constants';
import {StyleSheet, StatusBar} from 'react-native';
import GoBack from '../components/GoBack';

const Bookmarks = props => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="dark-content" />
      <GoBack title="Guardados" navigation={props.navigation} />
      <Text>Bookmarks</Text>
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
export default Bookmarks;
