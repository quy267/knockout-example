var $ = require('jquery');
var ko = require('ko');

var router = require('router');

var BaseComponentModel = core.ComponentModels.BaseComponentModel;

var BasePage = function(params, componentInfo) {
	BasePage.prototype.init.call(this, params, componentInfo);
};

$.extend(BasePage.prototype, BaseComponentModel.prototype, {

	init: function(params, componentInfo) {
		var self = this;

		BaseComponentModel.prototype.init.call(this, params, componentInfo);

		self._params = params.params ? params.params : {};
		
		core.forEach(self._params, function(name, param) {
			if(ko.isObservable(param)) {
				self[name] = ko.computed(function() {
					return ko.utils.unwrapObservable(param);
				});

			} else {
				self[name] = param;

			}
		});

	},

	move: function(name, params) {
		router.transitionTo(name, params || {}, { replace : true });
	}
});

module.exports = BasePage;
