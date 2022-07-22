const path = require('path');
const webpack  = require('webpack');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const smp  = new SpeedMeasurePlugin({
  disable: !(process.env.MEASURE === 'true')
});

module.exports = {
  configureWebpack: smp.wrap({
    performance: {
      hints:false
  },
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
      new BundleAnalyzerPlugin({
        AnalyserNode: process.env.MEASURE === 'true' ? 'server' : 'disabled'
      }),
      new webpack.DllReferencePlugin({
        context:__dirname,
        manifest: path.resolve(__dirname, './dll/vue-manifest.json')
      }),
      new AddAssetHtmlWebpackPlugin(
        {
          filepath: path.resolve(__dirname, '..../dist/vue.dll.js'),
        }
      ),
      
    ]
  })
}