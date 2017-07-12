var ko = require('ko');

var MarketTopPage = function (params, componentInfo) {
	MarketTopPage.prototype.init.call(this, params, componentInfo);
};

$.extend(MarketTopPage.prototype, {
	marketData: null,
	init: function (params, componentInfo) {
		var self = this;
		self.marketData = ko.observableArray();
		self.getapidata = function () {
			var data = [];
			$.ajax({
				type: "GET",
				dataType: "json",
				url: 'https://api.iextrading.com/1.0/tops',
				data: {},
				// async: false,
				success: function (response) {
					if (response) {
						for (var i = 0; i < response.length; i++) {
							data.push(core.Parsers.MarketTopParser.parse(response[i]));
						}
						sessionStorage.setItem('marketTopData', ko.toJSON(data));
						self.marketData(data);
					}
				},
				error: function () {
					console.log('error');
				}
			});
		};
		self.getapidata();
	}
});

var template = require('./markettoppage.html');
core.register('markettoppage', MarketTopPage, template);