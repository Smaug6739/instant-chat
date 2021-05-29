"use strict";

const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
	mode: "development",
	entry: ["./app.js"],
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: "vue-loader",
			},
			{
				test: /\.css$/,
				use: ["vue-style-loader", "css-loader"]
			},
			{
				test: /\.scss$/,
				use: [
					"vue-style-loader",
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							includePaths: ["./node_modules"]
						}
					}
				]
			}
		]
	},
	plugins: [new VueLoaderPlugin()]
};