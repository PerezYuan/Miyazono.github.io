/**
 * @author perezyuan.
 * @time 2016/12/20.
 * @desc Confirm组件.
 */
define('ConfirmDialog', function(require, exports, module) {
    let ConfirmDialog = function (options) {
        this.config = {
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
        }
        this.init(options);
    }

    //confirmDialog类相关函数 
    ConfirmDialog.prototype = {
        /**
        * @method 初始化提示框
        */
        init(options) {
            let me = this;
            me.config = $.extend(me.config,options || {});
            me.generateHtml();
            me.bind(me.config.callback);
        },

        resizePos() {
            let $box = this.$el.find('#miya-box');
            let _width = parseInt($box.width());
            let _height = parseInt($box.height());
            $box.css("marginLeft", -_width/2);
            $box.css("marginTop", -_height/2);
            return $box;
        },
        /**
         * @method 生成html
         */
        generateHtml() {
            let me = this;
            let _html = "";

            _html += '<div id="miya-wrap"><div id="miya-box"><p id="miya-tit">' + me.config.title + '</p>';
            _html += '<a id="miya-close">×</a><div id="miya-text">' + me.config.text + '</div><div id="miya-btns">';

            _html += '<a id="miya-btns-ok" href="javascript:void(0);">' + me.config.btnOkText + '</a>';
            _html += '<a id="miya-btns-cancel" href="javascript:void(0);">' + me.config.btnCancelText + '</a>';
            _html += '</div></div></div>';

            // 全局元素
            let $el = me.$el = $(_html);
            me.generateCss();
        },

        /**
         * @method 生成css样式
         */
        generateCss() {
            let me = this;
            //弹出确认窗背景样式
            me.$el
                .css({
                    position : 'fixed',
                    width : '100%',
                    height : '100%',
                    top : '0',
                    left : '0',
                    backgroundColor : 'rgba(255,255,255,0)',
                    zIndex : '999999'
                })


            //弹出确认窗外部盒子样式
            me.$el
                .find('#miya-box')
                .css({
                    position : 'fixed',
                    width : '400px',
                    top : '50%',
                    left : '50%',
                    backgroundColor : me.config.boxBgColor,
                    border : me.config.borderStyle,
                    display : 'none',
                })

            //弹出确认框标题样式
            me.$el
                .find('#miya-tit')
                .css({
                    margin : '0',
                    fontFamily : '"microsoft yahei", "Arial", "Helvetica", sans-serif',
                    fontWeight : 'bold',
                    fontSize : '16px',
                    color : me.config.titleColor,
                    padding : '10px 15px',
                    backgroundColor : me.config.titleBgColor
                })

            //弹出确认窗主消息样式
            me.$el
                .find('#miya-text')
                .css({
                    margin : '0',
                    fontFamily : '"microsoft yahei", "Arial", "Helvetica", sans-serif',
                    padding : '20px',
                    lineHeight : '20px',
                    fontSize : '14px',
                    color : me.config.textColor
                })

            //弹出确认窗关闭按钮
            me.$el
                .find('#miya-close')
                .css({
                    display : 'block',
                    position : 'absolute',
                    right : '10px',
                    top : '10px',
                    cursor : 'pointer',
                    fontSize : '20px',
                    color : '#fff'
                })

            //弹出确认窗按钮组
            me.$el
                .find('#miya-btns')
                .css({
                margin : '15px 0',
                textAlign : 'center'
            })

            me.$el
                .find('#miya-btns-ok')
                .css({
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

            me.$el
                .find('#miya-btns-cancel')
                .css({
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
            $('body').append(me.$el);
            //文本框淡入
            me.config.isFade ? 
                me.resizePos().fadeIn(500) : 
                me.resizePos().show();
        },

        /**
        * @method 确定按钮事件
        * @pram 
        *	callback 回调函数
        */
        btnOkClick(callback, isFade) {
            let me = this;
            if (Object.prototype.toString.call(callback) == '[object Function]') {
                callback();
            }
            isFade ? 
                me.$el.fadeOut(500,function(){me.$el.remove();}) 
                : me.$el.remove();
        },

        /**
        * @method 取消按钮事件
        */
        btnCancelClick(isFade) {
            let me = this;
            isFade ? 
                me.$el.fadeOut(500,function(){me.$el.remove();}) 
                : me.$el.remove();
        },

        /**
        * @method 通用绑定事件
        * @pram callback 回调函数
        */
        bind(callback) {
            let me = this;
            me.$el.find("#miya-close").on('click', function () {
                me.btnCancelClick(me.config.isFade);
            });
            me.$el.find("#miya-btns-cancel").on('click', function () {
                me.btnCancelClick(me.config.isFade);
            });
            me.$el.find("#miya-btns-ok").on('click', function () {
                me.btnOkClick(callback,me.config.isFade);
            });
        }
    }

    module.exports = ConfirmDialog;
})
