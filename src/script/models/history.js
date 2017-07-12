var $ = require('jquery');
var core = require('core');

var BaseModel = core.Models.BaseModel;
function History(raw) {
	History.prototype.init.call(this, raw);
}

$.extend(History.prototype, BaseModel.prototype, {

	date: null,
	url: null,
	events: null,
	births: null,
	deaths: null,

	init: function (raw) {
		var self = this;

		BaseModel.prototype.init.call(this,raw);
		self.date = raw ? raw.date : null;
		self.url = raw ? raw.url : null;
		self.events = raw ? raw.events : null;
		self.births = raw ? raw.births : null;
		self.deaths = raw ? raw.deaths : null;
	},


	update: function (raw) {
		var self = this;

		self.date = raw ? raw.date : null;
		self.url = raw ? raw.url : null;
		self.events = raw ? raw.events : null;
		self.births = raw ? raw.births : null;
		self.deaths = raw ? raw.deaths : null;
	},

});

core.Models.History = History;

core.Parsers.HistoryParser = {

	parse: function (res) {
		var raw = {};

		core.Parsers.HistoryParser.update(raw, res);

		return raw;
	},

	update: function (raw, res) {
		raw.date = res && res.date ? res.date : null;
		raw.url = res && res.url ? res.url : null;
		raw.births = res && res.data ? res.data.Births : null;
		raw.deaths = res && res.data ? res.data.Deaths : null;
		raw.events = res && res.data ? res.data.Events : null;
	},

};