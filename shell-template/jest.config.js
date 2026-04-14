module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  setupFiles: ["./jest.setup.js"],
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "\\.css$": "<rootDir>/__mocks__/styleMock.js",
    "^hoiPoi/(.*)$": "<rootDir>/__mocks__/hoiPoi/$1.js",
  },
};
