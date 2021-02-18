const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackConfig = require("./webpack.config")

const compiler = webpack(webpackConfig)

const app = express()

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
)

app.listen(3030, () => console.log("Server is running at http://localhost:3030"))
