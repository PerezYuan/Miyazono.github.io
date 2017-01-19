/**
 * miyazono.js 简单的弹出窗插件
 * @author yuanzimin
 * @time 2015-11-23
 */

define('miyazono',['tipsDialog'], function(_tipsDialog_) {
    $.extend({
        Tips : function (options) {
            let tipsDialog = new _tipsDialog_(options);
        }
    });
});