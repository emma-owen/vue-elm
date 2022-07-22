const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const smp  = new SpeedMeasurePlugin({});
module.exports = {
  configureWebpack: smp.wrap({
    resolve: {
      alias: {
          'src': path.resolve(__dirname, './src'),
          'assets': path.resolve(__dirname, './src/assets'),
          'components': path.resolve(__dirname, './src/components')
      }
    },
    module:{
      rules:[{
        test:/\.js$/,
        exclude: /node_modules/,
        use:[{
          loader: 'thread-loader',
          options:{
            worker:2
          },
        }],
      }],
    },
    plugins:[
      new BundleAnalyzerPlugin(),
    ]
  })
}