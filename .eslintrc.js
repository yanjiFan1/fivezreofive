module.exports = {
    root: true, // 作用的目录是根目录
    extends: 'standard', // 继承标准规则
    plugins: [
        'html' // 使用eslint-plugin-html
    ],
    parser: "babel-eslint",
    parserOptions: {
        sourceType: 'module' // 按照模块的方式解析
    },
    env: {
      browser: true, // 开发环境配置表示可以使用浏览器的方法
      node: true, //
      es6: true
    },
    rules: { // 重新覆盖 extends: 'standard'的规则
    	// "no-undef": 0,// 关闭全局变量检测
     //  // 自定义的规则
     //  "linebreak-style": 0, // [0 ,"error", "windows"]
     //  "indent": 0, // ['error', 4] error类型，缩进4个空格
     //  'space-before-function-paren': 0, // 在函数左括号的前面是否有空格
     //  'eol-last': 0, // 不检测新文件末尾是否有空行
     //  'semi': 0, // ['error', 'always'] 必须在语句后面加分号
     //  "quotes": 0,// ["error", "double"]  字符串没有使用单引号 0-关闭全局变量的检测
     //  "no-console": "off",// ["error",{allow:["log","warn"]}] 允许使用console.log()
     //  "arrow-parens": 0,
     //  "no-new":0, //允许使用 new 关键字
     //  "no-tabs": "off", //
     //  "space-infix-ops": "off", // 要求操作符周围有空格 
     //  "no-multiple-empty-lines": "off", // 不允许多个空行
     //  "keyword-spacing": "off", // 强制在关键字前后使用一致的空格
     //  "no-irregular-whitespace": "off",// 这禁止掉 空格报错检查
   	  'indent':['off','tab'], //允许使用tab 缩进　
   	  'arrow-parens': 0, // 允许箭头函数的参数使用圆括号
      'generator-star-spacing': 0, // 允许 async-await
   	  "no-tabs":"off", // 允许使用tab
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,  // 允许在development使用debugger
	    "semi": [0,';'], // 关闭语句强制分号结尾
	    "no-multiple-empty-lines": [0, {"max": 3}], //空行最多不能超过3行 
   	  "no-mixed-spaces-and-tabs": 'off' //允许禁止混用tab和空格 
    },
    globals: { // 允许全局变量,将$设置为true，表示允许使用全局变量$
		  "document": true,
		  "localStorage": true,
		  "window": true,
		  "jQuery":true,
		  $:true
		}
}