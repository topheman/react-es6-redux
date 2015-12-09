/**
 * This is the singleton of the http service, where you can get the github client (which decorates the response from the github API)
 * In your app you may not want such a custom client, you should definitly take a look at
 * https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/helpers/ApiClient.js
 */

let instance = null;

class HttpService {
  constructor() {
    this.service = require('./httpService/http');
  }
  get(relativeUrl, params) {
    return this.service.get(relativeUrl, params);
  }
}

export default {
  getInstance() {
    if (instance === null) {
      instance = new HttpService();
      // in production, the backend is on a heroku VM,
      // a simple ping will get it awake before the user really uses the github api
      // it will avoid 6secs startup (for the first user)
      if (process.env.NODE_ENV === 'production') {
        instance.get('/?format=json');
      }
    }
    return instance;
  }
};
