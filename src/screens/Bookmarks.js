import React, {useState, useEffect} from 'react';
import {Text, View} from '@shoutem/ui';
import {BACKGROUND_COLOR} from '../constants';
import {StyleSheet, StatusBar} from 'react-native';
import GoBack from '../components/GoBack';
import {getBookmarks} from '../services/BookmarksService';
import Pagination from '../components/Pagination';
import NewsList from '../components/NewsList';

const Bookmarks = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const didBlurSubscription = props.navigation.addListener('didFocus', () => {
      fetchBookmarks();
    });
    return () => {
      didBlurSubscription.remove();
    };
  }, []);

  async function fetchBookmarks(page = 1, limit = 10) {
    if (!loading) {
      setLoading(true);
      const res = await getBookmarks(page, limit);
      res && setData(res.rows);
      res && setTotalPages(Math.ceil(res.count / limit));
      setLoading(false);
    }
  }
  function onPreviousPage() {
    if (page === 1) {
      return;
    }
    const previousPage = page - 1;
    setPage(previousPage);
    fetchBookmarks(previousPage);
  }

  function onNextPage() {
    if (page === totalPages) {
      return;
    }
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBookmarks(nextPage);
  }

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="dark-content" />
      <GoBack title="Guardados" navigation={props.navigation} />
      <NewsList
        data={(data && data.map(bookmark => bookmark.news)) || []}
        loading={loading}
        navigation={props.navigation}
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
    flex: 1,
  },
});
export default Bookmarks;
