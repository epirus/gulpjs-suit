#Gulp的使用感觉

gulp的关注点是什么？我觉得应该是关注这种任务的可自由自定义.

#使用Gulp构建命令行

如果每一个项目配置一个配置文件好像也是不对的。一些简单的命令确实可以解决很多问题。也不会对原来的目录结构产生影响。就像baidu的fis一样。但是功能自己是可以拆分的。

* 目录结构

```javascript
├── bower_components
├── css
├── js
│   ├──es6
├── imgs
├── index.html
└── scss

```

* gulp livereload

浏览器打开localhost:8000就可以看到了。

* gulp livereload -p

这个可以自动开启px to rem的转换 默认设置是 1rem = 32px;
这么设置的原因是跟一个sass的响应是有关系,
{%  %}

@function fit($browserWidth){
  $browserDefaultFontSize:100% !default;//变量的值可以根据自己需求定义
  @return $browserDefaultFontSize*$browserWidth/320;
}

//android
@media screen and (min-width: 360px) and (max-width: 374px) {
  html {
    font-size: fit(360);
  }
}
```


* gulp livereload -q index.html

自动的生成这个页面的二维码.做移动端的时候还是很方便的。q代表qrcode的意思。

* gulp livereload  -b

自动打开chrome浏览器进行模拟.b代表browser的意思

* gulp livereload -p -q index.html  -b

哎呦。还不错哦。

* gulp release -p

release的基础就是会根据多个文件进行合并。 -p的意思就是将px to rem

html的模板是这个样子的

{%  %}

<html>
<head>
<!-- build:css css/lib.css -->

<!-- endbuild -->

<!-- build:js js/lib.js -->
<!-- endbuild -->
</head>
<body>

</body>
</html>

```

自动会在目录下生成一个lib.css跟lib.js的文件

* gulp release

没有转换

* gulp ftp

就是可以将release的目录中的文件发不到线上.这个需要引入一个ftpconfig.js的文件。只要配置对应的内容即可.

{%  %}

var gutil = require('gulp-util');
module.exports = {
    remoteServer: {
    host: 'URL',
    user: 'User',
    password: 'PASS',
    parallel: 5,
    log: gutil.log
  },
  remoteServerUrl:'remoteUrl'
  onlineUrl:'displayUrl'
};

```

##to be continued

* webpack import?
* browser-syn to rewrite the livereload part?

##总体还是挺好玩的
[Try About It](https://github.com/epirus/gulpjs-suit)
