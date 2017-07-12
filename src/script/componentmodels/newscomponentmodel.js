var $ = require('jquery');
var ko = require('ko');
var router = require('router');

var BaseComponentModel = core.ComponentModels.BaseComponentModel;
/**
 * Base class of ComponentModel.
 * @namespace componentmodel
 * @class NewsComponentModel
 */
var NewsComponentModel = function (params, componentInfo) {
	NewsComponentModel.prototype.init.call(this, params, componentInfo);
};

core.extendComponentModel(NewsComponentModel.prototype, BaseComponentModel.prototype, {
	articles: ko.observableArray(),
	sourceName: ko.observable(''),
	init: function (params, componentInfo) {
		var self = this;

		BaseComponentModel.prototype.init.call(this, params, componentInfo);

		self.on('sourceChange', function (args) {
			var newsSourceUrl = 'https://newsapi.org/v1/articles?source=' + args.id + '&sortBy=top&apiKey=b0818ba87ea94e3f9c4f70e3e2af5348';
			$.getJSON(newsSourceUrl, function (data) {
				var articles = [];
				data.articles.forEach(function (item, index) {
					articles.push(new core.Models.Article(item));
				});
				sessionStorage.setItem('newsData', ko.toJSON(articles));
				self.articles(articles);
				self.sourceName(args.name);
			});
		});
	},
	setSideNavArticle: function (index) {
		core.EventTrigger.trigger('newsdetail.setSideNavArticle', {articleIndex: index});
		core.EventTrigger.trigger('sidenav.setTabs', {tab: 'news'});
	}
});

core.ComponentModels.NewsComponentModel = NewsComponentModel;

module.exports = NewsComponentModel;
