import fs from  'fs'
import * as utils from './database/database.js'
import {migrations, queries} from './assets/_assets'
require.extensions['.sql'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};



console.log('hi', queries)
