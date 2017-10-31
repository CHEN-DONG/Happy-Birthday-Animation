var path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src', 'main.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  }, 
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      }]
    }]
  },
  devtool: '#eval-source-map'
}