import React from 'react';
import {View, Icon, Heading} from '@shoutem/ui';
import {StyleSheet} from 'react-native';

const GoBack = ({navigation, title = '', style = {}}) => {
  function popScreen() {
    navigation.goBack();
  }
  return (
    <View styleName="horizontal h-start v-center" style={style}>
      <Icon name="back" style={styles.barIcon} onPress={popScreen} />
      <Heading>{title}</Heading>
    </View>
  );
};

const styles = new StyleSheet.create({
  barIcon: {
    color: '#3c4560',
    fontSize: 32,
    marginRight: 16,
  },
});

export default GoBack;
