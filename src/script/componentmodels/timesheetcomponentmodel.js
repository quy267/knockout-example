var $ = require('jquery');
var ko = require('ko');

String.prototype.paddingLeft = function (paddingValue) {
	return String(paddingValue + this).slice(-paddingValue.length);
};

/**
 * Base class of ComponentModel.
 * @namespace componentmodel
 * @class TimesheetComponentModel
 */
var TimesheetComponentModel = function (params, componentInfo) {
	TimesheetComponentModel.prototype.init.call(this, params, componentInfo);
};

$.extend(TimesheetComponentModel.prototype, {
	date: ko.observable(''),
	start: ko.observable('09:00'),
	end: ko.observable('18:00'),
	dateStart: null,
	dateEnd: null,
	timeSpent: null,
	overTime: null,
	allowRangePick: ko.observable(false),
	emptyTime: '00:00',
	timeSpentStatus: null,
	initDatePicker: function () {
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15, // Creates a dropdown of 15 years to control year
			format: 'yyyy/mm/dd',
		});
	},
	init: function (params, componentInfo) {
		var self = this;

		$('.timepicker').pickatime({
			autoclose: true,
			format: 'h:i',
			ampmclickable: false,
			twelvehour: false
		});

		self.initDatePicker();

		self.timeSpent = ko.computed(function () {
			if (!self.start() || !self.end()) {
				return self.emptyTime;
			}
			var startInMinute = self.getMinuteFromTime(self.start());
			var endInMinute = self.getMinuteFromTime(self.end());
			var diffInMinute = endInMinute - startInMinute;
			return self.formatTime(diffInMinute);
		});

		self.overTime = ko.pureComputed(function () {
			var timeSpentInMinute = self.getMinuteFromTime(self.timeSpent());
			if (timeSpentInMinute <= 480) {
				return self.emptyTime;
			}
			var overTimeInMinute = timeSpentInMinute - 480;
			return self.formatTime(overTimeInMinute);
		});

		self.timeSpentStatus = ko.computed(function () {
			var timeSpentInMinute = self.getMinuteFromTime(self.timeSpent());
			if (timeSpentInMinute < 480) {
				return 'yellow-text';
			} else if (timeSpentInMinute == 480) {
				return 'green-text';
			} else {
				return 'red-text';
			}
		});
	},
	getMinuteFromTime: function (time) {
		return parseInt(time.substr(0, 2)) * 60 + parseInt(time.substr(3, 2));
	},
	formatTime: function (timeCountInMinute) {
		var hour = parseInt(timeCountInMinute / 60);
		var minute = timeCountInMinute % 60;
		return hour.toString().paddingLeft('00') + ':' + minute.toString().paddingLeft('00');
	},
	toggleRangePicker: function () {
		this.initDatePicker();
	},
});

core.ComponentModels.TimesheetComponentModel = TimesheetComponentModel;

module.exports = TimesheetComponentModel;