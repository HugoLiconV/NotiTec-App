import HttpService from './HttpService';

function AnnouncementsService() {
  return {
    getAnnouncements: (page, limit, career = '') => {
      return HttpService().makeRequest({
        url: `/news?page=${page}&limit=${limit}&sort=-createdAt&${
          career ? '&q=' + career : ''
        }`,
        method: 'get',
      });
    },
  };
}

export default AnnouncementsService;
