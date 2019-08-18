// For info about this file refer to webpack and webpack-hot-middleware documentation
// For info on how we're generating bundles with hashed filenames for cache busting: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.w99i89nsz
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify('production'),
	__DEV__: false
};

module.exports = {
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json']
	},
	devtool: 'source-map',
	entry: [
		'@babel/polyfill',
		path.resolve(__dirname, 'src')
	],
	target: 'web',
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].[chunkhash].js'
	},
	/* serve: {
		port: 3300,
		content: './dist',
	}, */
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				use: ['babel-loader']
			},
			{
				test: /\.eot(\?v=\d+.\d+.\d+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							mimetype: 'application/font-woff',
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							mimetype: 'application/octet-stream',
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							mimetype: 'image/svg+xml',
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|ico)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /(\.css|\.scss|\.sass)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					}, {
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								cssnano,
								autoprefixer,
							],
							sourceMap: true
						}
					}, {
						loader: 'sass-loader',
						options: {
							includePaths: [path.resolve(__dirname, 'src', 'stylesheets', 'scss')],
							sourceMap: true
						}
					}
				]
			}
		]
	},

	plugins: [
		// Hash the files using MD5 so that their names change when the content changes.
		new WebpackMd5Hash(),

		// Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
		new webpack.DefinePlugin(GLOBALS),

		// Generate an external css file with a hash in the filename
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),

		// Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
		new HtmlWebpackPlugin({
			template: 'src/index.ejs',
			// favicon: 'src/favicon.ico',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true
		}),
		new WebpackPwaManifest({
			name: 'Redux React Movies',
			short_name: 'Movies',
			description: 'My awesome Progressive Movie Web App!',
			background_color: '#5f241e',
			theme_color: '#5f241e',
			crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
			ios: {
				'apple-mobile-web-app-title': 'RRMovies',
				'apple-mobile-web-app-status-bar-style': 'black',
			},
			icons: [
				{
					src: path.resolve('src/img/icons/icon.png'),
					sizes: [72, 96, 128, 192, 256, 384, 512],
				},
			],
		}),
	]
};
