var ko = require('ko'),
	BasePage = require('./basepage');

var MarketTopDetailPage = function (params, componentInfo) {
	MarketTopDetailPage.prototype.init.call(this, params, componentInfo);
};

$.extend(MarketTopDetailPage.prototype, BasePage.prototype, {
	init: function (params, componentInfo) {
		var self = this;
		BasePage.prototype.init.call(this, params, componentInfo);
	}
});

var template = require('./markettopdetailpage.html');
core.register('marketdetail', MarketTopDetailPage, template);