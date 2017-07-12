var ko = require('ko');

var TimesheetNewPage = function (params, componentInfo) {
	TimesheetNewPage.prototype.init.call(this, params, componentInfo);
};

$.extend(TimesheetNewPage.prototype, {

	init: function (params, componentInfo) {
		var self = this;

	}
});

var template = require('./timesheetnewpage.html');
core.register('timesheetnewpage', TimesheetNewPage, template);