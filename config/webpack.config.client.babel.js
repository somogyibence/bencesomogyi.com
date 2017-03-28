import path from 'path'

import autoprefixer from 'autoprefixer'
import CompressionPlugin from 'compression-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

import definePlugin from './define-plugin'

const destinationPath = path.resolve(__dirname, '../dist/client')
const basePath = path.resolve(__dirname, '../client')

const port = process.env.PORT || 8080
const devServer = {
  port,
  historyApiFallback: true
}

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin(definePlugin(process)),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: __dirname,
      postcss: [
        autoprefixer({
          browsers: ['last 4 versions']
        })
      ]
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: [
      'vendor',
      'polyfill'
    ],
    minChunks: Infinity,
    filename: 'js/[name].bundle.[chunkhash].js'
  }),
  new ExtractTextPlugin({
    filename: 'css/app.[chunkhash].css',
    allChunks: true
  }),
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /(\.js$)|(\.css$)/,
    threshold: 0,
    minRatio: 0.8
  }),
  new CopyWebpackPlugin([{
    from: path.join(basePath, './assets/img'),
    to: './img'
  }]),
  new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    minify: {
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeStyleLinkTypeAttributes: true,
      collapseWhitespace: true,
      keepClosingSlash: true,
      minifyURLs: true
    },
    inject: true
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    minimize: true
  }))
}

export default {
  entry: {
    bundle: path.join(basePath, './src/js/main.js'),
    polyfill: [
      'babel-polyfill'
    ],
    vendor: [
      'debug',
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router-redux',
      'react-router'
    ]
  },
  output: {
    path: destinationPath,
    filename: 'js/bundle.[chunkhash].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory',
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract({
        loader: [
          'css-loader?sourceMap',
          'less-loader?sourceMap',
          'postcss-loader?sourceMap'
        ]
      }),
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins,
  devServer
}
