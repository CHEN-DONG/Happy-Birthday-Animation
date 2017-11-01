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
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:  path.join(__dirname, 'src', 'index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      hash : true
    })
  ],
  //devtool: 'eval-source-map'
}