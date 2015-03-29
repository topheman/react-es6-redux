'use strict';

import request from 'superagent';

import configuration from 'configuration';

export default {
  get(relativeUrl){
    return request.get(configuration.backendBaseUrl+relativeUrl);
  },
  getJson(relativeUrl){
    return this.get(relativeUrl).set('Accept', 'application/json');
  }
}