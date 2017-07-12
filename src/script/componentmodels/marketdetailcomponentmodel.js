var $ = require('jquery');
var ko = require('ko');
var BaseComponentModel = core.ComponentModels.BaseComponentModel;
/**
 * Base class of ComponentModel.
 * @namespace componentmodel
 * @class MarketDetailComponentModel
 */
var MarketDetailComponentModel = function (params, componentInfo) {
	MarketDetailComponentModel.prototype.init.call(this, params, componentInfo);
};

core.extendComponentModel(MarketDetailComponentModel.prototype, BaseComponentModel.prototype, {
	properties: {
		marketindex: {}
	},
	data: null,
	index: null,
	apidata: null,
	nextitem: null,
	previtem: null,
	btndisable: null,
	init: function (params, componentInfo) {
		var self = this;
		BaseComponentModel.prototype.init.call(this, params, componentInfo);

		self.apidata = ko.utils.parseJson(sessionStorage.getItem('marketData'));
		self.index = ko.observable(self.marketindex());

		self.data = ko.pureComputed(function () {
			return self.apidata[self.index()];
		});

		self.nextitem = function () {
			var maxindex = self.apidata.length - 1,
				index = parseInt(self.index());
			if (index < maxindex) {
				self.index(index + 1);
			}
		};

		self.previtem = function () {
			var minindex = 0,
				index = parseInt(self.index());
			if (index > minindex) {
				self.index(index - 1);
			}
		};

		self.btndisable = ko.computed(function () {
			var nextbtn = null,
				prevbtn = null,
				index = parseInt(self.index());

			if (index === self.apidata.length - 1) {
				nextbtn = 'disabled';
			}
			if (index === 0) {
				prevbtn = 'disabled';
			}
			var rs = {
				prevbtn: prevbtn,
				nextbtn: nextbtn,
			};
			return rs;
		});
	},


});

core.ComponentModels.MarketDetailComponentModel = MarketDetailComponentModel;

module.exports = MarketDetailComponentModel;


