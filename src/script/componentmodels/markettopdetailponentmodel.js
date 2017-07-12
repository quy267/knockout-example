var $ = require('jquery');
var ko = require('ko');
var router = require('router');

var BaseComponentModel = core.ComponentModels.BaseComponentModel;

var MarketTopDetailComponentmodel = function (params, componentInfo) {
	MarketTopDetailComponentmodel.prototype.init.call(this, params, componentInfo);
};

core.extendComponentModel(MarketTopDetailComponentmodel.prototype, BaseComponentModel.prototype, {
	properties: {
		theme: {},
		marketid: {},
	},
	id: null,
	marketdetail: null,
	init: function (params, componentInfo) {
		var self = this;
		BaseComponentModel.prototype.init.call(this, params, componentInfo);

		self.marketdetail = ko.observable();
		self.getdetail = ko.computed(function () {
			var data = null;
			if(!self.marketid())
				return false;

			$.ajax({
				type: "GET",
				dataType: "json",
				url: 'https://api.iextrading.com/1.0/tops',
				data: {
					symbols: self.marketid()
				},
				// async: false,
				success: function (response) {
					data = response;
					if(data[0])
						self.marketdetail(data[0]);
				},
				error: function () {
					console.log('error');
				}
			});
		});
		self.getdetail();

		self.on('onmarketdetail', function(args){
			self.marketid(args.index);
		});

	},
});

core.ComponentModels.MarketTopDetailComponentmodel = MarketTopDetailComponentmodel;

module.exports = MarketTopDetailComponentmodel;