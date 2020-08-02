module.exports = {
  "root": true, 
  "parserOptions": {
      "sourceType": "module",
  },
  "parser": "babel-eslint", // eslint未支持的js新特性先进行转换
  "env": {
      "browser": true,
      "es6": true,
      "node": true,
      "shared-node-browser": true,
      "commonjs": true,
  },
  "globals": {    // 设置全局变量（false：不允许重写；）
      "BUILD_ENV": false,
  },
  "extends": "eslint:recommended", // 使用官方推荐规则，使用其他规则，需要先install，再指定。
  "rules": {
      // 定义检查规则
  }
}