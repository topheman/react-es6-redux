import httpService from './httpService.js';

export default {
  searchUser(userName) {
    return httpService.getInstance().get('/search/users', {q: userName});
  },
  getUser(userName) {
    return httpService.getInstance().get('/users/' + userName);
  },
  getUserRepos(userName, options = {per_page: 30, page: 1, sort: 'updated'}) {
    return httpService.getInstance().get('/users/' + userName + '/repos', {
      page: options.page,
      per_page: options.per_page,
      sort: options.sort
    });
  }
};
