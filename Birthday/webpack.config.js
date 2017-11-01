var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src','scripts','main.js'),
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
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, {loader: "css-loader"}]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:  path.join(__dirname, 'src', 'index.html')
    })
  ],
  devtool: 'eval-source-map'
}