module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          'https': require.resolve('https-browserify'),
          'http': require.resolve('stream-http'),
          'fs': require.resolve('react-native-fs'),
          'path': require.resolve('react-native-path'),
        },
      },
    ],
  ],
};
