var $ = require('jquery');
var ko = require('ko');

var BaseComponentModel = core.ComponentModels.BaseComponentModel;
/**
 * Base class of ComponentModel.
 * @namespace componentmodel
 * @class NewsDetailComponentModel
 */
var NewsSourceComponentModel = function (params, componentInfo) {
	NewsSourceComponentModel.prototype.init.call(this, params, componentInfo);
};

core.extendComponentModel(NewsSourceComponentModel.prototype, BaseComponentModel.prototype, {
	properties: {
		articleIndex: {}
	},
	newsSources: null,
	init: function (params, componentInfo) {
		var self = this;
		BaseComponentModel.prototype.init.call(this, params, componentInfo);
		$(".news-source-toggle").sideNav({
			menuWidth: 300,
			closeOnClick: true
		});

		self.newsSources = ko.observable();
		self.on('sourceLoad', function (args) {
			self.newsSources(args.sources);
		});
	},
	switchNewsSource: function (id, name) {
		return function () {
			core.EventTrigger.trigger('news.sourceChange', {id: id, name: name});
		};
	}
});

core.ComponentModels.NewsSourceComponentModel = NewsSourceComponentModel;

module.exports = NewsSourceComponentModel;
