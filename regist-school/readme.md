# 项目说明文挡

## 运营专题-七月特权月专题H5页面 ##
##http://tg.iopen.com.cn/pc/013_baidu/
### gulp命令相关介绍
1. npm install：安装所需要的模块
2. gulp start：启动开发环境
3. gulp build：构建发布资源（代码压缩）

### 项目结构介绍
```

├── node_modules		//项目npm管理依赖包
├── dist			//gulp实时构建的目录
├── publish			//gulp打包后的文件目录
├── src			//项目开发目录
│   ├── assets		//静态资源目录（如：图片、视频、字体）
│	├── js		//js文件目录（包含：公共js 第三方插件lib 对应html的js）
│	├──sass		//sass文件目录
│	├──template		//公共html片段模板文件目录
│	├──index.html	//html文件放到这里
├── gulpfile.js		//gulp配置文件
├── package.json		//npm依赖文件
├── readme.md		//项目说明文档
.
```
### 语法说明

+ 1.@@include(""，{title:'})； //公共html片段引用的方法（可以传参数 @@title去接收）
+ 2.@import ""; //引用公共的scss文件
+ 参考资源：https://www.cnblogs.com/nzbin/p/7467546.html

### 开发规范

http://www.divcss5.com/yanshi/201311/2013110601/
+ 1.html css js 加注释说明
+ 2.scss 嵌套不要超多三级
+ 3.注意公共模块的抽取
+ 4.css 使用  — 连接符命名方式