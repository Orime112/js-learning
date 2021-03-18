const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const { HotModuleReplacementPlugin, ProvidePlugin } = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
  entry: {
    main: "./src/jsx-index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"), // ! 这里必须是绝对路径
    chunkFilename: "[name].[contenthash].chunk.js", // ! 从main.js文件中间接引入的模块走这个命名规则
    filename: "[name].[contenthash].js",
    library: "root", // ! 将库以 this.root 的方式挂载到了 this 上，this.root.default.sum
    libraryTarget: "umd", // * "umd"为适配全部模块化规范，this是引入之后挂载到 this 上，和window同理
  },
  // ? alias 别名就是在 resolve 项中进行配置的，直接放个键值对就行了你敢信？注意：不能加相对路径
  resolve: { extensions: [".js", ".jsx"], alias: { "@": path.resolve("./src") } }, // * 加入resolve配置项并设置extensions数组包含'.jsx'之后，引入可以不加.jsx后缀
  externals: "lodash", // ! 不要把 lodash 打包到组件代码中去
  mode: "development",
  // mode: "production",
  // ? source-map 是一种映射关系，dist/main.js line96 -> src/main.js line1
  // * inline 情况下，map 文件会以 dataURL 形式写入到打包后文件中
  // * cheap 情况下，只要告诉我行信息即可，不需要告诉我列信息；另一个作用是只管业务代码，而不会去管第三方loader
  // * cheap-module 情况下，只要告诉我行信息即可，不需要告诉我列信息；但是不仅管业务代码，还会去管第三方loader
  // * eval 情况下，通过 eval 形式生成映射关系，执行效率最快，性能最好的打包方式，但是针对比较复杂的代码，eval方案提示的代码可能并不全面
  // ? development 配置方案`eval-cheap-module-source-map`；production 配置方案`false 或者 cheap-module-source-map`
  devtool: "eval-cheap-module-source-map", // ! match pattern "^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$".
  devServer: {
    // ! 执行命令 webpack serve 的时候会启动服务器，不生成 dist 目录，而是会把打包后的内容放到内存中，提高打包速度
    contentBase: "./dist",
    port: "3031",
    open: true, // ! 自动打开浏览器
    hot: true, // ! 开启热更新，只改变样式，不移除元素；通过module.hot.accept函数指定要变更的函数
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
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
                "@babel/preset-react",
              ],
              exclude: /node_modules/,
              plugins: ["@babel/plugin-syntax-dynamic-import"],
            },
          },
          // * 如果想要函数内this指向window而不是object，要安装并引用import-loader?this=window
        ],
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // ! 替代style-loader
        // use: ["style-loader", "css-loader"], // ! style-loader 会在幕后使用 module.hot.accept，css依赖模块热更新后，会将patch修补到style标签中
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].chunk.css",
    }),
    // * 用来声明全局变量
    new ProvidePlugin({ $: "jquery", _: "lodash" }),
  ],
  optimization: {
    usedExports: true, // * 开启 tree shaking，引入未使用的都生效
    minimizer: [new OptimizeCssAssetsWebpackPlugin({})],
    splitChunks: {
      // ? 排除分离项
      // chunks(chunk) {
      //   // exclude `my-excluded-chunk`
      //   return chunk.name !== 'my-excluded-chunk';
      // },
      chunks: "all", // ! 只要是异步加载，webpack打包的时候就会帮你把异步加载的文件单独打包生成一个文件；默认值async，只分离异步加载的模块
      minSize: 20000, // ! 引入的模块 > 30kb 才会做代码分割，通常设置 30000 即可
      minChunks: 1, // * 模块至少被引用了多少次才进行代码分割；如果填 >= 2，会生成 node-node_modules-lodash.js
      maxAsyncRequests: 30, // * 前五个符合代码分割条件的模块进行代码分割，第六个及之后就不会代码分割了
      maxInitialRequests: 30, // * 入口文件引用最多只有前三个做代码分割，超过3个就不做代码分割了
      automaticNameDelimiter: "~", // * 文件名之间以~进行分割
      // name: "test", // * 全部打包的名称
      cacheGroups: {
        // * 缓存组 -> 如果同时安装了 lodash 和 jQuery 都是在 node_modules 文件夹中，打包过程中会对defaultVendors规则进行缓存，最后一起打包
        defaultVendors: {
          // ! 这里的键名代表规则匹配到了之后被分到的哪一组，如果不指定filename，打包后文件名为 defaultVendors-node_modules_lodash_lodash_js.js
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          // filename: "vendors.js", // ? 如果加了 filename 配置，则代码分割带包后的模块包名为 vendors.js
        },
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true, // * 如果模块之间互相引用，之前已经打包过了这个模块，再次符合规则的时候就不再次分割打包了
        },
      },
    },
  },
}
