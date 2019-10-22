import HttpService from './HttpService';

export function getBookmarks(page, limit) {
  return HttpService().makeRequest({
    url: `/bookmarks?page=${page}&limit=${limit}&sort=-createdAt`,
  });
}
export function toggleBookmark(args) {
  console.log('TCL: toggleBookmark -> params', args);
  const deferFnParams = (args && args[0]) || {};
  return HttpService().makeRequest({
    url: '/bookmarks',
    method: 'post',
    data: {
      news: deferFnParams.newsId,
    },
  });
}
export function removeBookmark({bookmarId}) {
  return HttpService().makeRequest({
    url: `/bookmarks/${bookmarId}`,
    method: 'delete',
  });
}

export function getBookmarkByNewsId({id}) {
  return HttpService().makeRequest({
    url: `/bookmarks?news_id=${id}&fields=-news,-user`,
  });
}
