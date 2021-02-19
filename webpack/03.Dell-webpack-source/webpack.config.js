const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const { HotModuleReplacementPlugin } = require("webpack")

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  mode: "development",
  // ? source-map 是一种映射关系，dist/main.js line96 -> src/main.js line1
  // * inline 情况下，map 文件会以 dataURL 形式写入到打包后文件中
  // * cheap 情况下，只要告诉我行信息即可，不需要告诉我列信息；另一个作用是只管业务代码，而不会去管第三方loader
  // * cheap-module 情况下，只要告诉我行信息即可，不需要告诉我列信息；但是不仅管业务代码，还会去管第三方loader
  // * eval 情况下，通过 eval 形式生成映射关系，执行效率最快，性能最好的打包方式，但是针对比较复杂的代码，eval方案提示的代码可能并不全面
  // ? development 配置方案`eval-cheap-module-source-map`；production 配置方案`false 或者 cheap-module-source-map`
  devtool: 'eval-cheap-module-source-map', // ! match pattern "^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$".
  devServer: {
    // ! 执行命令 webpack serve 的时候会启动服务器，不生成 dist 目录，而是会把打包后的内容放到内存中，提高打包速度
    contentBase: "./dist",
    port: "3031",
    open: true, // ! 自动打开浏览器
    hot: true, // ! 开启热更新，只改变样式，不移除元素；通过module.hot.accept函数指定要变更的函数
  },
  output: {
    path: path.resolve(__dirname, "./dist"), // ! 这里必须是绝对路径
    filename: "[name].js",
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
                "@babel/preset-react"
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
