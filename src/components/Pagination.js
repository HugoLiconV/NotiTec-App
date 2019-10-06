/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Icon, Title} from '@shoutem/ui';

const Pagination = ({page, onPrevious, onNext}) => {
  return (
    <View styleName="horizontal v-center space-between">
      <Icon
        name="left-arrow"
        style={{
          color: page === 1 ? '#b8b3c3' : '#3c4560',
          fontSize: 48,
        }}
        onPress={onPrevious}
      />
      <Title>{page || 0}</Title>
      <Icon name="right-arrow" style={styles.icon} onPress={onNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: '#3c4560',
    fontSize: 48,
  },
});

export default Pagination;
