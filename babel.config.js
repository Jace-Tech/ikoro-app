module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', "module:metro-react-native-babel-preset"],
    plugins: [
      // Required for expo-router
      'expo-router/babel',
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            "@components": "./components",
            "@assets": "./assets",
            "@apis": "./apis",
          }
        }
      ],
      "react-native-reanimated/plugin"
    ]
  };
};