var gulp = require("gulp");
var uglify = require("gulp-uglify");
let babel = require('gulp-babel');
var minimist = require("minimist");
var gutil = require("gulp-util");
var cleanhtml = require('gulp-cleanhtml');
var gp = require("gulp-load-plugins")();
var runSequence = require("run-sequence");
var browserSync = require('browser-sync').create();
var proxyMiddleware = require("http-proxy-middleware");
var gutil = require("gulp-util");
var concat = require('gulp-concat');
//webpack相关配置
var named = require('vinyl-named');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
//开发环境编译的路径
var devUrl = 'dist/';
var publishUrl = 'publish/';
var cdnUrl = './';
var changeUrl = {
	'./assets1111/': cdnUrl + 'assets11/',
	'./css/': cdnUrl + 'css/',
	'./js/': cdnUrl + 'js/'
};

//清除js
gulp.task("clean:js", function() {
	return gulp.src(devUrl + "js/*.js")
		.pipe(gp.clean())
});
//清除css
gulp.task("clean:css", function() {
	return gulp.src(devUrl + "cssfc191111/*.css")
		.pipe(gp.clean())
});
//清除html
gulp.task("clean:html", function() {
	return gulp.src(devUrl + "*.html")
		.pipe(gp.clean())
});
//清除dist目录
gulp.task("clean:dist", function() {
	return gulp.src(devUrl)
		.pipe(gp.clean())
});
//清除publish目录
gulp.task("clean:publish", function() {
	return gulp.src(publishUrl)
		.pipe(gp.clean())
});

//错误处理
function showErr(error) {
	console.error(error.toString());
	this.emit('end')
}

//开发环境编译scss任务,同时做兼容处理
gulp.task('sass', function() {
	return gulp.src("./src/sass/*.scss")
		.pipe(gp.debug({
			title: 'scss解析:'
		}))
		.pipe(gp.sourcemaps.init())
		//sass解析
		.pipe(gp.sass({
			outputStyle: 'expanded'
		}).on("error", gp.sass.logError))
		//浏览器兼容前缀添加
		.pipe(gp.autoprefixer({
			browsers: ["last 1000 versions"]
		}))
		//  .pipe(gp.sourcemaps.write('.'))
		.on('error', showErr)
		.pipe(gulp.dest(devUrl + "cssfc191111"))
});

//静态等资源移动任务:图片、视频、字体等
gulp.task("assets11Move", function() {
	return gulp.src("./src/assetsfc191111/**")
		.pipe(gp.changed(devUrl + "assetsfc191111"))
		.pipe(gp.debug({
			title: '静态资源移动:'
		}))
		.on('error', showErr)
		.pipe(gulp.dest(devUrl + "assetsfc191111"))
});

//通用js库插件移动
gulp.task("libMove", function() {
	 
//	gulp.src(["src/js/lib/**"])
//		.pipe(gp.changed(devUrl + "js/lib/"))
//		.on('error', showErr)
//		.pipe(gulp.dest(devUrl + "js/lib/"))
		
	return gulp.src(['src/jsfc191111/lib/jquery/jquery-1.9.1.min.js', 'src/jsfc191111/lib/lazyLoad/jquery.lazyload.min.js','src/jsfc191111/lib/slimscroll/jquery.slimscroll.js','src/jsfc191111/open.js'])
	    .pipe(concat('vendor.js'))
	   	.pipe(gulp.dest(devUrl + "jsfc191111/lib/vendor/"));
});

//公共js文件合并
//gulp.task('concatJs', function() {
//return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
//  .pipe(concat('vendor.js'))
//  .pipe(gulp.dest('./dist/'));
//});

//html模板功能实现
gulp.task('include', function() {
	return gulp.src('src/*.html')
		.pipe(gp.debug({
			title: 'html模板解析:'
		}))
		.pipe(gp.fileInclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.on('error', showErr)
		.pipe(gulp.dest(devUrl))
});

//js模块化开发
gulp.task("webpack", function() {
	return gulp.src("./src/jsfc191111/*.js")
		.pipe(gp.debug({
			title: 'js打包:'
		}))
		.pipe(named())
		.pipe(webpack(webpackConfig))
		.on('error', showErr)
		.pipe(gulp.dest(devUrl + "jsfc191111"))
});

//开启一个自动刷新的服务器,并对css,js,html等资源改变时做自动刷新,实现反向代理
var server = {
	baseDir: devUrl,
	middleware: [proxyMiddleware(['/api'], {
		target: 'http://10.100.136.243:8000',
//		target: 'http://10.100.136.198:8000',
		changeOrigin: true
	})]
};
gulp.task("server", function() {
	browserSync.init({
		//		files:[
		//			"dist/css/*.css",
		//			"dist/js/*.js",
		//			"dist/assets11/**/*.*",
		//			"dist/*.html"
		//		],
		notify: false,
		server: server
	})
});

//文件变化监听
gulp.task("watch", function() {
	gulp.watch("src/jsfc191111/**/*.js", function() {
		runSequence("clean:js", "webpack", function() {
			browserSync.reload();
		});
		//		browserSync.reload();
	});
	gulp.watch("src/assetsfc191111/**/*.*", ["assets11Move"]);
	gulp.watch("jsfc191111/lib/**/*.*", ["libMove"]);
	gulp.watch("src/sass/**/*.*", function() {
		runSequence("clean:css", "sass", function() {
			browserSync.reload();
		});
		//  browserSync.reload();
	});
	gulp.watch(["src/*.html", "src/template/*.*"], function() {
		runSequence("clean:html", "include", function() {
			browserSync.reload();
		});
		//  browserSync.reload();
	});
});

//发布到publish
//静态等资源移动任务:图片、视频、字体等
gulp.task("assets11MovePublish", function() {
	return gulp.src(devUrl + "assetsfc191111/**/*.*")
		.pipe(gp.debug({
			title: '静态资源(图片，字体，视频，音乐等)移动:'
		}))
		.pipe(gulp.dest(publishUrl + "assetsfc191111"))
});
//通用js库插件移动
gulp.task("libMovePublishJs", function() {
	return gulp.src(devUrl + "jsfc191111/lib/vendor/*.js*")
		.pipe(gp.debug({
			title: 'js库移动:'
		}))
		.pipe(gp.uglify({
			ie8: true
		}))
		.pipe(gulp.dest(publishUrl + "jsfc191111/lib/vendor"))
});
//通用js库插件css级联样式表移动
gulp.task("libMovePublishCss", function() {
	return gulp.src(devUrl + "jsfc191111/lib/**/*.css*")
		.pipe(gp.debug({
			title: 'css库移动:'
		}))
		.pipe(gp.cleanCss({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest(publishUrl + "jsfc191111/lib/"))
});
//html资源路径走CDN,只有当cdnUrl不为空的时候才走替换路径
gulp.task("change-paths", function() {
	return gulp.src([devUrl + "*.html"])
		.pipe(gp.debug({
			title: 'html路径替换CDN:'
		}))
		//			.pipe(gp.if(cdnUrl != '', gp.urlReplace(changeUrl)))
		//.pipe(gp.urlReplace(changeUrl))
		.pipe(cleanhtml())
		.pipe(gulp.dest(publishUrl));
});
//js压缩
gulp.task("jsMin", function() {
	return gulp.src(devUrl + "jsfc191111/*.js")
		.pipe(gp.debug({
			title: 'js压缩:'
		}))
		.pipe(babel())
		.pipe(gp.uglify({
			ie8: true
		}))
		.on('error', function(err) {
			gutil.log(gutil.colors.red('[Error]'), err.toString());
		})
		.pipe(gulp.dest(publishUrl + "jsfc191111/"))
});
//css压缩
gulp.task("cssMin", function() {
	return gulp.src(devUrl + "cssfc191111/*.css")
		.pipe(gp.debug({
			title: 'css压缩:'
		}))
		.pipe(gp.cleanCss({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest(publishUrl + "cssfc191111/"))
});
//默认development环境
var knowOptions = {
	string: "env",
	default: {
		env: process.env.NODE_ENV || "production"
	}
};

var options = minimist(process.argv.slice(2), knowOptions);

//生成filename文件，存入string内容
function string_src(filename, string) {
	var src = require('stream').Readable({
		objectMode: true
	})
	src._read = function() {
		this.push(new gutil.File({
			cwd: "",
			base: "",
			path: filename,
			contents: Buffer.from(string)
		}))
		this.push(null)
	}
	return src
}

gulp.task("constants", function() {
	//读入config.json文件
	var myConfig = require('./config.json');
	//取出对应的配置信息
	var envConfig = myConfig[options.env];
	var conConfig = 'module.exports = ' + JSON.stringify(envConfig);
	//生成config.js文件
	return string_src("config.js", conConfig)
		.pipe(gulp.dest('src/jsfc191111'))
});
//开发构建
gulp.task('dev', function() {
	runSequence("clean:dist", ["sass", "libMove", "webpack", "assets11Move", "include"], "server", "watch");
});

gulp.task('production', function() {
	runSequence("constants","webpack");
})
//发布构建
gulp.task('build', function() {
	runSequence("clean:publish", ["assets11MovePublish", "libMovePublishJs", "libMovePublishCss", "change-paths", "jsMin", "cssMin"]);
});