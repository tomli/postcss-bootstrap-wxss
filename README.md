# PostCSS bootstrap Wxss

[PostCSS] plugin for wxss.

在postcss-mpvue-wxss基础上加入针对 bootstrap4的一些适配。


  
## 备注
需要和[postcss-mpvue-wxss](URL 'https://github.com/mpvue/postcss-mpvue-wxss')一起使用


##用法
``` 
  postcss([ require('postcss-mpvue-wxss') ])
  ``` 
  
  ###在Webpack中使用
  
``` 
  module.exports = {
    plugins: [
      require('autoprefixer')({
                                 remToRpx: 35  // 这个参数可以用来调整转换rem单位到rpx单位时使用的比例
                              })
    ]
  }
  ``` 
  
  

参考[wepy-plugin-bootstrap](URL 'https://github.com/tomli/wepy-plugin-bootstrap') 以及 [wepy-bootstrap-demo](URL 'https://github.com/tomli/wepy-bootstrap-demo.git')

