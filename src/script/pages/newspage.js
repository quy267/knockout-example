var ko = require('ko');

var BaseComponentModel = core.ComponentModels.BaseComponentModel;

var NewsPage = function (params, componentInfo) {
	NewsPage.prototype.init.call(this, params, componentInfo);
};

core.extendComponentModel(NewsPage.prototype, BaseComponentModel.prototype, {
	init: function (params, componentInfo) {
		var self = this;
		BaseComponentModel.prototype.init.call(this, params, componentInfo);

		$.getJSON('https://newsapi.org/v1/sources?language=en', function (data) {
			var sources = [];
			data.sources.forEach(function (item, index) {
				sources.push(item);
			});
			sessionStorage.setItem('newsSourceData', ko.toJSON(sources));
			core.EventTrigger.trigger('newssource.sourceLoad', {sources: sources});
			var firstSource = sources[0];
			core.EventTrigger.trigger('news.sourceChange', {id: firstSource.id, name: firstSource.name});
		});

		application.showNewsNav(true);
	},
	dispose: function () {
		application.showNewsNav(false);
	}
});

var template = require('./newspage.html');
core.register('newspage', NewsPage, template);