var $ = require('jquery');
var core = require('core');

function MarketTop(raw) {
	MarketTop.prototype.init.call(this, raw);
}

$.extend(MarketTop.prototype, {

	symbol: null,
	bidsize: null,
	bidprice: null,
	asksize: null,
	askprice: null,
	volume: null,
	lastsaleprice: null,
	lastsalesize: null,
	lastsaletime: null,
	lastupdated: null,
	marketpercent: null,

	init: function (raw) {
		var self = this;

		// self.marketcode = ko.observable(raw ? raw.marketcode : null);
		self.symbol = ko.observable(raw ? raw.symbol : null);
		self.bidsize = ko.observable(raw ? raw.bidPrice : null);
		self.bidprice = ko.observable(raw ? raw.bidPrice : null);
		self.asksize = ko.observable(raw ? raw.askSize : null);
		self.askprice = ko.observable(raw ? raw.askPrice : null);
		self.volume = ko.observable(raw ? raw.volume : null);
		self.lastsaleprice = ko.observable(raw ? raw.lastSalePrice : null);
		self.lastsalesize = ko.observable(raw ? raw.lastSaleSize : null);
		self.lastsaletime = ko.observable(raw ? raw.lastSaleTime : null);
		self.lastupdated = ko.observable(raw ? raw.lastUpdated : null);
		self.marketpercent = ko.observable(raw ? raw.marketPercent : null);
		// self.lastupdated = ko.observable(raw ? raw.lastupdated : null);

	},


	update: function (raw) {
		var self = this;
		self.symbol = ko.observable(raw ? raw.symbol : null);
		self.bidsize = ko.observable(raw ? raw.bidPrice : null);
		self.bidprice = ko.observable(raw ? raw.bidPrice : null);
		self.asksize = ko.observable(raw ? raw.askSize : null);
		self.askprice = ko.observable(raw ? raw.askPrice : null);
		self.volume = ko.observable(raw ? raw.volume : null);
		self.lastsaleprice = ko.observable(raw ? raw.lastSalePrice : null);
		self.lastsalesize = ko.observable(raw ? raw.lastSaleSize : null);
		self.lastsaletime = ko.observable(raw ? raw.lastSaleTime : null);
		self.lastupdated = ko.observable(raw ? raw.lastUpdated : null);
		self.marketpercent = ko.observable(raw ? raw.marketPercent : null);
		self.state('updated');
	},

});

core.Models.MarketTop = MarketTop;

core.Parsers.MarketTopParser = {

	parse: function (message) {
		var raw = {};

		core.Parsers.MarketTopParser.update(raw, message);

		return raw;
	},

	update: function (raw, message) {
		// raw.marketcode = message && message.marketcode ? message.marketcode : null;
		raw.symbol = message && message.symbol ? message.symbol : null;
		// raw.marketpercent = message && message.marketPercent ? message.marketPercent : null;
		raw.bidsize = message && message.bidSize ? message.bidSize : 0;
		raw.bidprice = message && message.bidPrice ? message.bidPrice : 0;
		raw.asksize = message && message.askSize ? message.askSize : 0;
		raw.askprice = message && message.askPrice ? message.askPrice : 0;
		raw.volume = message && message.volume ? message.volume : 0;
		raw.lastsaleprice = message && message.lastSalePrice ? message.lastSalePrice : 0;
		raw.lastsalesize = message && message.lastSaleSize ? message.lastSaleSize : 0;
		raw.lastsaletime = message && message.lastSaleTime ? message.lastSaleTime : 0;
		raw.lastupdated = message && message.lastUpdated ? message.lastUpdated : 0;
		raw.marketpercent = core.numberRound(raw.marketPercent * 100, 3);
		// raw.totaltape = raw.tapea + raw.tapeb + raw.tapec;
		// raw.lastupdated = message && message.lastupdated ? message.lastupdated : null;
	},

};