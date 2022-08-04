module.exports = {
  testEnvironment: "jsdom",
  snapshotSerializers: ["@emotion/jest/serializer"],
  setupFilesAfterEnv: [
    "<rootDir>/jestDomSetup.js",
    "<rootDir>/setupGlobalFetch.js",
    "<rootDir>/setupJestEmotion.js",
  ],
};
