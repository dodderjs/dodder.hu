/* eslint-disable import/no-extraneous-dependencies */
const config = {
	babelrc: false,
	presets: ['@babel/preset-env', '@babel/preset-react'],
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		'react-hot-loader/babel',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-transform-runtime'
	]
};
module.exports = require('babel-jest').createTransformer(config);
