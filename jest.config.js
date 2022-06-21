module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "<rootDir>/jestDomSetup.js",
    "<rootDir>/setupGlobalFetch.js",
  ],
};
