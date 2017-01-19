;(function() {
/**
 * @author perezyuan.
 * @time 2016/12/19.
 * @desc tip组件.
 */
var tipsDialog = {}, miyazono = {};
tipsDialog = function (exports) {
  var tipsDialog = function (option) {
    this.config = {
      type: 'success',
      //成功：success;错误：error;
      text: '请输入相关提示信息',
      //提示文字
      timeout: 1500,
      //时间延时
      imageUrl: ''  //图片icon地址
    };
    this.init(option);
  };
  //tips类相关函数
  tipsDialog.prototype = {
    init: function (option) {
      var me = this;
      me.config = $.extend(this.config, option || {});
      me.generateHtml();
    },
    resizePos: function () {
      var me = this;
      var _width = parseInt(me.$el.width());
      var _height = parseInt(me.$el.height());
      me.$el.css('marginLeft', -_width / 2);
      me.$el.css('marginTop', -_height / 2 + 30);
    },
    /**
     * @method 生成html
     */
    generateHtml: function () {
      var me = this;
      var _html = '';
      switch (me.config.type) {
      case 'success':
        _html = '<div id="miyaTips" class="miya-tips miya-tips-success"><i></i><span>' + me.config.text + '</span></div>';
        break;
      case 'error':
        _html = '<div id="miyaTips" class="miya-tips miya-tips-error"><i></i><span>' + me.config.text + '</span></div>';
        break;
      default:
        console.warn('no this type for miyazono~!');
        return false;
        break;
      }
      var $el = me.$el = $(_html);
      if ($('#miyaTips').length > 0) {
        return;
      }
      me.generateCss();
      me.resizePos();
      me.removeHtml();
    },
    /**
     * @method 生成css样式
     */
    generateCss: function () {
      var me = this;
      //弹出确认窗外部盒子样式
      me.$el.css({
        position: 'fixed',
        top: '50%',
        left: '50%',
        borderRadius: '3px',
        padding: '10px',
        fontFamily: '"microsoft yahei", "Arial", "Helvetica", sans-serif',
        fontSize: '14px',
        zIndex: '999999'
      });
      me.$el.find('i').css({
        display: 'inline-block',
        width: '17px',
        height: '17px',
        verticalAlign: 'middle',
        marginRight: '10px',
        backgroundImage: 'url(' + me.config.imageUrl + ')',
        backgroundSize: '100%'
      });
      me.$el.find('span').css({ verticalAlign: 'middle' });
      switch (me.config.type) {
      case 'success':
        me.$el.css({
          border: '1px solid #00ba45',
          backgroundColor: '#c9ffda',
          color: '#00802f'
        });
        break;
      case 'error':
        me.$el.css({
          border: '1px solid #f6b9b9',
          backgroundColor: '#ffe4e4',
          color: '#b94a48'
        });
        break;
      default:
        break;
      }
      $('body').append(me.$el);
    },
    /**
     * @method 删除html
     */
    removeHtml: function () {
      var me = this;
      var _height = parseInt(me.$el.height());
      me.$el.animate({ marginTop: -_height / 2 - 30 }, function () {
        setTimeout(function () {
          me.$el.remove();
        }, me.config.timeout);
      });
    }
  };
  return tipsDialog;
}(tipsDialog);
miyazono = function (exports, _tipsDialog_) {
  var tipsDialog = _tipsDialog_;
  $.extend({
    Tips: function (options) {
      let tipsDialog = new tipsDialog(options);
    }
  });
  return exports;
}(miyazono, tipsDialog);
}());