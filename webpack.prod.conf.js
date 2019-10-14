const path = require(("path"))
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const postcss = require('./postcss.config');

module.exports = {
	// 入口文件配置项
	entry: {
		app: [path.resolve(__dirname,'src/index.js')] // path.resolve和path.join 都是合并路径的 node的模块
	},
	// 输出文件配置项目
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[chunkhash].js', // 出口配置 filename: 'js/[name].[hash].js' 改为 filename: 'js/[name].[chunkhash].js'， 开发环境设置为 hash 是因为这个和 webpack-dev-server 不兼容
		chunkFilename: 'js/[name].[chunkhash].js',
		publicPath: ""
	},
	// 开发工具
	devtool: 'cheap-module-source-map', // 原始源代码（仅限行）
	// 生产环境
	mode: "production",
	// 加载loader配置项
	module: {
		rules:[
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							plugins: postcss.plugins,
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,	
					{
						loader: 'css-loader'
					},{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							plugins:postcss.plugins,
                			parser: 'postcss-scss',
						}
					},{
			            loader: 'sass-loader', 
			            options: { sourceMap: true }
			        }
			    ],
				exclude: /node_modules/
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,	
					{
						loader: 'css-loader',
						options: {				
			                importLoaders: 1,
			            }
					},{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							plugins:postcss.plugins,
                			parser: 'postcss-less',
						}
					},{
				        loader: 'less-loader', 
				        options: { 
				            sourceMap: true,
				        }
				    }
				]
			},
			{
				test: /\.(png|jp?g|gif|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192, // 小于8192的图片打包成base 64图片
						name: 'images/[name].[hash:8].[ext]',
						publicPath: ''
					}
				}]
			},
			{
            	test:/\.html$/,
			    use:[
			        {
			            loader:"html-loader",
			            options:{
			                attrs:["img:src","img:data-src"] 
			            }
			        }
			    ]
	        },{
			    // 文件依赖配置项——字体图标
			    test: /\.(woff|woff2|svg|eot|ttf)$/,
			    use: [{
			        loader: 'file-loader',
			        options: {
			            limit: 8192, 
			            name: 'fonts/[name].[ext]?[hash:8]',
			            publicPath:''
			        },
			    }],
			}, {
			    // 文件依赖配置项——音频
			    test: /\.(wav|mp3|ogg)?$/,
			    use: [{
			        loader: 'file-loader',
			        options: {
			            limit: 8192, 
			            name: 'audios/[name].[ext]?[hash:8]',
			            publicPath:''
			        },
			    }],
			}, {
			    // 文件依赖配置项——视频
			    test: /\.(ogg|mpeg4|webm)?$/,
			    use: [{
			        loader: 'file-loader',
			        options: {
			            limit: 8192, 
			            name: 'videos/[name].[ext]?[hash:8]',
			            publicPath:''
			        },
			    }],
			}, {
	            test: /\.(js|jsx)$/,
	            use: ['babel-loader?cacheDirectory=true'],
	            include: path.resolve(__dirname, 'src')
	        }, {
			  test: /\.json$/,  //用于匹配loaders所处理文件拓展名的正则表达式
			  use: 'json-loader', //具体loader的名称
			  type: 'javascript/auto',
			  exclude: /node_modules/
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(), // 清除上个版本的文件
		new webpack.HashedModuleIdsPlugin(), // 实现持久化缓存
		new HtmlWebpackPlugin({
			filename: 'index.html', // 输出文件的名称
			template: path.resolve(__dirname, 'index.ejs'), // 模版文件的路径
			title: '505', // 配置生成页面的标题
			// 压缩html
			minify:{
		        removeRedundantAttributes:true, // 删除多余的属性
		        collapseWhitespace:true, // 折叠空白区域
		        removeAttributeQuotes: true, // 移除属性的引号
		        removeComments: true, // 移除注释
		        collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
		    },
		}),
		new MiniCssExtractPlugin({
		    filename: 'css/[name].[hash].css',
		    chunkFilename: 'css/[name].[hash].css',
		}),
		// 打包的静态资源目录地址
		new copyWebpackPlugin([{
		    from:path.resolve(__dirname+'/static'),
		    to:'static' // 打包到dist下面的static
		},{
	        from:path.resolve(__dirname+'/README'),// 打包的静态资源目录地址
	        to:'./README' // 打包到dist下面的README
	    }]),

		// 可视化视图查看器，可以清楚的看到webpack打包后所有组件与组件的依赖关系，
		//以及打包压缩后各文件的大小，还支持缩小捆绑，以及支持查看gzip的大小
	    new BundleAnalyzerPlugin({
		    analyzerMode: 'static',
		    //  是否在默认浏览器中自动打开报告
		    openAnalyzer: true,
		    //  将在“服务器”模式下使用的端口启动HTTP服务器。
		    analyzerPort: 9528, 
		    reportFilename: 'static/report.html',
		})
	],
	// 模版解析配置项
    resolve: {
        // 设置可省略文件后缀名
        extensions: [' ','.js','.json','.jsx'],
        // 查找 module 的话从这里开始查找;
        modules: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules")], // 绝对路径;
        // 配置路径映射（别名）
        alias: {
            '@': path.resolve('src'),
        }
    },
	// 压缩文件（js css）
	optimization: {
		moduleIds: 'hashed', 
		namedChunks: true,
		minimizer: [ // 用于配置 minimizers 和选项
	        new UglifyJsPlugin({
	            cache: true,
	            parallel: true,
	            sourceMap: true // set to true if you want JS source maps
	        }),
	        new OptimizeCSSAssetsPlugin({})
	    ],
	    // 拆分代码
	    splitChunks: {
	    	maxInitialRequests: 6, // 表示在一个入口中，最大初始请求chunk数
	    	cacheGroups: {
	    		dll: {
	                chunks:'all',
	                test: /[\\/]node_modules[\\/](react|react-router)[\\/]/,
	                name: 'dll',
	                priority: 2,
	                enforce: true,
	                reuseExistingChunk: true
	            },
	            commons: {
	                name: 'commons',
	                minChunks: 2, //Math.ceil(pages.length / 3), 当你有多个页面时，获取pages.length，至少被1/3页面的引入才打入common包
	                chunks:'all',
	                reuseExistingChunk: true
	            }
	        }
	    },
	    runtimeChunk: {
		    name: 'manifest'
		},
	}
};

