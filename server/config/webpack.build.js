const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'hidden-source-map',
  entry: [
    path.join(__dirname, '../app/index.js'),
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, '../app'),
        use: [{loader: 'babel-loader',}],
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      // compress production
      compress: true,
    })
  ],
};
