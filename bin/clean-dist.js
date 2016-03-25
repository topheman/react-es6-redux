const log = require('npmlog');
log.level = 'silly';
const common = require('../common');

const ROOT_DIR = common.getRootDir();

/** run */

log.info('clean-dist', `Cleaning ...`);
const deleted = require('del').sync([
  ROOT_DIR + '/build/dist/*',
  ROOT_DIR + '/build/dist/**/*',
  ROOT_DIR + '/build/dist/!.git/**/*'
]);
deleted.forEach(function(e){
  console.log(e);
});
