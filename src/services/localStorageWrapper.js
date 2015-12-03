import lscache from 'lscache';

const cacheLimit = 2;// 2 minutes

export default{
  get: lscache.get,
  set: (key, value) => {
    return lscache.set(key, value, cacheLimit);
  },
  // extend of cacheLimit mins
  extend: function extend(key) {
    const value = lscache.get(key);
    if (typeof value !== 'undefined') {
      this.set(key, value);
    }
  }
};
