var $ = require('jquery');
var ko = require('ko');
var router = require('router');
/**
 * Base class of ComponentModel.
 * @namespace componentmodel
 * @class TableRowComponentModel
 */
var TableRowComponentModel = function (params, componentInfo) {
	TableRowComponentModel.prototype.init.call(this, params, componentInfo);
};
Date.prototype.getUnixTime = function () {
	return this.getTime() / 1000 | 0;
};
$.extend(TableRowComponentModel.prototype, {

	row: null,
	startTime: null,
	endTime: null,
	timeSpent: null,
	overTime: null,

	init: function (params) {
		var self = this;
		self.row = params.value;
		self.startTime = ko.observable('09:00');
		self.endTime = ko.observable('18:00');

		var date = '2017-05-01 ',
			timeOff = 3600,
			start, end, timeDiff, hours, minutes, timeSpendClass;


		self.timeSpent = ko.pureComputed(function () {
			end = new Date(date + self.endTime() + ':00').getUnixTime();
			start = new Date(date + self.startTime() + ':00').getUnixTime() + timeOff;
			timeDiff = end - start;
			hours = '0' + (Math.floor(timeDiff / 3600));
			minutes = '0' + Math.ceil((timeDiff - hours * 3600) / 60);

			if (timeDiff / 3600 > 8) {
				timeSpendClass = 'red-text';
			} else if (timeDiff / 3600 === 8) {
				timeSpendClass = 'green-text';
			} else {
				timeSpendClass = 'amber-text';
			}
			return {
				timeSpendClass: timeSpendClass,
				formated: hours.substr(-2) + ':' + minutes.substr(-2)
			};
		});

		self.overTime = ko.pureComputed(function () {
			end = new Date(date + self.endTime() + ':00').getUnixTime();
			start = new Date(date + self.startTime() + ':00').getUnixTime() + timeOff * 9;
			timeDiff = end - start;

			hours = (Math.floor(timeDiff / 3600));
			minutes = '0' + Math.ceil((timeDiff - hours * 3600) / 60);
			minutes = hours < 0 ? '00' : '0' + minutes;
			hours = hours < 0 ? '00' : '0' + hours;
			return hours.substr(-2) + ':' + minutes.substr(-2);
		});
		self.timePicker();
	},
	timePicker: function () {
		$('.timepicker').pickatime({
			autoclose: true,
			format: 'h:i',
			ampmclickable: false,
			twelvehour: false
		});
	},
	setSideHistory: function (data) {
		core.EventTrigger.trigger('sidenav.setSideHistory', {dateIndex: data});
		core.EventTrigger.trigger('sidenav.setTabs', {tab: 'list'});
	}

});

core.ComponentModels.TableRowComponentModel = TableRowComponentModel;

module.exports = TableRowComponentModel;