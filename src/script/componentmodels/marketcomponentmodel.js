var $ = require('jquery');
var ko = require('ko');

var BaseComponentModel = core.ComponentModels.BaseComponentModel;

/**
 * Base class of ComponentModel.
 * @namespace componentmodel
 * @class MarketComponentModel
 */
var MarketComponentModel = function (params, componentInfo) {
	MarketComponentModel.prototype.init.call(this, params, componentInfo);
};

core.extendComponentModel(MarketComponentModel.prototype, BaseComponentModel.prototype, {
	properties: {
		marketindex: {},
	},
	marketData: null,
	total: null,
	btndisable: null,
	today: function () {
		var now = new Date(),
			months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			formattedDate = months[now.getMonth()] + ' ' + now.getDate() + ", " + now.getFullYear();
		return formattedDate;
	},
	init: function (params, componentInfo) {
		var self = this;
		BaseComponentModel.prototype.init.call(this, params, componentInfo);

		self.marketData = ko.observableArray();
		self.getapidata = function () {
			var data = [];
			$.ajax({
				type: "GET",
				dataType: "json",
				url: 'https://api.iextrading.com/1.0/market',
				data: {},
				// async: false,
				success: function (response) {
					if (response) {
						for (var i = 0; i < response.length; i++) {
							data.push(core.Parsers.MarketParser.parse(response[i]));
						}
						self.marketData(data);
						sessionStorage.setItem('marketData', $.toJson(self.marketData()));
					}
				},
				error: function () {
					console.log('error');
				}
			});

			return data;
		};
		self.getapidata();

		self.total = ko.computed(function () {
			var tapeA = 0,
				tapeB = 0,
				tapeC = 0,
				percent = 0
				;
			for (var i = 0; i < self.marketData().length; ++i) {
				tapeA += self.marketData()[i].tapea;
				tapeB += self.marketData()[i].tapeb;
				tapeC += self.marketData()[i].tapec;
				percent += self.marketData()[i].marketpercent;
			}
			var result = {
				totalTapeA: tapeA,
				totalTapeB: tapeB,
				totalTapeC: tapeC,
				totalTape: tapeA + tapeB + tapeC,
				totalPercent: core.numberRound(percent, 0)
			};
			return result;
		}, self);

		self.marketindex = ko.observable(0);
	},

	modalopen: function (data) {
		var self = this;
		self.marketindex(data);
	}

});

core.ComponentModels.MarketComponentModel = MarketComponentModel;

module.exports = MarketComponentModel;


