module.exports = {
  preset: "jest-expo",
  transform: {
    "\\.(jpg|sql)$": "<rootDir>/test/fileTransformer.js"
  },
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    "uuid": require.resolve('uuid'),
  }
}
