var $ = require('jquery');
var core = require('core');

function Market(raw) {
	Market.prototype.init.call(this, raw);
}

$.extend(Market.prototype, {

	marketcode: null,
	tapeid: null,
	venuename: null,
	volume: null,
	tapea: null,
	tapeb: null,
	tapec: null,
	marketpercent: null,
	lastupdated: null,

	init: function (raw) {
		var self = this;

		// self.marketcode = ko.observable(raw ? raw.marketcode : null);
		self.tapeid = ko.observable(raw ? raw.tapeid : null);
		self.venuename = ko.observable(raw ? raw.venuename : null);
		self.volume = ko.observable(raw ? raw.volume : null);
		self.tapea = ko.observable(raw ? raw.tapea : null);
		self.tapeb = ko.observable(raw ? raw.tapeb : null);
		self.tapec = ko.observable(raw ? raw.tapec : null);
		self.marketpercent = ko.observable(raw ? raw.marketpercent : null);
		// self.lastupdated = ko.observable(raw ? raw.lastupdated : null);

	},


	update: function (raw) {
		var self = this;

		// self.marketcode = ko.observable(raw ? raw.marketcode : null);
		self.tapeid = ko.observable(raw ? raw.tapeid : null);
		self.venuename = ko.observable(raw ? raw.venuename : null);
		self.volume = ko.observable(raw ? raw.volume : null);
		self.tapea = ko.observable(raw ? raw.tapea : null);
		self.tapeb = ko.observable(raw ? raw.tapeb : null);
		self.tapec = ko.observable(raw ? raw.tapec : null);
		self.marketpercent = ko.observable(raw ? raw.marketpercent : null);
		// self.lastupdated = ko.observable(raw ? raw.lastupdated : null);

		self.state('updated');
	},

});

core.Models.Market = Market;

core.Parsers.MarketParser = {

	parse: function (message) {
		var raw = {};

		core.Parsers.MarketParser.update(raw, message);

		return raw;
	},

	update: function (raw, message) {
		// raw.marketcode = message && message.marketcode ? message.marketcode : null;
		raw.tapeid = message && message.tapeId ? message.tapeId : null;
		raw.venuename = message && message.venueName ? message.venueName : null;
		raw.volume = message && message.volume ? message.volume : 0;
		raw.tapea = message && message.tapeA ? message.tapeA : 0;
		raw.tapeb = message && message.tapeB ? message.tapeB : 0;
		raw.tapec = message && message.tapeC ? message.tapeC : 0;
		raw.percent = message && message.marketPercent ? message.marketPercent : 0;
		raw.marketpercent = core.numberRound(raw.percent * 100, 3);
		raw.totaltape = raw.tapea + raw.tapeb + raw.tapec;
		// raw.lastupdated = message && message.lastupdated ? message.lastupdated : null;
	},

};