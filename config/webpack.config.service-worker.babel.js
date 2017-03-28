import path from 'path'

import CompressionPlugin from 'compression-webpack-plugin'
import webpack from 'webpack'

import definePlugin from './define-plugin'

const destinationPath = path.resolve(__dirname, '../dist/client')
const basePath = path.resolve(__dirname, '../client')

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin(definePlugin(process)),
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$/,
    threshold: 0,
    minRatio: 0.8
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
    bundle: path.join(basePath, './src/service-worker.js')
  },
  output: {
    path: destinationPath,
    filename: 'service-worker.js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins
}
