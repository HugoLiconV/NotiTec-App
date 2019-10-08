import React, {useState, useEffect} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {View, Icon, ListView} from '@shoutem/ui';
import styled from 'styled-components';
import Categories from '../components/Categories';
import {CARRERAS, BACKGROUND_COLOR, SETTINGS_SCREEN, DETAILS_SCREEN} from '../constants';
import NewsCard from '../components/NewsCard';
import axios from 'axios';
import Pagination from '../components/Pagination';
import PushNotifications from '../core/PushNotifications';

const TAG = '[HOME]:';

const Home = props => {
  const [category, setCategory] = useState(CARRERAS[0]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  function onSelectedCategory(item) {
    setCategory(item);
    setPage(1);
    fetchPosts(item.userId, 1);
  }

  function navigateToSettings() {
    props.navigation.push(SETTINGS_SCREEN);
  }

  function onItemPress() {
    navigateToDetails();
  }

  function navigateToDetails() {
    props.navigation.navigate(DETAILS_SCREEN)
  }

  function renderRow(post) {
    if (!post) {
      return null;
    }
    return <NewsCard post={post} onItemPress={onItemPress} />;
  }

  async function fetchPosts(userId, page = 1, limit = 5) {
    if (!loading) {
      setLoading(true);
      const res = await axios(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_page=${page}&_limit=${limit}`,
      ).catch(e => {
        console.log(e);
        setLoading(false);
      });
      data && setData(res.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!loading) {
      fetchPosts(category.userId, 1);
    }
  }, []);

  function onPreviousPage() {
    if (page === 1) {
      return;
    }
    const previousPage = page - 1;
    setPage(previousPage);
    fetchPosts(category.userId, previousPage);
  }

  function onNextPage() {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(category.userId, nextPage);
  }

  return (
    <View styleName="fill-parent vertical v-center" style={styles.container}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="dark-content" />
      <PushNotifications />
      <Titlebar>
        <Avatar source={require('../assets/avatar.jpg')} />
        <Title>Bienvenido,</Title>
        <Name>Aman</Name>
        <Icon
          onPress={navigateToSettings}
          name="settings"
          style={{position: 'absolute', right: 20, top: 5, color: '#3c4560'}}
        />
      </Titlebar>
      <View style={{marginBottom: 8}}>
        <Categories
          items={CARRERAS}
          selectedIndex={0}
          onSelectedItem={onSelectedCategory}
        />
      </View>
      <ListView
        data={data}
        renderRow={renderRow}
        loading={loading}
        style={{
          listContent: {
            backgroundColor: BACKGROUND_COLOR,
          },
        }}
      />
      <Pagination page={page} onPrevious={onPreviousPage} onNext={onNextPage} />
      {/* {restaurants.map(restaurant => <NewsCard restaurant={restaurant} />)} */}
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
