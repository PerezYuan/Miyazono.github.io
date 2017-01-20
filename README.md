# miyazono
[![Build Status](https://travis-ci.org/PerezYuan/miyazono.svg?branch=master)](https://travis-ci.org/PerezYuan/miyazono)

>一款基于jQuery的UI组件小插件


## 引入jQuery与插件代码
```
<script src="../lib/jquery171.js"></script>
<script src="../dist/miyazono.min.js"></script>
```

----------

## 1. 提示框（Tips）
### 初始化一个错误提示窗
```
$.Tips({
	text : "我是很多字",
	type : "error",
	imageUrl : "../assets/error.png"
})
```
### 提示窗参数详解以及缺省值
```
type: "success", // 成功：success;错误：error;
text: "请输入相关提示信息", // 提示文字
timeout: 1500, // 时间延时
imageUrl: "" // 图片icon地址
```

----------

## 2. 确认框（Confirm）
### 初始化一个确认提示窗
```
$.Confirm({
	text : "我是很多字",
	callback : function () {
		alert("我是回调函数");
	}
})
```
### 确认窗参数详解以及缺省值
```
title : "提示", // 标题文字
titleBgColor : "#258e3d", // 标题颜色
titleColor : "#fff", // 标题文字颜色
boxBgColor : "#fff", // 盒子背景颜色
text : "我是确认弹出窗", // 主题文字
textColor : "#000", // 主题文字颜色
borderStyle : "1px solid #009934", // 主题边框样式
btnOkBgColor : "#258e3d", // 确定按钮背景色
btnOkColor : "#fff", // 确定按钮文字颜色
btnOkText : "确认", // 确定按钮文字
btnCancelBgColor : "#828282", // 取消按钮背景色
btnCancelColor : "#fff", // 取消按钮文字颜色
btnCancelText : "取消", // 取消按钮文字
isFade : true, // 是否淡入淡出效果
callback : new function() {} // 确认成功回调		
```

## 贡献
克隆项目,`src/js`为各个组件模块，执行以下命令。
```
npm install
npm install -g gulp
npm run build
```
Just pull request~

## Other
v0.5.0 gulp组件拆分引入AMD

v0.4.0 合并两个组件并`extend`到`$`

v0.3.0 confirm组件初始化

v0.2.0 tip组件初始化

### TODO
- pagebar组件
- 抽离公共部分，如overlay