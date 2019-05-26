var path = require('path');
var webpack = require('webpack');
var TerserPlugin = require('terser-webpack-plugin');

function generateConfig(name) {
  var uglify = name.indexOf('min') > -1;
  var config = {
    entry: './index.js',
    output: {
      path: path.join(__dirname, 'dist/'),
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      library: 'diapi',
      libraryTarget: 'umd'
    },
    node: {
      process: false
    },
    devtool: 'source-map',
    mode: 'production',
    module: {
      rules: [
        {
          test: /(\.js)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
          ]
        }
      ]
    }
  };

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ];

  if (uglify) {
    config.optimization = {
      minimizer: [
        // we specify a custom UglifyJsPlugin here to get source maps in production
        new TerserPlugin({
          cache: true,
          parallel: true,
          terserOptions: {
            compress: false,
            ecma: 6,
            mangle: true
          },
          sourceMap: true
        })
      ]
    };
  }

  return config;
}

module.exports = [generateConfig('diapi'), generateConfig('diapi.min')];
