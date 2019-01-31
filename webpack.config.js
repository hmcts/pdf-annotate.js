let webpack = require('webpack');
let uglifyEs = require('uglify-es');
let fileName = 'pdf-annotate';
let plugins = [];
let CopyWebpackPlugin = require('copy-webpack-plugin');

if (process.env.MINIFY) {
  fileName += '.min'
  plugins.push(
    new CopyWebpackPlugin([
      {
        from: 'assets/',
        to: 'dist/js/[name].min.[ext]',
        toType: 'template',
        transform: function(fileContent) {
          return uglifyEs.minify(fileContent.toString()).code.toString()
        }
      }
    ]),
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = {
  devtool: 'source-map',
  plugins: plugins,
  entry: './index.js',
  output: {
    filename: 'dist/js/' + fileName + '.js',
    library: 'PDFAnnotate',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['add-module-exports']
        }
      }
    ]
  }
};
