var $ = require('jquery');
var ko = require('ko');
var router = require('router');

var BaseComponentModel = core.ComponentModels.BaseComponentModel;

var SideNavComponentmodel = function (params, componentInfo) {
	SideNavComponentmodel.prototype.init.call(this, params, componentInfo);
};

core.extendComponentModel(SideNavComponentmodel.prototype, BaseComponentModel.prototype, {

	properties: {
		theme: {}
	},

	init: function (params, componentInfo) {
		var self = this;

		BaseComponentModel.prototype.init.call(this, params, componentInfo);

		self.dateIndex = ko.observable();
		self.tabActive = ko.observable();

		self._customEventHdl = self.customEventHandler.bind(self);
		self.on('customevent', self._customEventHdl);

		self._onDateIdxChanged = self.onDateIndexChanged.bind(self);
		self.on('setSideHistory', self._onDateIdxChanged);

		self._onTabChanged = self.onTabChanged.bind(self);
		self.on('setTabs', self._onTabChanged);

		$('ul.tabs').tabs();
	},

	customEventHandler: function (args) {
		console.log('Function nay dung de lam gi day: ');
		console.log(args);
	},

	onDateIndexChanged: function (args) {
		if (!!args && args.dateIndex)
			this.dateIndex(args.dateIndex);
	},

	onTabChanged: function (args) {
		if (!!args && args.tab) {
			this.tabActive(args.tab);
			$('ul.tabs').tabs('select_tab', this.tabActive());
		}
	},

	dispose: function () {
		var self = this;

		self.off('customevent', self._customEventHdl);
		self.off('setSideHistory', self._onDateIdxChanged);
		self.off('setTabs', self._onTabChanged);

		self._customEventHdl = null;
		self._onDateIdxChanged = null;
		self._onTabChanged = null;

		BaseComponentModel.prototype.dispose.call(this);
	}
});

core.ComponentModels.SideNavComponentmodel = SideNavComponentmodel;

module.exports = SideNavComponentmodel;