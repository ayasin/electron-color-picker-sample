var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'electron',
  context: path.join(__dirname, 'screens'),
  entry: {
    first: './first.window.entry.js',
    second: './second.window.entry.js'
  },

  plugins: [
    new CopyWebpackPlugin(
      [ {'from': path.join(__dirname, 'screens')} ],
      { ignore: ['*.js', '*.jsx', '*.sass', '*.less'] }
    )
  ],

  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'app', 'screens')
  },

  module: {
    loaders: [
      {
        test: /\.jsx$|\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
