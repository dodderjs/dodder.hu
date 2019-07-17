const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const cssnano = require('cssnano');
const path = require('path');

module.exports = {
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
	entry: [
		'@babel/polyfill',
		'react-hot-loader/patch',
		path.resolve(__dirname, 'src'),
	],
	target: 'web',
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	devServer: {
		inline: true,
		contentBase: './dist',
		port: process.env.PORT || 3000,
		hot: true,
		historyApiFallback: true
	},
	/* serve: {
		port: 3300,
		content: './dist',
	}, */
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /(node_modules)/,
			use: ['babel-loader']
		},
		{
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/font-woff',
					},
				},
			],
		},
		{
			test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/octet-stream',
					},
				},
			],
		},
		{
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'image/svg+xml',
					},
				},
			],
		},
		{
			test: /\.(jpe?g|png|gif|ico)$/i,
			use: [
				{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
					},
				},
			],
		},
		{
			test: /\.scss/,
			use: ['style-loader', 'css-loader', 'postcss-loader', {
				loader: 'sass-loader',
				options: {
					includePaths: [path.resolve(__dirname, 'src', 'stylesheets', 'scss')],
					sourceMap: true,
				},
			}],
		}],
	},
	plugins: [
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.optimize\.css$/g,
			cssProcessor: cssnano,
			cssProcessorPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }],
			},
			canPrint: true,
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.ejs',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
			},
			inject: true,
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
	],
};
