import React from 'react';
import {ListView} from '@shoutem/ui';
import NewsCard from './NewsCard';
import {DETAILS_SCREEN, BACKGROUND_COLOR} from '../constants';

const NewsList = ({navigation, data, loading, onRefresh}) => {
  function navigateToDetails(announcement) {
    navigation.navigate(DETAILS_SCREEN, {
      announcement,
    });
  }

  function renderRow(announcement) {
    if (!announcement) {
      return null;
    }
    return (
      <NewsCard
        announcement={announcement}
        onItemPress={() => {
          navigateToDetails(announcement);
        }}
      />
    );
  }

  return (
    <ListView
      data={data}
      onRefresh={onRefresh}
      renderRow={renderRow}
      loading={loading}
      style={{
        listContent: {
          backgroundColor: BACKGROUND_COLOR,
        },
      }}
    />
  );
};

export default NewsList;
