import React, {useState} from 'react';
import {Text, View, Lightbox, Image, Title, Icon, Spinner} from '@shoutem/ui';
import {BACKGROUND_COLOR} from '../constants';
import {StyleSheet, StatusBar, ScrollView} from 'react-native';
import GoBack from '../components/GoBack';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {
  getBookmarkByNewsId,
  toggleBookmark,
} from '../services/BookmarksService';
import {useAsync} from 'react-async';
import {NotificationService} from '../services/NotificationService';

const Details = ({navigation}) => {
  const announcement = navigation.getParam('announcement');
  const {isPending: isGetBookmarkPending} = useAsync({
    promiseFn: getBookmarkByNewsId,
    onResolve: onResolve,
    id: announcement.id,
  });
  const {run: runToggleBookmark} = useAsync({
    deferFn: toggleBookmark,
    onReject: onReject,
  });

  const [isBookmarked, setIsBookmarked] = useState(false);

  function onResolve(response) {
    setIsBookmarked(!!(response && response.rows && response.rows[0]) || false);
  }

  function onReject(e) {
    NotificationService().showError(
      `No se pudo ${
        isBookmarked ? 'eliminar de' : 'agregar a'
      } favoritos. Vuelve a intentarlo`,
    );
    setIsBookmarked(isBookmarked);
  }

  function onBookmarkPress() {
    const nextState = !isBookmarked;
    runToggleBookmark({
      newsId: announcement.id,
    });
    setIsBookmarked(nextState);
  }

  if (isGetBookmarkPending) {
    return <Spinner />;
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="dark-content" />
      {announcement.image && (
        <Lightbox>
          <Image
            style={{height: 300}}
            source={{
              uri: announcement.image,
            }}
          />
        </Lightbox>
      )}
      <View style={{...styles.container, padding: 16}}>
        <View style={styles.row}>
          <GoBack navigation={navigation} />
          <Title>{announcement.title}</Title>
        </View>
        <View style={styles.rowSpaceBetween}>
          <DateCaption>{dayjs(announcement.createdAt).fromNow()}</DateCaption>
          <Icon
            onPress={onBookmarkPress}
            name={isBookmarked ? 'add-to-favorites-on' : 'add-to-favorites-off'}
          />
        </View>
        <Text>{announcement.content}</Text>
      </View>
    </ScrollView>
  );
};

const styles = new StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rowSpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
});

const DateCaption = styled.Text`
  color: #b8b3c3;
  font-size: 15px;
  text-align: left;
  font-weight: 600;
  margin-top: 4px;
`;
export default Details;
