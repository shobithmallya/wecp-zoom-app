const webpack = require('webpack');
const { override, addWebpackPlugin, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    "process/browser": "process/browser.js",
    crypto: "crypto-browserify"
  }),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
  ),
  (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify"),
      "url": require.resolve("url"),
      "vm": require.resolve("vm-browserify"),
      "process": require.resolve("process/browser.js"),
      "zlib": require.resolve("browserify-zlib"),
      "path": require.resolve("path-browserify"),
    };
    return config;
  },
  (config) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /node:crypto/,
        require.resolve('crypto-browserify')
      )
    );
    return config;
  }
);
