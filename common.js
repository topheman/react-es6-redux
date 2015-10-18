'use strict';

function projectIsGitManaged(){
  var fs = require('fs');
  var path = require('path');
  try {
    // Query the entry
    var stats = fs.lstatSync(path.join(__dirname,'.git'));

    // Is it a directory?
    if (stats.isDirectory()) {
      return true;
    }
    return false;
  }
  catch (e) {
    return false;
  }
}

function getInfos(){
  var gitActive = projectIsGitManaged();
  var gitRev = require('git-rev-sync');
  var moment = require('moment');
  var pkg = require('./package.json');
  var infos = {
    pkg: pkg,
    today: moment(new Date()).format('DD/MM/YYYY'),
    year: new Date().toISOString().substr(0, 4),
    gitRevisionShort: gitActive ? gitRev.short() : null,
    gitRevisionLong: gitActive ? gitRev.long() : null,
    urlToCommit: null
  };
  infos.urlToCommit = gitActive ? _getUrlToCommit(pkg, infos.gitRevisionLong) : null;
  return infos;
}

/**
 * Called in default mode by webpack (will format it correctly in comments)
 * Called in formatted mode by gulp (for html comments)
 * @param {String} mode default/formatted
 * @returns {String}
 */
function getBanner(mode){
  var _ = require('lodash');
  var infos = getInfos();
  var compiled = _.template([
    '<%= pkg.name %>',
    '',
    '<%= pkg.description %>',
    '',
    '@version v<%= pkg.version %> - <%= today %>',
    '<% if(gitRevisionShort !== null) { %>@revision #<%= gitRevisionShort %><% if (urlToCommit !== null) { %> - <%= urlToCommit %><% } %><% } %>',
    '@author <%= (pkg.author && pkg.author.name) ? pkg.author.name : pkg.author %>',
    '@copyright <%= year %>(c) <%= (pkg.author && pkg.author.name) ? pkg.author.name : pkg.author %>',
    '@license <%= pkg.license %>',
    ''
  ].join(mode === 'formatted' ? '\n * ' : '\n'));
  return compiled(infos);
}

function getBannerHtml(){
  return '<!--\n * \n * ' + getBanner('formatted') + '\n-->\n';
}

function _getUrlToCommit(pkg, gitRevisionLong){
  var urlToCommit = null;
  //retrieve and reformat repo url from package.json
  if (typeof(pkg.repository) === 'string') {
    urlToCommit = pkg.repository;
  }
  else if (typeof(pkg.repository.url) === 'string') {
    urlToCommit = pkg.repository.url;
  }
  //check that there is a git repo specified in package.json & it is a github one
  if (urlToCommit !== null && /^https:\/\/github.com/.test(urlToCommit)) {
    urlToCommit = urlToCommit.replace(/.git$/, '/tree/' + gitRevisionLong);//remove the .git at the end
  }
  return urlToCommit;
}

module.exports.getInfos = getInfos;
module.exports.getBanner = getBanner;
module.exports.getBannerHtml = getBannerHtml;