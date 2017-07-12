var $ = require('jquery');
var core = require('core');

function Article(raw) {
    Article.prototype.init.call(this, raw);
}

$.extend(Article.prototype, {
    title: null,
    description: null,
    url: null,
    urlToImage: null,
    init: function (raw) {
        var self = this;

        self.title = ko.observable(raw ? raw.title : null);
        self.description = ko.observable(raw ? raw.description : null);
        self.url = ko.observable(raw ? raw.url : null);
        self.urlToImage = ko.observable(raw ? raw.urlToImage : null);
    }
});

core.Models.Article = Article;
