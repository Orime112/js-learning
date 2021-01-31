# webpack 配置学习

## 基本配置

### 配置开发服务器

```bash
yarn add webpack-dev-server -D
```

## 压缩配置

7.2.压缩 JS

```js
  optimization: {
    minimize: true,
    minimizer: [
      //压缩JS
+     new TerserPlugin({})
    ]
  },
```

7.3. 压缩 CSS

```js
  optimization: {
    minimize: true,
    minimizer: [
      //压缩CSS
+      new OptimizeCSSAssetsPlugin({}),
    ]
  },
```

7.4. 压缩图片

```js
      {
        test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
        use: [
          "file-loader",
          {
+            loader: "image-webpack-loader",
+            options: {
+              mozjpeg: {
+                progressive: true,
+                quality: 65,
+              },
+              optipng: {
+                enabled: false,
+              },
+              pngquant: {
+                quality: "65-90",
+                speed: 4,
+              },
+              gifsicle: {
+                interlaced: false,
+              },
+              webp: {
+                quality: 75,
+              }
+            }
+          }
        ]
      }
```

7.5. 清除无用的 CSS
单独提取 CSS 并清除用不到的 CSS

```js
const path = require("path");
+const MiniCssExtractPlugin = require("mini-css-extract-plugin");
+const PurgecssPlugin = require("purgecss-webpack-plugin");
module.exports = {
  module: {
    rules: [
       {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
+            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      }
    ]
  },
  plugins: [
+    new MiniCssExtractPlugin({
+      filename: "[name].css",
+    }),
+    new PurgecssPlugin({
+      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
+    })
  ]
  devServer: {},
};
```

7.6. Tree Shaking
一个模块可以有多个方法，只要其中某个方法使用到了，则整个文件都会被打到 bundle 里面去，tree shaking 就是只把用到的方法打入 bundle,没用到的方法会 uglify 阶段擦除掉
原理是利用 es6 模块的特点,只能作为模块顶层语句出现,import 的模块名只能是字符串常量
webpack 默认支持，在.babelrc 里设置 module:false 即可在 production mode 下默认开启

```js
module.exports = {
+    mode:'production',
+    devtool:false,
     module: {
        rules: [
            {
                test: /\.js/,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: "babel-loader",
                        options: {
+                            presets: [["@babel/preset-env", { "modules": false }]],
                        },
                    },
                ],
            }
     }
}
```

## 学习 loader

### 自己实现一个 loader

![20210131184637](https://cdn.jsdelivr.net/gh/Orime112/picbed/20210131184637.png)
