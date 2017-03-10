# webpack-pages
基于webpack2构建前端多页面站点

### Plugins
+ [webpack.optimize.CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/#components/sidebar/sidebar.jsx)

> CommonsChunkPlugin用于提取代码中的公共模块，然后将公共模块打包为一个独立文件。

```javascript
new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors',
    chunks: chunks,
    minChunks: chunks.length
})
```
+ [glob](https://github.com/isaacs/node-glob)

> node-glob用来匹配对应规则的文件列表(使用minimatch库进行匹配)。  
> glob.sync同步获取文件列表。

```javascript
let pagePath = path.resolve(PATHS.src, 'page'),
    pageJs = glob.sync(pagePath + '/**/*.{js,jsx}'),
    entries = {};

pageJs.map(filePath => {
    let basename = path.basename(filePath, '.js');

    entries[basename] = filePath;
});

// pagePath为项目存放入口文件的根目录
// entries最终输出为一个(按模块名称进行索引的)入口文件路径对象
```
+ [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)

>extract-text-webpack-plugin可以将模块中所有 require('style.css') | import 'style.css' 抽离成一个单独的css文件。

```javascript
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: 'css/[name].[contenthash:16].css',
    disable: TARGET === 'development'
});

module: {
    rules: [
        {
            test: /\.scss$/,
            loader: extractSass.extract({
                loader: [{
                    loader: 'css-loader?minimize' // minimize参数可以开启压缩输出最小的css
                }, {
                    loader: 'sass-loader' // Compiles Sass to CSS
                }],
                fallback: 'style-loader' // development下css采用style内联
            })
        }
    ]
}
```
+ [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

>html-webpack-plugin用来简化创建服务于webpack bundle的HTML文件。  
>它可以配置输出的HTML名称、模板路径、按模块添加JS、压缩HTML等参数。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

new HtmlWebpackPlugin({
    filename: filename + '.html',
    template: path.join(viewPath, filename + '.html'),
    inject: 'body', // js插入位置
    chunks: ['vendors', filename],
    // 压缩HTML文件
    minify: {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true // 删除空白符与换行符
    }
});
```
+ [babili-webpack-plugin](https://github.com/webpack-contrib/babili-webpack-plugin)

>webpack2原生支持ES6+，不需要再额外引入babel，因此单独引用了一个支持ES6+的压缩库babili-webpack-plugin(传统的webpack.optimize.UglifyJsPlugin不支持ES6+)。

```javascript
const BabiliPlugin = require("babili-webpack-plugin");

new BabiliPlugin();
```
+ [cross-env](https://github.com/kentcdodds/cross-env)

>cross-env可以解决跨平台下NODE_ENV=development(windows不支持)的设置方式。

```json
"scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server",
    "clean": "rm -rf public/",
    "production": "cross-env NODE_ENV=production npm run clean && webpack"
}
```
+ [webpack-merge](https://github.com/survivejs/webpack-merge)

>webpack-merge提供了一个合并函数，用于生成最终的配置对象。  
>如果包含函数，webpack-merge将执行它们，并通过算法运行结果，然后再函数中再次包装返回的值。
