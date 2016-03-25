const log = require('npmlog');
log.level = 'silly';
const fs = require('fs');
const path = require('path');
const common = require('../common');
const _ = {template: require('lodash.template')};
var template;

const OUTPUT_DIR = './build/dist';

try {
  template = fs.readFileSync(__dirname + '/README.dist.template.md', 'utf8').toString();
}
catch (e) {
  log.error('generate-dist-readme', e.message);
  process.exit(1);
}

const infos = common.getInfos();

template = _.template(template);

const compiled = template(infos);

try {
  fs.writeFileSync(path.resolve(__dirname, '..', OUTPUT_DIR, 'README.md'), compiled);
  log.info('generate-dist-readme', 'Create README.md file for gh-pages at ' + path.resolve(__dirname, '..', OUTPUT_DIR, 'README.md'));
}
catch(e) {
  log.error('generate-dist-readme', e.message);
  process.exit(1);
}
