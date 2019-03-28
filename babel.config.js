module.exports = function babel(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-flow'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
