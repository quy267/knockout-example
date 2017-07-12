var $ = require('jquery');
var ko = require('ko');

/*var Utility = function () {
	Utility.prototype.init.call(this);
};*/

// Extends Jquery
$.extend($, {
	getDateYMD: function (dateObj) {
		var mm = dateObj.getMonth() + 1,
			dd = dateObj.getDate();
		return [dateObj.getFullYear(),
			(mm > 9 ? '' : '0') + mm,
			(dd > 9 ? '' : '0') + dd
		].join('-');
	},
	getMonthFromYM: function (input) {
		return input.substring(4, 0) + '-' + input.substring(4);
	},
	numberFormat: function (n, symbol) {
		if (!symbol) symbol = '';
		return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + symbol;
	},
	toJson: function (object) {
		return ko.toJSON(object);
	},
	parseJson: function (string) {
		return ko.utils.parseJson(string);
	},

});

/*module.exports = Utility;*/