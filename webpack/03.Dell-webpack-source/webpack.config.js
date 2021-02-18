const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const { HotModuleReplacementPlugin } = require("webpack")

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devtool: "eval-cheap-module-source-map", // ! match pattern "^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$".
  devServer: {
    // ! 执行命令 webpack serve 的时候会启动服务器，不生成 dist 目录，而是会把打包后的内容放到内存中，提高打包速度
    contentBase: "./dist",
    port: "3031",
    open: true, // ! 自动打开浏览器
    hot: true, // ! 开启热更新，只改变样式，不移除元素
  },
  output: {
    path: path.resolve(__dirname, "./dist"), // ! 这里必须是绝对路径
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  // {
                  //   useBuiltIns: "usage", // ! 需要的才垫片进去
                  // },
                ],
              ],
              exclude: /node_modules/,
            },
          },
        ],
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"], // ! style-loader 会在幕后使用 module.hot.accept，css依赖模块热更新后，会将patch修补到style标签中
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HotModuleReplacementPlugin(),
  ],
}
