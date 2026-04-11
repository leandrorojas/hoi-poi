module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/shell-template/"],
  moduleNameMapper: {
    "\\.css$": "<rootDir>/__mocks__/styleMock.js",
  },
  moduleFileExtensions: ["js", "jsx"],
  coverageReporters: ["lcov", "text"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/index.js",
    "!src/bootstrap.js",
    "!src/**/index.js",
  ],
};
