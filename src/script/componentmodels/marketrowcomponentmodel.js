var $ = require('jquery');
var ko = require('ko');

/**
 * Base class of ComponentModel.
 * @namespace componentmodel
 * @class MarketRowComponentModel
 */
var MarketRowComponentModel = function (params, componentInfo) {
	MarketRowComponentModel.prototype.init.call(this, params, componentInfo);
};

$.extend(MarketRowComponentModel.prototype, {
	data: null,
	init: function (params, componentInfo) {
		var self = this;
		self.data = params.data;
	},
	modalopen: function (data) {

		return function (data) {
			$('#modal1').openModal();
		};
	}
});

core.ComponentModels.MarketRowComponentModel = MarketRowComponentModel;

module.exports = MarketRowComponentModel;


