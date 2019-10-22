import React, {useState, useEffect} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {View, Icon, ListView} from '@shoutem/ui';
import styled from 'styled-components';
import Categories from '../components/Categories';
import {
  CARRERAS,
  BACKGROUND_COLOR,
  SETTINGS_SCREEN,
  DETAILS_SCREEN,
} from '../constants';
import NewsCard from '../components/NewsCard';
import Pagination from '../components/Pagination';
import PushNotifications from '../core/PushNotifications';
import UserService from '../services/UserService';
import AnnouncementsService from '../services/AnnouncementsService';
import NewsList from '../components/NewsList';

const TAG = '[HOME]:';

const Home = props => {
  const [category, setCategory] = useState(CARRERAS[0]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [user, setUser] = useState({});

  function onSelectedCategory(item) {
    setCategory(item);
    setPage(1);
    fetchPosts(item.value, 1);
  }

  function navigateToSettings() {
    props.navigation.push(SETTINGS_SCREEN);
  }

  async function fetchPosts(career, page = 1, limit = 10) {
    if (!loading) {
      setLoading(true);
      const res = await AnnouncementsService().getAnnouncements(
        page,
        limit,
        career,
      );
      res && setData(res.rows);
      res && setTotalPages(Math.ceil(res.count / limit));
      setLoading(false);
    }
  }

  async function me() {
    const res = await UserService().me();
    setUser(res);
  }

  function onRefresh() {
    fetchPosts(user.career, page)
  }

  useEffect(() => {
    const didBlurSubscription = props.navigation.addListener(
      'didFocus',
      payload => {
        me();
      },
    );
    return () => {
      didBlurSubscription.remove();
    };
  }, []);

  useEffect(() => {
    me();
    fetchPosts(category.career, 1);
  }, []);

  function onPreviousPage() {
    if (page === 1) {
      return;
    }
    const previousPage = page - 1;
    setPage(previousPage);
    fetchPosts(category.career, previousPage);
  }

  function onNextPage() {
    if (page === totalPages) {
      return;
    }
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(category.career, nextPage);
  }

  /**
   *
   * @param careers Array of all carrers
   * @param userCarrer String User's career
   * @returns Array of career rearranged to show the user's career first
   */
  function rearrangeCareerAray(careers, userCarrer) {
    const general = {name: 'General', value: ''};
    const result = [...careers];
    if (!userCarrer) {
      return [...result, general];
    }
    const index = careers.findIndex(c => c.value === userCarrer);
    result.splice(index, 1);
    result.unshift(careers[index], general);
    return result;
  }

  return (
    <View styleName="fill-parent vertical v-center" style={styles.container}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="dark-content" />
      {user.career !== null && <PushNotifications tag={user.career} />}
      <Titlebar>
        <Avatar source={{uri: user && user.picture}} />
        <Title>Bienvenido,</Title>
        <Name>{user.name || ''}</Name>
        <Icon
          onPress={navigateToSettings}
          name="settings"
          style={{
            position: 'absolute',
            right: 20,
            top: 5,
            color: '#3c4560',
          }}
        />
      </Titlebar>
      <View style={{marginBottom: 8}}>
        <Categories
          items={rearrangeCareerAray(CARRERAS, user && user.career)}
          selectedIndex={0}
          onSelectedItem={onSelectedCategory}
        />
      </View>

      <NewsList
        navigation={props.navigation}
        onRefresh={onRefresh}
        loading={loading}
        data={data}
      />
      <Pagination
        page={page}
        onPrevious={onPreviousPage}
        onNext={onNextPage}
        totalPages={totalPages}
      />
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    padding: 16,
  },
});

const Titlebar = styled.View`
  width: 100%;
  margin-top: 16px;
  padding-left: 80px;
`;

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: #b8bece;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

export default Home;
