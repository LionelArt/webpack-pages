const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 通用路径
const PATHS = {
	src: path.join(__dirname, 'src'),
	public: path.join(__dirname, 'public')
};
// Sass提取配置
const extractSass = new ExtractTextPlugin({
	filename: 'css/[name].[contenthash:16].css',
	disable: process.env.npm_lifecycle_event === 'development'
});

// 提取入口文件、公共模块、模板文件
let getEntry = (plugins) => {
	let pagePath = path.resolve(PATHS.src, 'page'),
		pageJs = glob.sync(pagePath + '/**/*.{js,jsx}'),
		entries = {};

	// 提取入口文件
	pageJs.map(filePath => {
		let basename = path.basename(filePath, '.js');

		entries[basename] = filePath;
	});

	// 提取公共模块
	let chunks = Object.keys(entries);
	plugins.push(
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			chunks: chunks,
			minChunks: chunks.length
		})
	);

	// 提取模板文件
	let viewPath = path.resolve(PATHS.src, 'assets/view'),
		viewHtml = glob.sync(viewPath + '/*.html');
	viewHtml.map(filePath => {
		let filename = path.basename(filePath, '.html');
		let conf = {
			filename: filename + '.html',
			template: path.join(viewPath, filename + '.html'),
			inject: 'body', // js插入位置：'head'|'body'
			chunks: ['vendors', filename],
			// 压缩HTML文件
			minify: {
				removeComments: true, // 移除HTML中的注释
				collapseWhitespace: true // 删除空白符与换行符
			}
		};

		plugins.push(new HtmlWebpackPlugin(conf));
	});

	return entries;
};

module.exports = () => {
	let plugins = [extractSass];
	let entry = getEntry(plugins);

	return {
		// 口文件
		entry: entry,
		output: {
			// 打包存放目录
			path: PATHS.public,
			publicPath: '/',
			// 打包输出文件名
			filename: 'js/[name].js',
			chunkFilename: '[id].chunk.js'
		},

		// Loaders
		module: {
			rules: [{
				test: /\.json$/,
				use: [{
					loader: 'json-loader'
				}]
			}, {
				test: /\.(png|jpg|gif)$/,
				use: [{
					loader: 'url-loader?limit=8192&name=img/[name].[ext]?[hash:16]'
				}]
			},{
				test: /\.css$/,
				use: [{
					loader: 'style-loader' // Creates style nodes from JS scripts
				}, {
					loader: 'css-loader' // Translates CSS into CommonJS
				}]
			}, {
				test: /\.scss$/,
				loader: extractSass.extract({
					loader: [{
						loader: 'css-loader' // Translates CSS into CommonJS
					}, {
						loader: 'sass-loader' // Compiles Sass to CSS
					}],
					fallback: 'style-loader' // Use style-loader in development
				})
			}]
		},

		plugins: plugins,

		// webpack-dev-server是一个轻量的node.js express服务器
		// webpack-dev-server的作用是用来伺服资源文件，不能替代后端服务器
		devServer: {
			// 本地服务器所加载页面所在目录
			contentBase: './public',
			// 实时刷新
			inline: true,
			// 所有跳转指向index.html
			historyApiFallback: true,
			// 监听端口
			port: 8888,
			stats: {
				colors: true
			}
		}
	}
};