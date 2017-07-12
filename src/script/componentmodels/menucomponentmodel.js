var $ = require('jquery');
var ko = require('ko');
var router = require('router');

var BaseComponentModel = core.ComponentModels.BaseComponentModel;

var MenuComponentModel = function (params, componentInfo) {
	MenuComponentModel.prototype.init.call(this, params, componentInfo);
};

var linkNav = function (href, action, linkText, flagUrl) {
	this.url = href;
	this.actionLink = action;
	this.linkText = linkText;
	this.flagUrl = flagUrl;
};

core.extendComponentModel(MenuComponentModel.prototype, BaseComponentModel.prototype, {
	properties: {
		theme: {}
	},

	links: null,

	init: function (params, componentInfo) {
		var self = this;

		BaseComponentModel.prototype.init.call(this, params, componentInfo);

		self.links = ko.observableArray([
			new linkNav(null, 'news', 'News', false),
			new linkNav(null, 'new', 'Create New', false),
			new linkNav(null, 'list', 'List', false),
			new linkNav(null, 'market', 'Market', false),
			new linkNav(null, 'markettop', 'Market Top', false),
			new linkNav(null, 'logout', 'Logout', false),
		]);

		// Initialize collapse button
		$('.button-collapse').sideNav();
	},
	actionClick: function (actionName) {
		switch (actionName) {
			case 'logout':
				window.localStorage.removeItem('loggedin');
				application.isloggedin(false);

				router.transitionTo('login', null, { replace : true });
				break;
			case 'list':
				router.transitionTo('pc.list', null, { replace : true });
				break;
			case 'new':
				router.transitionTo('pc.new', null, { replace : true });
				break;
			case 'news':
				router.transitionTo('pc.news', null, { replace : true });
				break;
			case 'market':
				router.transitionTo('pc.market', null, { replace : true });
				break;
			case 'markettop':
				router.transitionTo('pc.markettop', null, { replace : true });
				break;
		}
	},

});

core.ComponentModels.MenuComponentModel = MenuComponentModel;

module.exports = MenuComponentModel;