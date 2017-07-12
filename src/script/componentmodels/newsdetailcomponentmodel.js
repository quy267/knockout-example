var $ = require('jquery');
var ko = require('ko');

var BaseComponentModel = core.ComponentModels.BaseComponentModel;
/**
 * Base class of ComponentModel.
 * @namespace componentmodel
 * @class NewsDetailComponentModel
 */
var NewsDetailComponentModel = function (params, componentInfo) {
	NewsDetailComponentModel.prototype.init.call(this, params, componentInfo);
};

core.extendComponentModel(NewsDetailComponentModel.prototype, BaseComponentModel.prototype, {
	properties: {
		articleIndex: {},
		position: {}
	},
	currentIndex: null,
	nextDisabled: false,
	backDisabled: false,
	article: null,
	init: function (params, componentInfo) {
		var self = this;
		BaseComponentModel.prototype.init.call(this, params, componentInfo);

		self.currentIndex = ko.observable(self.articleIndex());
		self.article = ko.computed(function () {
			if (self.currentIndex() === null) return false;
			var index = self.currentIndex();
			var articles = self.getArticles();
			return articles[index];
		});

		self.backDisabled = ko.computed(function () {
			return self.currentIndex() === null || self.currentIndex() == '0';
		});

		self.nextDisabled = ko.computed(function () {
			var articles = self.getArticles();
			return self.currentIndex() == articles.length - 1;
		});

		self.on('setSideNavArticle', function (args) {
			self.currentIndex(args.articleIndex);
		});
	},
	getArticles: function () {
		var articles = ko.utils.parseJson(sessionStorage.getItem('newsData'));
		return (articles) ? articles : [];
	},
	switchArticle: function (direction) {
		var currentIndex = this.currentIndex();
		if (!currentIndex) currentIndex = 0;
		var articles = this.getArticles();
		var maxIndex = articles.length - 1;
		if (direction == 'next' && !this.nextDisabled()) {
			if (currentIndex == maxIndex) {
				currentIndex = 0;
			} else {
				currentIndex++;
			}
		} else if (direction == 'back' && !this.backDisabled()) {
			if (currentIndex === 0) {
				currentIndex = maxIndex;
			} else {
				currentIndex--;
			}
		}

		this.currentIndex(currentIndex);
	},
});

core.ComponentModels.NewsDetailComponentModel = NewsDetailComponentModel;

module.exports = NewsDetailComponentModel;
