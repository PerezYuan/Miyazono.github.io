(function () {
    function generateHtml (options) {
        var html = '';
        switch (options.type) {
            case 'success' :
                html = '<div class="miya-tips miya-tips-success"><i></i><span>' + options.text + '</span></div>';
                break;
            case 'error' :
                html = '<div class="miya-tips miya-tips-error"><i></i><span>' + options.text + '</span></div>';
                break;
            default : break;
        }
        return $(html);
    }

    function applyCss ($el, options) {
        $el.css({
            position : 'fixed',
            top : '50%',
            left : '50%',
            borderRadius : '3px',
            padding : '10px',
            fontFamily : '"microsoft yahei", "Arial", "Helvetica", sans-serif',
            fontSize : '14px',
            zIndex : '999999'
        });

        $el.find('i').css({
            display : 'inline-block',
            width : '17px',
            height : '17px',
            verticalAlign : 'middle',
            marginRight : '10px',
            backgroundImage : 'url("' + options.imageUrl + '")',
            backgroundSize : "100%"
        });

        $el.find('span').css({
            verticalAlign : "middle"
        })

        if (options.type === 'success') {
            $el.css({
                border : "1px solid #00ba45",
                backgroundColor : "#c9ffda",
                color : "#00802f"
            });
        } else if (options.type === 'error') {
            $el.css({
                border : '1px solid #f6b9b9',
                backgroundColor : '#ffe4e4',
                color : '#b94a48'
            });
        }
    }

    function animate ($el, options) {
        $el.appendTo(document.body);

        var width = parseInt($el.width());
        var height = parseInt($el.height());

        $el.css({
            marginLeft: -width / 2 + 'px',
            marginTop: -height / 2 + 30 + 'px'
        });

        $el.animate({
            marginTop : -height / 2 - 30 + 'px'
        }, function () {
            setTimeout(function () {
                $el.remove();
            }, options.timeout);
        });
    }

    function tip (customOptions) {
        var options = {
            type : 'success',    //成功：success;错误：error;
            text : '请输入相关提示信息',  //提示文字
            timeout : 1500,  //时间延时
            imageUrl : ''   //图片icon地址
        };

        $.extend(options, customOptions);

        var $el = generateHtml(options);

        applyCss($el, options);

        animate($el, options);
    }

    jQuery.extend({
        tip : function (options) {
            tip(options);
        }
    });
})();