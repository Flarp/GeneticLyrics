const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const entry = {
  index: "./src/main.jsx"
}

module.exports = {
  entry: entry,
  output: {
	  filename: "[name].js",
	  path: __dirname + "/dist"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /.jsx?$/,
		exclude: /node_modules/,
		include: path.resolve(__dirname, "src"),
		use: ["babel-loader"]
      },
    ],
  },
  plugins: [new CopyWebpackPlugin({
	patterns: [{
		from: path.resolve(__dirname, 'src/index.html'),
		to: path.resolve(__dirname, 'dist')
	}]
  })]
}
