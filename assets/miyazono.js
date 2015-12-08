/**
 * miyazono.js 简单的弹出窗插件
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
            borderStyle : "1px solid #d8d8d8", //主题边框样式
            btnOkBgColor : "#6fb3e0",  //确定按钮背景色
            btnOkColor : "#fff",  //确定按钮文字颜色
            btnOkText : "确认",  //确定按钮文字
            btnCancelBgColor : "#828282", //取消按钮背景色
            btnCancelColor : "#fff", //取消按钮文字颜色
            btnCancelText : "取消", //取消按钮文字
            isFade : "true",
 			callback : new function() {}
 		}
 		this.init(options);
 	}

    //confirmDialog类相关函数 
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
	     */
    	GenerateHtml : function () {
            var me = this;
    		var _html = "";

    		_html += '<div id="miya-box"><p id="miya-tit">' + me.config.title + '</p>';
    		_html += '<a id="miya-close">×</a><div id="miya-text">' + me.config.text + '</div><div id="miya-btns">';

    		_html += '<a id="miya-btns-ok" href="javascript:void(0);">' + me.config.btnOkText + '</a>';
    		_html += '<a id="miya-btns-cancel" href="javascript:void(0);">' + me.config.btnCancelText + '</a>';
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
    			border : me.config.borderStyle,
                display : 'none',
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
    			color : me.config.btnOkColor,
    			fontSize : '14px',
    			backgroundColor : me.config.btnOkBgColor,
    			textDecoration : 'none',
    			fontFamily : '"microsoft yahei", "Arial", "Helvetica", sans-serif',
    			cursor : 'pointer',
                textOverflow : 'ellipsis',
                overflow : 'hidden',
                whiteSpace : 'nowrap'
    		})

    		var $btnCancel = $("#miya-btns-cancel");
    		$btnCancel.css({
    			display : 'inline-block',
    			width : '80px',
    			padding : '8px',
    			color : me.config.btnCancelColor,
    			fontSize : '14px',
    			backgroundColor : me.config.btnCancelBgColor,
    			cursor : 'pointer',
    			textDecoration : 'none',
    			fontFamily : '"microsoft yahei", "Arial", "Helvetica", sans-serif',
    			marginLeft : '20px',
                textOverflow : 'ellipsis',
                overflow : 'hidden',
                whiteSpace : 'nowrap'
    		})

    		//文本框居中，必须在每一个css设置之后获取长宽
			var _width = parseInt($box.width());
            var _height = parseInt($box.height());
	        $box.css("marginLeft", -_width/2);
            $box.css("marginTop", -_height/2);
            //文本框淡入
            me.config.isFade ? $box.fadeIn(500) : $box.show();
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
    	btnCancelClick : function (isFade) {
    		var $obj = $("#miya-box");
    		isFade ? $obj.fadeOut(500,function(){$obj.remove();}) : $obj.remove();
    	},

		/**
	     * @method 通用绑定事件
	     * @pram callback 回调函数
	     */
    	bind : function (callback) {
    		var me = this;
    		$("#miya-close").on('click', function () {
                me.btnCancelClick(me.config.isFade);
            });
			$("#miya-btns-cancel").on('click', function () {
                me.btnCancelClick(me.config.isFade);
            });
			$("#miya-btns-ok").on('click', function () {
    			me.btnOkClick(callback);
    		});
    	}
	}

    //tips类
    var TipsDialog = function (option){
        this.config = {
            type : 'success',    //成功：success;错误：error;
            text : '请输入相关提示信息',  //提示文字
            imageUrl : ""   //图片icon地址
        }
        this.init(option);
    }

    //tips类相关函数
    TipsDialog.prototype = {
        init : function (option) {
            var me = this;
            me.config = $.extend(this.config,option || {});
            me.GenerateHtml();
        },

        resizePos : function () {
            var obj = $('.alert-tips');
            var _width = parseInt(obj.width());
            var _height = parseInt(obj.height());
            obj.css("marginLeft", -_width/2)
            obj.css("marginTop", -_height/2 + 30)
        },

        /**
         * @method 生成html
         */
        GenerateHtml : function (){
            var me = this;
            var _html = '';

            switch (me.config.type) {
                case 'success' :
                    _html = '<div class="alert-tips alert-tips-success"><i></i><span>' + me.config.text + '</span></div>';
                    break;
                case 'error' :
                    _html = '<div class="alert-tips alert-tips-error"><i></i><span>' + me.config.text + '</span></div>';
                    break;
                default : break;
            }
            $("body").append(_html); 
            me.GenerateCss();
            me.resizePos();
            me.removeHtml();
        },

        /**
         * @method 生成css样式
         */
        GenerateCss : function () {
            var me = this;
            //弹出确认窗外部盒子样式
            var $tips = $(".alert-tips");
            $tips.css({
                position : 'fixed',
                top : '50%',
                left : '50%',
                borderRadius : '3px',
                padding : '10px',
                fontFamily : '"microsoft yahei", "Arial", "Helvetica", sans-serif',
                fontSize : "14px",
                zIndex : '999999'
            })

            $tips.find('i').css({
                display : "inline-block",
                width : "17px",
                height : "17px",
                verticalAlign : "middle",
                marginRight : "10px",
                backgroundImage : "url(" + me.config.imageUrl + ")",
                backgroundSize : "100%"
            })

            $tips.find('span').css({
                verticalAlign : "middle"
            })

            var $success = $(".alert-tips-success");
            $success.css({
                border : "1px solid #00ba45",
                backgroundColor : "#c9ffda",
                color : "#00802f"
            })

            var $error = $(".alert-tips-error");
            $error.css({
                border : "1px solid #f6b9b9",
                backgroundColor : "#ffe4e4",
                color : "#b94a48"
            })
        },
        /**
         * @method 删除html
         */
        removeHtml : function () {
            var obj = $('.alert-tips');
            var _height = parseInt(obj.height());
            obj.animate({marginTop : -_height/2 - 30},function(){setTimeout(function(){obj.remove()},1500)});
        }
    }

    jQuery.extend({
        Confirm : function (options) {
            var confirmDialog = new ConfirmDialog(options);
        },
        Tips : function (options) {
            var tipsDialog = new TipsDialog(options);
        }
    });
    
})

