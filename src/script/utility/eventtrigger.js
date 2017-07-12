var $ = require('jquery');

var EventTrigger = function() {
	EventTrigger.prototype.init.call(this);
};

$.extend(EventTrigger.prototype, {

	_listeners: null,
	_validators: null,

	init: function() {
		var self = this;

		self._listeners = {};
		self._validators = {}; // { type: { key: [validators] } } type = 'string' or 'object'
	},

	addValidate: function(eventname, validator) {

		if (typeof eventname !== 'string' && !(evetnname instanceof RegExp))
			return;

		var self = this;

		// string or object
		var type = typeof eventname;
		var key = type === 'string' ? eventname : eventname.source;

		var validators = self._validators[type];

		if (!validators) {
			self._validators[type] = validators = {};
		}

		var funcs = self._validators[type][key];

		if (!funcs) {
			self._validators[type][key] = funcs = [];
		}

		if (funcs.indexOf(validator) >= 0)
			return;

		funcs.push(validator);
	},

	removeValidate: function(eventname, validator) {

		if (typeof eventname !== 'string' && !(evetnname instanceof RegExp))
			return;

		var self = this;

		var type = typeof eventname;
		var key = type === 'string' ? eventname : eventname.source;

		var validators = self._validators[type];
		if (!validators)
			return;

		var funcs = self._validators[type][key];
		if (!funcs)
			return;

		if ( 0 > funcs.indexOf(validator) )
			return;

		funcs.splice(funcs.indexOf(validator), 1);

		if (funcs.length === 0)
			delete self._validators[type][key];
	},

	on: function(eventname, callback) {
		var self = this;
		var listeners = self._listeners[eventname];

		if(!listeners) {
			listeners = [];
			self._listeners[eventname] = listeners;
		}

		if(listeners.indexOf(callback) >= 0)
			return;

		listeners.push(callback);
	},

	off: function(eventname, callback) {
		var self = this;
		var listeners = self._listeners[eventname];

		if(!listeners)
			return;

		if(0 > self._listeners[eventname].indexOf(callback))
			return;

		listeners.splice(listeners.indexOf(callback), 1);

		if (listeners.length === 0)
			delete self._listeners[eventname];
	},

	trigger: function(/*event, params*/) {
		var self = this,
			eventname = arguments[0],
			args = Array.prototype.slice.call(arguments, 1, arguments.length);

		if(!self._listeners[eventname])
			return;

		var isValid = true;
		
		core.forEach(self._validators, function(type, validators) {

			core.forEach(validators, function(key, funcs) {

				if (type === 'string' && key !== eventname)
					return;

				if (type !== 'string' && !(new RegExp(key).test(eventname)))
					return;

				core.forEach(funcs, function(validator) {
					if(isValid && validator && validator.apply)
						isValid = !!(validator.apply(null, args));
				});
			});
		});

		// 1つのeventnameについて複数のvalidatorが設定されている場合、
		// 1つでもfalseになると後続を処理しない
		if (!isValid)
			return;

		core.forEach(self._listeners[eventname], function(listener) {
			if(listener && listener.apply)
				listener.apply(null, args);
		});
	},

	triggerwithcondition: function(event, params, options) {
		var self = this,
			defaults = {
				target: null,
				delay: 0,
				retrycount: 1,
				retrydelay: 100,
			};

		options = $.extend(defaults, options);

		if (!nakasu.isNullOrUndefined(options.target)) {
			var element = $(options.target + '');
			if(!element || !element.length) {
				// check retry count
				if (options.retrycount--)
					setTimeout(function() { self.triggerwithcondition(event, params, options); }, options.retrydelay);

				return;
			}
		}

		setTimeout(function() { self.trigger(event, params); }, options.delay);
	},

	dispose: function() {
		var self = this;

		core.forEach(Object.getOwnPropertyNames(self._listeners), function(eventname) {
			var listeners = self._listeners[eventname];
			if($.isArray(listeners))
				listeners.length = 0;

			delete self._listeners[eventname];
		});

		core.forEach(Object.getOwnPropertyNames(self._validators), function(type) {
			var validators = self._validators[type];

			core.forEach(Object.getOwnPropertyNames(validators), function(key) {
				var funcs = self._validators[type][key];

				if($.isArray(funcs))
					funcs.length = 0;

				delete self._validators[type][key];
			});
		});
	}

});

module.exports = EventTrigger;