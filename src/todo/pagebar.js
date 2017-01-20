var Pagebar = {
    init: function($obj, args){
        var me = this;
        me.fillHtml($obj, args);
        me.bind($obj, args);
    },
    //填充html
    fillHtml: function($obj, args){
        $obj.empty();
        var me = this;
        me.pageCount = parseInt($obj.data('total'));
        me.current = parseInt($obj.data('current'));
        if(args.pageCount) {
            me.pageCount = args.pageCount;
        }
        if(args.current) {
            me.current = args.current;
        }
        // 上一页
        if(me.current > 1){
            $obj.append('<a href="javascript:;" class="page-prev">上一页</a>');
        } else {
            $obj.remove('.page-prev');
            $obj.append('<span class="page-prev disabled">上一页</span>');
        }
        // 中间页码
        var $pageWrap = $('<div class="page-wrap"></div>');
        if(me.current != 1 && me.current >= 4 && me.pageCount != 4){
            $pageWrap.append('<a href="javascript:;" class="page-num">'+ 1 +'</a>');
        }
        if(me.current - 2 > 2 && me.current <= me.pageCount && me.pageCount > 5){
            $pageWrap.append('<span class="page-dot">...</span>');
        }
        var start = me.current - 2,
            end = me.current + 2;
        if((start > 1 && me.current < 4) || me.current == 1){
            end++;
        }
        if(me.current > me.pageCount-4 && me.current >= me.pageCount){
            start--;
        }
        for (;start <= end; start++) {
            if(start <= me.pageCount && start >= 1){
                if(start != me.current){
                    $pageWrap.append('<a href="javascript:;" class="page-num">'+ start +'</a>');
                }else{
                    $pageWrap.append('<span class="current page-num">'+ start +'</span>');
                }
            }
        }
        if(me.current + 2 < me.pageCount - 1 && me.current >= 1 && me.pageCount > 5){
            $pageWrap.append('<span class="page-dot">...</span>');
        }
        if(me.current != me.pageCount && me.current < me.pageCount -2  && me.pageCount != 4){
            $pageWrap.append('<a href="javascript:;" class="page-num">' + me.pageCount + '</a>');
        }
        $obj.append($pageWrap);
        // 下一页
        if(me.current < me.pageCount){
            $obj.append('<a href="javascript:;" class="page-next">下一页</a>');
        } else {
            $obj.remove('.page-next');
            $obj.append('<span class="page-next disabled">下一页</span>');
        }
        // 跳转到
        if(args.isGo) {
            var $goDom = $('<div class="page-go"></div>');
            $goDom.append('<span>向第</span><input class="go-value" type="text"><span>页</span><button class="go-btn">跳转</button>');
            $obj.append($goDom);
        }
    },
    //绑定事件
    bind: function($obj, args) {
        var me = this;
        $obj.on("click", "a.page-num", function () {
            var current = parseInt($(this).text());
            Pagebar.fillHtml($obj, {
                isGo : args.isGo,
                current: current,
                pageCount: me.pageCount
            });
            if(Object.prototype.toString.call(args.callback) === "[object Function]"){
                args.callback(current);
            }
        });
        // 上一页
        $obj.on("click", "a.page-prev", function(){
            var current = parseInt($obj.find(".current").text());
            Pagebar.fillHtml($obj, {
                isGo : args.isGo,
                current: current - 1,
                pageCount: me.pageCount
            });
            if(Object.prototype.toString.call(args.callback) === "[object Function]"){
                args.callback(current - 1);
            }
        });
        // 下一页
        $obj.on("click","a.page-next",function(){
            var current = parseInt($obj.find(".current").text());
            Pagebar.fillHtml($obj, {
                isGo : args.isGo,
                current: current + 1,
                pageCount: me.pageCount
            });
            if(Object.prototype.toString.call(args.callback) === "[object Function]"){
                args.callback(current + 1);
            }
        });
        // 跳转
        $obj.on("click",".go-btn",function(){
            var current = parseInt($obj.find(".go-value").val());
            Pagebar.fillHtml($obj, {
                isGo : true,
                current: current,
                pageCount: me.pageCount
            });
            if(Object.prototype.toString.call(args.callback) === "[object Function]"){
                args.callback(current);
            }
        });
    }
}
$.fn.initPage = function(options) {
    var args = $.extend({
        isGo : false,
        callback: function (p) {
            console.log(p);
        }
    }, options);
    Pagebar.init(this, args);
}