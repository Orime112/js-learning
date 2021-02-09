const path = require('path')
module.exports = {
	context: process.cwd(),
	entry: './src/index.js',
	output:{
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module:{},
	plugins: [],
	devServer:{
		contentBase: path.resolve(__dirname, 'dist'),
		host: 'localhost',
		compress: true,
		port: 8080
	}
}
