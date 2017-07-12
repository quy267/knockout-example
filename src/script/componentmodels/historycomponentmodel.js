var $ = require('jquery');
var ko = require('ko');

var HistoryService = core.ModelsService.HistoryService;
var BaseComponentModel = core.ComponentModels.BaseComponentModel;

var HistoryComponentModel = function (params, componentInfo) {
	HistoryComponentModel.prototype.init.call(this, params, componentInfo);
};

core.extendComponentModel(HistoryComponentModel.prototype, BaseComponentModel.prototype, {

	properties: {
		dateIndex: { observer: 'onConditionChanged' }
	},

	history: null,

	init: function (params, componentInfo) {
		var self = this;

		BaseComponentModel.prototype.init.call(this, params, componentInfo);

		self.history = ko.observable();
		self.isLoading = ko.observable(false);
	},

	onConditionChanged: function () {
		var self = this,
			dateIndex = ko.unwrap(self.dateIndex);

		if (!dateIndex) return;

		self.history(null);
		self.isLoading(true);
		HistoryService.findOfHistory(dateIndex)
		.done(function (source) {
			self.history(source);
			self.isLoading(false);
		})
		.fail(function (message) {
			self.isLoading(false);
			self.message(message);
		});
	},

});

core.ComponentModels.HistoryComponentModel = HistoryComponentModel;

module.exports = HistoryComponentModel;
