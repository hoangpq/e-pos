const path = require('path');
const webpack = require('webpack');

module.exports = (port) => {
  const hrm_path = `http://localhost:${port}/__webpack_hmr`;
  return {
    // devtool: 'eval',
    devtool: 'cheap-module-eval-source-map',
    entry: [
      `webpack-hot-middleware/client?path=${hrm_path}`,
      path.join(__dirname, '../app/index.js'),
    ],
    output: {
      path: path.join(__dirname, '../dist'),
      filename: 'bundle.js',
      publicPath: `http://localhost:${port}/static/`,
    },
    module: {
      rules: [
        {
          test: /\.js/,
          exclude: /(node_modules|bower_components)/,
          include: path.join(__dirname, '../app'),
          use: [
            {
              loader: 'react-hot-loader',
              options: {},
            },
            {
              loader: 'babel-loader',
            }
          ],
        },
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  }
};
