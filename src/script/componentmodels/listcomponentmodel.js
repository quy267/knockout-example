var $ = require('jquery');
var ko = require('ko');

/**
 * Base class of ComponentModel.
 * @namespace componentmodel
 * @class ListComponentmodel
 */
var ListComponentmodel = function (params, componentInfo) {
	ListComponentmodel.prototype.init.call(this, params, componentInfo);
};

$.extend(ListComponentmodel.prototype, {
	holidays: [],
	month: null,
	days: [],
	init: function (params, componentInfo) {
		var self = this;
		self.month = ko.observable('201705');

		self.holidays = ko.computed(function () {
			var holidays = {},
				date = new Date($.getMonthFromYM(self.month()) + '-01'),
				minDate = $.getDateYMD(date) + 'T00:00:00Z',
				maxDate = $.getDateYMD(new Date(date.getFullYear(), date.getMonth() + 1, 0)) + 'T00:00:00Z';

			self.days = '';

			$.ajax({
				type: "GET",
				dataType: "json",
				url: 'https://www.googleapis.com/calendar/v3/calendars/outid3el0qkcrsuf89fltf7a4qbacgt9@import.calendar.google.com/events?key=AIzaSyAxkABVzcgmGN-_wLTlZ8olPrCCPn2ktUE&timeMin=' + minDate + '&timeMax=' + maxDate + '&maxResults=31&orderBy=startTime&singleEvents=true',
				data: {},
				async: false,
				success: function (response) {
					if (response.items) {
						for (var i = 0; i < response.items.length; i++) {
							holidays[(response.items[i].originalStartTime.date)] = {
								date: response.items[i].originalStartTime.date,
								text: "Work off <br>" + response.items[i].summary
							};
						}
					}
				},
				error: function () {
					console.log('error');
				}
			});
			return holidays;
		}, self);

		self.days = ko.computed(function () {
			var date = new Date($.getMonthFromYM(self.month()) + '-01'),
				i,
				dayInMonth = [],
				day,
				newDate,
				newDateFormated,
				firstDate = date.getDate(),
				lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

			for (i = firstDate; i <= lastDate; i++) {
				newDate = new Date(date.getFullYear(), date.getMonth(), i);
				newDateFormated = $.getDateYMD(newDate);
				day = {
					date: newDateFormated,
					holiday: {text: '-'},
					holidayClass: null
				};
				if (newDate.getDay() === 6 || newDate.getDay() === 0) {
					day.holiday = {text: 'Work off'};
					day.holidayClass = 'holiday blue-grey lighten-5';
				}
				if (newDateFormated in self.holidays()) {
					day.holiday = self.holidays()[newDateFormated];
					day.holidayClass = 'holiday blue-grey lighten-5';
				}
				dayInMonth.push(day);
			}
			return dayInMonth;
		});
		self.datePicker();
	},
	datePicker: function () {
		$('.datepicker').pickadate({
			selectMonths: true,
			selectYears: 15,
			format: 'yyyymm',
			onSet: function( arg ){
				if ( 'select' in arg ){
					this.close();
				}
			}
		});
	}
});

core.ComponentModels.ListComponentmodel = ListComponentmodel;

module.exports = ListComponentmodel;


