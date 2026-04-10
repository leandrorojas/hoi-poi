module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  setupFiles: ["./jest.setup.js"],
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "^hoiPoi/(.*)$": "<rootDir>/__mocks__/hoiPoi/$1.js",
  },
};
