const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const uglifyEs = require('uglify-es');

let fileName = 'pdf-annotate';
const plugins = [];

if (process.env.MINIFY) {
  fileName += '.min'
  plugins.push(
    new CopyWebpackPlugin([
      {
        from: 'node_modules/pdfjs-dist/web/pdf_viewer.js',
        to: 'dist/js/pdf_viewer.min.js',
        transform: function(fileContent) {
          return uglifyEs.minify(fileContent.toString()).code.toString()
        }
      },
      {
        from: 'src/pdf.combined.js',
        to: 'dist/js/pdf.combined.min.js',
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
