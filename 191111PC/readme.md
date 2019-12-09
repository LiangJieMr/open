# 项目说明文挡

## PC1.1版本官网 ##

### gulp命令相关介绍
1. npm install：安装所需要的模块
2. npm start：启动开发环境
3. npm run build：构建发布资源（代码压缩）

### 项目结构介绍
```

├── node_modules		//项目npm管理依赖包
├── dist			//gulp实时构建的目录(忽略提交的文件夹)
├── publish			//gulp打包后的文件目录
├── src			//项目开发目录
│  accepted.html
│  alreadyPaid.html
│  area.html
│  auditFailure.html
│  certificate.html
│  efficacy.html
│  index.html
│  information.html
│  list.txt
│  myRegistration.html
│  payForPayment.html
│  protocol.html
│  regist.html
│  registProcess.html
│  registSuccess.html
│  signUp.html
│  underReview.html
│  
├─assets
│  ├─fonts
│  │      demo.css
│  │      demo_fontclass.html
│  │      demo_symbol.html
│  │      demo_unicode.html
│  │      iconfont.css
│  │      iconfont.eot
│  │      iconfont.js
│  │      iconfont.svg
│  │      iconfont.ttf
│  │      iconfont.woff
│  │      unicode.css
│  │      
│  └─images
│          alipay.png
│          beliveCertificate.png
│          certificate.png
│          dot02.png
│          emblem.png
│          favicon-20180727034957895.ico
│          getverifycode.png
│          header.png
│          honestCertificate.png
│          industryCertificate.png
│          jinglingtu.png
│          konwCertificate.png
│          line.png
│          line_01.png
│          logo.png
│          logoBd2.svg
│          netCertificate.png
│          productCertificate.png
│          proof.jpg
│          s.svg
│          spirate.png
│          tbord.png
│          us.png
│          weixuan.png
│          wx.png
│          x.svg
│          xuanzhong.png
│          
├─js
│  │  accepted.js
│  │  baoming.js
│  │  index.js
│  │  information.js
│  │  myRegistration.js
│  │  open.js
│  │  
│  ├─core
│  │      downloadFile.js
│  │      enlistInfo-template.js
│  │      footer.js
│  │      header.js
│  │      major-template.js
│  │      pay.js
│  │      paymentDetail.js
│  │      
│  └─lib
│      ├─jquery
│      │      jquery-1.9.1.min.js
│      │      
│      └─lazyLoad
│              jquery.lazyload.min.js
│              
├─sass
│  │  accepted.scss
│  │  agreement.scss
│  │  citySelect.scss
│  │  enroll.scss
│  │  fill.scss
│  │  index.scss
│  │  information.scss
│  │  myRegistration.scss
│  │  payForPayment.scss
│  │  proof.scss
│  │  signUp.scss
│  │  suess.scss
│  │  underReview.scss
│  │  
│  └─core
│     ├──  animate.scss
│          citySelect.scss
│          comForm.scss
│          comInfor.scss
│          common.scss
│          enlistInfo.scss
│          flow.scss
│          footer.scss
│          header.scss
│          headerOld.scss
│          learncenter.scss
│          login.scss
│          major.scss
│          myInfo.scss
│          naturalizationInformation.scss
│          pay.scss
│          paymentDetail.scss
│          paytype.scss
│          reset.scss
│          revisePhone.scss
│          reviseResult.scss
│          suessFlow.scss
│          
└─template
        citySelect.html
        comForm.html
        enlistInfo.html
        entranceTest.html
        fillUp.html
        flow.html
        footer.html
        header.html
        headerOld.html
        learncenter.html
        login.html
        major.html
        meta.html
        myInfo.html
        naturalizationInformation.html
        pay.html
        paymentDetail.html
        paytype.html
        revisePhone.html
        reviseResult.html
        script.html
        SuessFlow.html
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

+ 1.html css js 加注释说明
+ 2.scss 嵌套不要超多三级
+ 3.注意公共模块的抽取
+ 4.css 使用  — 连接符命名方式