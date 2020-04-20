// Karma configuration
// Generated on Wed Apr 20 2016 14:38:01 GMT-0500 (CDT)
process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = function (config) {
  config.set({
    frameworks: ["browserify", "mocha"],
    files: ["*_test.js"],
    preprocessors: {
      "*_test.js": ["browserify"],
    },
    reporters: ["progress"],
    colors: true,
    browsers: ["ChromeHeadless"],
    singleRun: true,
  });
};
