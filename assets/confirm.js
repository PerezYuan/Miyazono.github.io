(function () {
    function generateHtml (options) {
        var _html = '';
            _html += '<div id="miya-wrap"><div id="miya-box"><p id="miya-tit">' + options.title + '</p>';
            _html += '<a id="miya-close">×</a><div id="miya-text">' + options.text + '</div><div id="miya-btns">';

            _html += '<a id="miya-btns-ok" href="javascript:void(0);">' + options.btnOkText + '</a>';
            _html += '<a id="miya-btns-cancel" href="javascript:void(0);">' + options.btnCancelText + '</a>';
            _html += '</div></div></div>';
        return $(_html);
    }

    function applyCss ($el, options) {
        $el.css({
            position : 'fixed',
            width : '100%',
            height : '100%',
            top : '0',
            left : '0',
            backgroundColor : 'rgba(255,255,255,0)',
            zIndex : '999999'
        })

        var $box = $el.find("#miya-box");
        $box.css({
            position : 'fixed',
            width : '400px',
            top : '50%',
            left : '50%',
            backgroundColor : options.boxBgColor,
            border : options.borderStyle,
            display : 'none',
        })

        var $title = $el.find("#miya-tit");
        $title.css({
            margin : '0',
            fontFamily : '"microsoft yahei", "Arial", "Helvetica", sans-serif',
            fontWeight : 'bold',
            fontSize : '16px',
            color : options.titleColor,
            padding : '10px 15px',
            backgroundColor : options.titleBgColor
        })
            
        var $text = $el.find("#miya-text");
        $text.css({
            margin : '0',
            fontFamily : '"microsoft yahei", "Arial", "Helvetica", sans-serif',
            padding : '20px',
            lineHeight : '20px',
            fontSize : '14px',
            color : options.textColor
        })
            
        var $close = $el.find("#miya-close");
        $close.css({
            display : 'block',
            position : 'absolute',
            right : '10px',
            top : '10px',
            cursor : 'pointer',
            fontSize : '20px',
            color : '#fff'
        })

        var $btns = $el.find("#miya-btns");
        $btns.css({
            margin : '15px 0',
            textAlign : 'center'
        })

        var $btnOk = $el.find("#miya-btns-ok");
        $btnOk.css({
            display : 'inline-block',
            width : '80px',
            padding : '8px',
            color : options.btnOkColor,
            fontSize : '14px',
            backgroundColor : options.btnOkBgColor,
            textDecoration : 'none',
            fontFamily : '"microsoft yahei", "Arial", "Helvetica", sans-serif',
            cursor : 'pointer',
            textOverflow : 'ellipsis',
            overflow : 'hidden',
            whiteSpace : 'nowrap'
        })

        var $btnCancel = $el.find("#miya-btns-cancel");
        $btnCancel.css({
            display : 'inline-block',
            width : '80px',
            padding : '8px',
            color : options.btnCancelColor,
            fontSize : '14px',
            backgroundColor : options.btnCancelBgColor,
            cursor : 'pointer',
            textDecoration : 'none',
            fontFamily : '"microsoft yahei", "Arial", "Helvetica", sans-serif',
            marginLeft : '20px',
            textOverflow : 'ellipsis',
            overflow : 'hidden',
            whiteSpace : 'nowrap'
        })
    }

    function animate ($el, options) {
        $el.appendTo(document.body);
        var $box = $el.find("#miya-box");
        //文本框居中
        var _width = parseInt($box.width());
        var _height = parseInt($box.height());
        $box.css("marginLeft", -_width/2);
        $box.css("marginTop", -_height/2);
        //文本框淡入
        options.isFade ? $box.fadeIn(500) : $box.show();
    }

    function generateClickHandler ($el, onClick, isFade) {
        function callbackWrapper () {
            $el.remove();
            if (Object.prototype.toString.call(onClick) === '[object Function]') {
                onClick();
            }
        }

        return function () {
            if (isFade) {
                $el.fadeOut(500, callbackWrapper);
            } else {
                callbackWrapper();
            }
        };
    }

    function bind ($el, options) {
        $el.find("#miya-btns-ok").on('click', generateClickHandler($el, options.onOk, options.isFade));
        $el.find("#miya-close,#miya-btns-cancel").on('click', generateClickHandler($el, options.onCancel, options.isFade));
    }

    function confirmDialog (customOptions) {
        var options = {
            title : "提示", //标题文字
            titleBgColor : "#258e3d", //标题颜色
            titleColor : "#fff", //标题文字颜色
            boxBgColor : "#fff", //盒子背景颜色
            text : "我是确认弹出窗",  //主题文字
            textColor : "#000",  //主题文字颜色
            borderStyle : "1px solid #009934", //主题边框样式
            btnOkBgColor : "#258e3d",  //确定按钮背景色
            btnOkColor : "#fff",  //确定按钮文字颜色
            btnOkText : "确认",  //确定按钮文字
            btnCancelBgColor : "#828282", //取消按钮背景色
            btnCancelColor : "#fff", //取消按钮文字颜色
            btnCancelText : "取消", //取消按钮文字
            isFade : "true",  //是否淡入淡出效果
            onOk : null, //点击确定时执行
            onCancel: null, //点击取消时执行
        };

        $.extend(options, customOptions);

        var $el = generateHtml(options);

        bind($el, options);

        applyCss($el, options);

        animate($el, options);

    }

    jQuery.extend({
        Confirm : function (options) {
            confirmDialog(options);
        }
    });
})();