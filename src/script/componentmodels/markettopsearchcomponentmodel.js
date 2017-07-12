var $ = require('jquery');
var ko = require('ko');
var router = require('router');
var BaseComponentModel = core.ComponentModels.BaseComponentModel;

/**
 * Base class of ComponentModel.
 * @namespace componentmodel
 * @class MarketTopSearchComponentModel
 */
var MarketTopSearchComponentModel = function (params, componentInfo) {
	MarketTopSearchComponentModel.prototype.init.call(this, params, componentInfo);
};

core.extendComponentModel(MarketTopSearchComponentModel.prototype, BaseComponentModel.prototype, {
	properties: {
		marketindex: {},
	},
	marketdata: null,
	searchdata: null,
	autocomplete: null,
	selectkeyword: null,
	selected: null,
	keyword: null,
	focusinput: null,
	outfocusinput: null,
	enterfilter: null,
	selectedrow: null,
	selectnextrow: null,
	selectprevrow: null,
	init: function (params, componentInfo) {
		var self = this;
		BaseComponentModel.prototype.init.call(this, params, componentInfo);

		self.marketdata = ko.observableArray();
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
						self.marketdata(data);
					}
				},
				error: function () {
					console.log('error');
				}
			});
			return data;
		};
		self.getapidata();

		self.searchdata = self.marketdata();

		self.selected = ko.observable(false);
		self.keyword = ko.observable('');
		self.selectedrow = ko.observable('');

		self.autocomplete = ko.computed(function () {
			if (!self.keyword()) {
				return [];
			}
			var rs = ko.utils.arrayFilter(self.searchdata, function (prod) {
				return prod.symbol.indexOf(self.keyword()) !== -1 || prod.symbol.toLowerCase().indexOf(self.keyword()) !== -1;
			});
			return rs.slice(0, 15);
		});

		self.focusinput = function () {
			self.selected(false);
		};

		self.outfocusinput = function () {
			setTimeout(function () {
				self.selected(true);
			}, 200);
		};

		self.selectkeyword = function (data) {
			self.selectedrow(data);
			self.keyword(data.symbol);
			self.selected(true);
			router.transitionTo('pc.marketdetail', {id: self.selectedrow().symbol}, {replace: true});
		};

		self.enterfilter = function (data, event) {
			event.preventDefault();
			if (event.keyCode === 13) {
				if (self.selectedrow()) {
					self.keyword(self.selectedrow().symbol);
				}
				self.selected(true);
				$('input').blur();
				router.transitionTo('pc.marketdetail', {id: self.selectedrow().symbol}, {replace: true});
			}

			if (event.keyCode === 38) {
				self.selectprevrow();
			} else if (event.keyCode === 40) {
				self.selectnextrow();
			}
		};

		self.selectnextrow = function () {
			var index = self.autocomplete().indexOf(self.selectedrow()) + 1;

			if (index >= self.autocomplete().length) index = 0;
			self.selectedrow(self.autocomplete()[index]);
		};

		self.selectprevrow = function () {
			var index = self.autocomplete().indexOf(self.selectedrow()) - 1;
			if (index < 0) index = self.autocomplete().length - 1;
			self.selectedrow(self.autocomplete()[index]);
		};
	},

});

core.ComponentModels.MarketTopSearchComponentModel = MarketTopSearchComponentModel;

module.exports = MarketTopSearchComponentModel;


