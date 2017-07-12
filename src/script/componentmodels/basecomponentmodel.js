var $ = require('jquery');
var ko = require('ko');

/**
 * Base class of ComponentModel.
 * @namespace componentmodel
 * @class BaseComponentModel
 */
var BaseComponentModel = function (params, componentInfo) {
	BaseComponentModel.prototype.init.call(this, params, componentInfo);
};

$.extend(BaseComponentModel.prototype, {
	properties: {
		notifygroup: {}
	},

	sample: null,

	init: function (params, componentInfo) {
		var self = this;

		self.sample = "THIS IS SAMPLE TEXT";

		var element = self.element = componentInfo.element;
		self.globaleventcallbacks = {};

		if (self.properties) {
			var attributeFilter = [];
			core.forEach(self.properties, function (name, property) {
				attributeFilter.push(name);

				var value = property.value;
				var nowValue = element.getAttribute(name);
				if (!nowValue && params && params[name])
					nowValue = ko.utils.unwrapObservable(params[name]);

				if (value && !nowValue && value !== nowValue) {
					element.setAttribute(name, value);
					nowValue = value;
				}

				var observableProperty = ko.observable(nowValue);
				observableProperty.$$observer = property.observer;
				observableProperty.subscribe(function (value) {
					var current = element.getAttribute(name);
					if (current !== value) {
						if (value) {
							element.setAttribute(name, value);
						} else {
							element.removeAttribute(name);
						}
					}
				});
				self[name] = observableProperty;
			});

			if (attributeFilter.length !== 0) {
				var _ignoreUpdate = false;
				var _mutationRecordsList = [];
				var _timerId = 0;

				var onUpdateAttribute = function () {
					try {
						_timerId = 0;
						_ignoreUpdate = true;
						if (_mutationRecordsList.length !== 0) {
							self._mutationObserverCallback(_mutationRecordsList);
						}
					} finally {
						_ignoreUpdate = false;
						_mutationRecordsList = [];
					}
				};

				var startUpdateTimer = function () {
					if (_timerId) {
						window.clearTimeout(_timerId);
					}

					if (_mutationRecordsList.length !== 0) {
						_timerId = window.setTimeout(onUpdateAttribute);
					}
				};

				var bindings = (function () {
					var provider = ko.bindingProvider.instance;
					var getBindings = provider.getBindingAccessors;
					return getBindings.call(provider, element, ko.contextFor(element));
				})();

				if (bindings && 'attr' in bindings) {
					var oldAttrValue = {};
					ko.computed(function () {
						var newAttrValue = {};
						var bindingAttribute = ko.unwrap(bindings.attr()) || {};
						core.forEach(attributeFilter, function (name) {
							if (name in bindingAttribute) {
								var value = ko.unwrap(bindingAttribute[name]);
								if (core.isNullOrUndefined(value)) {
									value = null;
								}
								newAttrValue[name] = String(value);
							}
						});

						if (!ko.computedContext.isInitial()) {
							core.forEach(newAttrValue, function (name, value) {
								if (oldAttrValue[name] !== value) {
									_mutationRecordsList.push({ attributeName: name });
								}
							});

							startUpdateTimer();
						}

						oldAttrValue = newAttrValue;
					}, null, { disposeWhenNodeIsRemoved: element });
				}

				core.forEach(attributeFilter, function (name) {
					self[name].subscribe(function () {
						if (_ignoreUpdate !== true) {
							_mutationRecordsList.push({ attributeName: name });
							startUpdateTimer();
						}
					});
				});
			}
		}
	},

	_mutationObserverCallback: function (mutationRecordsList) {
		var self = this;
		var element = self.element;
		var end = [];
		var observer = {};

		core.forEach(mutationRecordsList, function (mutationRecords) {
			var name = mutationRecords.attributeName;

			if (!end[name]) {
				end[name] = true;
				self[name](element.getAttribute(name));

				var $$observer = self[name].$$observer;
				if ($$observer) {
					observer[$$observer] = null;
				}
			}
		});

		core.forEach(observer, function (name, temp) {
			if ($.isFunction(self[name])) {
				self[name]();
			}
		});
	},
	on: function (eventname, callback) {
		var self = this;
		if (core.isEmpty(self.notifygroup()))
			return;
		if (self.globaleventcallbacks[eventname]) {
			self.off(eventname);
		}
		core.EventTrigger.on(self.notifygroup() + '.' + eventname, callback);
		self.globaleventcallbacks[eventname] = callback;
	},

	off: function (eventname) {
		var self = this;
		if (core.isEmpty(self.notifygroup()))
			return;
		core.EventTrigger.off(self.notifygroup() + '.' + eventname, self.globaleventcallbacks[eventname]);
		delete self.globaleventcallbacks[eventname];
	},

	trigger: function (eventname, args) {
		var self = this;
		if (core.isEmpty(self.notifygroup()))
			return;
		core.EventTrigger.trigger(self.notifygroup() + '.' + eventname, args);
	},

	triggerEvent: function (/* eventName, argments */) {
		var self = this,
			eventname = arguments[0],
			args = Array.prototype.slice.call(arguments, 1, arguments.length);

		$(self.element).trigger(eventname, args);
	},

	removeGlobalEventCallback: function(notifygroup) {
		var self = this;
		var group = notifygroup || self.notifygroup();
		if (!core.isEmpty(group)) {
			core.forEach(self.globaleventcallbacks, function(eventname, callback) {
				self.off(eventname);
			});
		}
	},

	dispose: function() {
		var self = this;

		if(self.binding)
			self.binding.dispose();
		
		for (var prop in self) {
		    if (prop in self && ko.isComputed(self[prop])) {
		    	self[prop].dispose();
		    	self[prop] = null;
		    }
		}
		
		if (self._ispstargetexist) {
			$.eventtimer.off($(window), '.pscontroller' + self.coreId);
		}
		
		if (self._attributesubscriptions) {
			core.forEach(self._attributesubscriptions, function(subscription) {
				subscription.dispose();
			});
			self._attributesubscriptions.length = 0;
		}
		
		self.removeGlobalEventCallback();

	},
});

core.ComponentModels.BaseComponentModel = BaseComponentModel;

module.exports = BaseComponentModel;