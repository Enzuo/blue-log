
module.exports = {
  process(src, filename, config, options) {
    // return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
    return { code : 'module.exports = ' + JSON.stringify(src) + ';' }
  },
};
