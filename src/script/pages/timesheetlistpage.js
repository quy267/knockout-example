var ko = require('ko');

var TimesheetListPage = function (params, componentInfo) {
    TimesheetListPage.prototype.init.call(this, params, componentInfo);
};

$.extend(TimesheetListPage.prototype, {

    init: function (params, componentInfo) {
        var self = this;

    }
});

var template = require('./timesheetlistpage.html');
core.register('timesheetlistpage', TimesheetListPage, template);