# miyazono
>一款基于jQuery的弹出窗小插件

##引入jQuery与插件代码

	<script src="../assets/jquery171.js"></script>
    <script src="../assets/miyazono.js"></script>

##提示框（Tips）
提示窗主要分为成功提示窗和错误提示窗两类

###初始化一个错误提示窗
```javascript
    $.Tips({
		text : "我是很多字",
		type : "error",
		imageUrl : "../assets/error.png"
	})
```
###提示窗参数详解以及缺省值
	type : 'success',    //成功：success;错误：error;
    text : '请输入相关提示信息',  //提示文字
    imageUrl : ""   //图片icon地址

##确认框（Confirm）

###初始化一个确认提示窗
	$.Confirm({
		text : "我是很多字",
		callback : function () {
		alert("我是回调函数");
		}
	})

###确认窗参数详解以及缺省值

	title : "提示", //标题文字
    titleBgColor : "#6fb3e0", //标题颜色
    titleColor : "#fff", //标题文字颜色
    boxBgColor : "#fff", //盒子背景颜色
 	text : "我是确认弹出窗",  //主题文字
    textColor : "#000",  //主题文字颜色
    borderStyle : "1px solid #d8d8d8", //主题边框样式
    btnOkBgColor : "#6fb3e0",  //确定按钮背景色
    btnOkColor : "#fff",  //确定按钮文字颜色
    btnOkText : "确认",  //确定按钮文字
    btnCancelBgColor : "#828282", //取消按钮背景色
    btnCancelColor : "#fff", //取消按钮文字颜色
    btnCancelText : "取消", //取消按钮文字
    isFade : "true",
 	callback : new function() {} 			
