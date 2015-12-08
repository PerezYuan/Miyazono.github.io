/**
 * 猪标局确认提示框
 * @author yuanzimin
 * @time 2015-11-23
 */
 $(function () {
    //confirmDialog类
 	var ConfirmDialog = function (options) {
 		this.config = {
 			title : "提示", //标题文字
            titleBgColor : "#6fb3e0", //标题颜色
            titleColor : "#fff", //标题文字颜色
            boxBgColor : "#fff", //盒子背景颜色
 			text : "我是确认弹出窗",  //主题文字
            textColor : "#000",  //主题文字颜色
 			callback : new function() {}
 		}
 		this.init(options);
 	}

    //confirm类相关函数 
    ConfirmDialog.prototype = {
    	/**
	     * @method 初始化提示框
	     */
	    closeBtn : $("#miya-close"),
    	init : function (options) {
    		var me = this;
    		me.config = $.extend(me.config,options || {});
    		me.GenerateHtml();
    		me.bind(me.config.callback);
    	},

    	/**
	     * @method 生成html
	     * @pram 
	     *	title 提示上方文字
	     *	text  提示正文
	     */
    	GenerateHtml : function (title, text) {
            var me = this;
    		var _html = "";

    		_html += '<div id="miya-box"><p id="miya-tit">' + me.config.title + '</p>';
    		_html += '<a id="miya-close">×</a><div id="miya-text">' + me.config.text + '</div><div id="miya-btns">';

    		_html += '<a id="miya-btns-ok" href="javascript:void(0);">确认</a>';
    		_html += '<a id="miya-btns-cancel" href="javascript:void(0);">取消</a>';
    		_html += '</div></div>';

	        //必须先将_html添加到body，再设置css样式
	        $("body").append(_html); 
	        this.GenerateCss();
	    },

	    /**
	     * @method 生成css样式
	     */
    	GenerateCss : function () {
            var me = this;
    		//弹出确认窗外部盒子样式
    		var $box = $("#miya-box");
    		$box.css({
    			position : 'fixed',
    			width : '400px',
    			top : '50%',
    			left : '50%',
    			backgroundColor : me.config.boxBgColor,
    			border : '1px solid #d8d8d8',
    			zIndex : '999999'
    		})

    		//弹出确认框标题样式
    		var $title = $("#miya-tit");
    		$title.css({
    			margin : '0',
    			fontFamily : '"microsoft yahei", "Arial", "Helvetica", sans-serif',
    			fontWeight : 'bold',
    			fontSize : '16px',
    			color : me.config.titleColor,
    			padding : '10px 15px',
    			backgroundColor : me.config.titleBgColor
    		})
    		
    		//弹出确认窗主消息样式
    		var $text = $("#miya-text");
    		$text.css({
    			margin : '0',
    			fontFamily : '"microsoft yahei", "Arial", "Helvetica", sans-serif',
    			padding : '20px',
    			lineHeight : '20px',
    			fontSize : '14px',
                color : me.config.textColor
    		})
    		
    		//弹出确认窗关闭按钮
    		var $close = $("#miya-close");
    		$close.css({
    			display : 'block',
    			position : 'absolute',
    			right : '10px',
    			top : '10px',
    			cursor : 'pointer',
    			fontSize : '20px',
    			color : '#fff'
    		})

			//弹出确认窗按钮组
    		var $btns = $("#miya-btns");
    		$btns.css({
    			margin : '15px 0',
    			textAlign : 'center'
    		})

    		var $btnOk = $("#miya-btns-ok");
    		$btnOk.css({
    			display : 'inline-block',
    			width : '80px',
    			padding : '8px',
    			color : '#fff',
    			fontSize : '14px',
    			backgroundColor : '#6fb3e0',
    			textDecoration : 'none',
    			fontFamily : '"microsoft yahei", "Arial", "Helvetica", sans-serif',
    			cursor : 'pointer'
    		})

    		var $btnCancel = $("#miya-btns-cancel");
    		$btnCancel.css({
    			display : 'inline-block',
    			width : '80px',
    			padding : '8px',
    			color : '#fff',
    			fontSize : '14px',
    			backgroundColor : '#828282',
    			cursor : 'pointer',
    			textDecoration : 'none',
    			fontFamily : '"microsoft yahei", "Arial", "Helvetica", sans-serif',
    			marginLeft : '20px'
    		})

    		//文本框居中，必须在每一个css设置之后获取长宽
			var _width = parseInt($box.width());
            var _height = parseInt($box.height());
	        $box.css("marginLeft", -_width/2);
            $box.css("marginTop", -_height/2);
    	},

		/**
	     * @method 确定按钮事件
	     * @pram 
	     *	callback 回调函数
	     */
    	btnOkClick : function (callback) {
			$("#miya-box").remove();
    		if (Object.prototype.toString.call(callback) == '[object Function]') {
    			callback();
    		}
    	},

    	/**
	     * @method 取消按钮事件
	     */
    	btnCancelClick : function () {
    		var $obj = $("#miya-box");
    		$obj.fadeOut(500,function(){$obj.remove();});
    	},

		/**
	     * @method 通用绑定事件
	     * @pram callback 回调函数
	     */
    	bind : function (callback) {
    		var me = this;
    		$("#miya-close").on('click', me.btnCancelClick);
			$("#miya-btns-cancel").on('click', me.btnCancelClick);
			$("#miya-btns-ok").on('click', function () {
    			me.btnOkClick(callback);
    		});
    	}
	}

    jQuery.extend({
        Confirm : function (options) {
            var confirmDialog = new ConfirmDialog(options)
        }
    });
    
})

