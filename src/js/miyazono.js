/**
 * miyazono.js 简单的弹出窗插件
 * @author perezyuan
 * @time 2017/01/20
 */

define('miyazono', [
        'TipsDialog',
        'ConfirmDialog'
    ], function(TipsDialog, ConfirmDialog) {
    $.extend({
        Tips : function (options) {
            let tipsDialog = new TipsDialog(options);
        },
        Confirm : function (options) {
            let confirmDialog = new ConfirmDialog(options);
        }
    });
});