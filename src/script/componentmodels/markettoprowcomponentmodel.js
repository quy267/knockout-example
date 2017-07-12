var $ = require('jquery');
var ko = require('ko');

var BaseComponentModel = core.ComponentModels.BaseComponentModel;

/**
 * Base class of ComponentModel.
 * @namespace componentmodel
 * @class MarketTopRowComponentModel
 */
var MarketTopRowComponentModel = function (params, componentInfo) {
	MarketTopRowComponentModel.prototype.init.call(this, params, componentInfo);
};

core.extendComponentModel(MarketTopRowComponentModel.prototype, BaseComponentModel.prototype, {
	data: null,
	actionClick: null,
	init: function (params, componentInfo) {
		var self = this;
		BaseComponentModel.prototype.init.call(this, params, componentInfo);

		self.data = params.data;
		self.actionClick = function (index) {
			core.EventTrigger.trigger('market.onmarketdetail', {index: index});
			core.EventTrigger.trigger('sidenav.setTabs', {tab: 'markettop'});
		};

	},

});

core.ComponentModels.MarketTopRowComponentModel = MarketTopRowComponentModel;

module.exports = MarketTopRowComponentModel;


