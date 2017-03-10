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
+ [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
+ [babili-webpack-plugin](https://github.com/webpack-contrib/babili-webpack-plugin)
+ [cross-env](https://github.com/kentcdodds/cross-env)
+ [webpack-merge](https://github.com/survivejs/webpack-merge)

### Compress
