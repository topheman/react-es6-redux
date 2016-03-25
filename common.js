'use strict';
function getRootDir() {
  return __dirname;
}

function getInfos() {
  const gitActive = projectIsGitManaged();
  const gitRev = require('git-rev-sync');
  const moment = require('moment');
  const pkg = require('./package.json');
  const infos = {
    pkg: pkg,
    today: moment(new Date()).format('DD/MM/YYYY'),
    year: new Date().toISOString().substr(0, 4),
    gitRevisionShort: gitActive ? gitRev.short() : null,
    gitRevisionLong: gitActive ? gitRev.long() : null,
    author: (pkg.author && pkg.author.name) ? pkg.author.name : (pkg.author || null),
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
function getBanner(mode) {
  const infos = getInfos();
  const compiled = [
    infos.pkg.name,
    '',
    infos.pkg.description,
    '',
    `@version v${infos.pkg.version} - ${infos.today}`,
    (infos.gitRevisionShort !== null ? `@revision #${infos.gitRevisionShort}` : '') + (infos.urlToCommit !== null ? ` - ${infos.urlToCommit}` : ''),
    (infos.author !== null ? `@author ${infos.author}` : ''),
    `@copyright ${infos.year}(c)` + (infos.author !== null ? ` ${infos.author}` : ''),
    (infos.pkg.license ? `@license ${infos.pkg.license}` : ''),
    ''
  ].join(mode === 'formatted' ? '\n * ' : '\n');
  return compiled;
}

function getBannerHtml() {
  return '<!--\n * \n * ' + getBanner('formatted') + '\n-->\n';
}

function projectIsGitManaged() {
  const fs = require('fs');
  const path = require('path');
  try {
    // Query the entry
    const stats = fs.lstatSync(path.join(__dirname,'.git'));

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

function _getUrlToCommit(pkg, gitRevisionLong){
  let urlToCommit = null;
  // if no repository return null
  if (typeof pkg.repository === 'undefined') {
    return urlToCommit;
  }
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

module.exports.getRootDir = getRootDir;
module.exports.getInfos = getInfos;
module.exports.getBanner = getBanner;
module.exports.getBannerHtml = getBannerHtml;
