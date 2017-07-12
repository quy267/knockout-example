$.support.cors = true;

var core = function () {
	core.prototype.init.call(this, raw);
};

$.extend(core, {
	ComponentModels: {},
	Models: {},
	ModelsService: {},
	Parsers: {},

	isObject: isObject,
	isString: isString,
	isArray: isArray,
	isNumber: isNumber,
	isInt: isInt,
	isFloat: isFloat,
	isFunction: isFunction,
	isDate: isDate,
	isDateValue: isDateValue,
	isNullOrUndefined: isNullOrUndefined,
	isEmpty: isEmpty,
	parseYYYYMMDD: parseYYYYMMDD,
	formatDate: formatDate,
	extend: extend,
	forEach: forEach,

	register: function (is, type, template) {
		var self = this,
			componentName = is;
		template = template || '';

		ko.components.register(componentName, {
			viewModel: {
				createViewModel: function (params, componentInfo) {
					if (!$.isFunction(type))
						throw 'Unknown ComponentModel type. (' + is + ', ' + type + ')';
					try {
						return new type(params, componentInfo);
					} catch (e) {
						console.log(e);
					}
				}
			},
			template: template
		});
	},
	numberRound: function (value, decimals) {
		return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
	},

	extendComponentModel: function () {
		if (2 > arguments.length)
			throw 'Illegal arguments.';

		var self = this;
		var target = arguments[0];
		var bases = [].slice.apply(arguments, [1, arguments.length]);

		ko.utils.arrayForEach(bases, function (base) {
			self._extendComponentModel(target, base);
		});
	},

	_extendComponentModel: function (target, source) {
		if (source) {
			for (var prop in source) {

				if (!source.hasOwnProperty(prop))
					continue;

				if (prop === 'properties') {
					if (source.properties) {
						if (!target['properties'])
							target.properties = {};

						extend(target.properties, source.properties);
					}
					continue;
				}

				if (prop === 'events') {
					if (source.events) {
						if (!target['events'])
							target.events = [];

						ko.utils.arrayPushAll(target.events, source.events);
					}
					continue;
				}

				target[prop] = source[prop];
			}
		}
		return target;
	},
	append: function ($parent, node, notBind) {
		var $node = $(node);
		$parent.append($node);
		if (notBind !== true) {
			try {
				var vm = ko.dataFor($node[0]);
				ko.applyBindings(vm, $node[0]);
			} catch (e) {
			}
		}
	},
	cleanNode: function ($nodes) {
		$nodes.each(function (i, element) {
			ko.cleanNode(element);
		});
		$nodes.remove();
	},

	browser: function () {
		return {
			safari: navigator.userAgent.toLowerCase().indexOf("safari") != -1,
			chrome: navigator.userAgent.toLowerCase().indexOf("chrome") != -1,
			firefox: navigator.userAgent.toLowerCase().indexOf("firefox") != -1,
			opera: navigator.userAgent.toLowerCase().indexOf("opera") != -1,
			netscape: navigator.userAgent.toLowerCase().indexOf("netscape") != -1,
			ie: navigator.userAgent.toLowerCase().indexOf("msie") != -1 　|| navigator.userAgent.toLowerCase().indexOf("trident/7") != -1,
			ie8: document.uniqueID && document.documentMode === 8,
			ie9: document.uniqueID && document.documentMode === 9,
			ie10: document.uniqueID && document.documentMode === 10,
			ie11: document.uniqueID && document.documentMode === 11,
			trident: document.uniqueID,
			edge: navigator.userAgent.toLowerCase().indexOf("edge") != -1,
			ios: navigator.userAgent.toLowerCase().indexOf("iphone") != -1 || navigator.userAgent.toLowerCase().indexOf("ipad") != -1 || navigator.userAgent.toLowerCase().indexOf("ipod") != -1,
			iphone: navigator.userAgent.toLowerCase().indexOf("iphone") != -1 || navigator.userAgent.toLowerCase().indexOf("ipod") != -1,
			ipad: navigator.userAgent.toLowerCase().indexOf("ipad") != -1,
			android: navigator.userAgent.toLowerCase().indexOf("android") != -1
		};
	}
});

// Extensions
$.support.cors = true;

var toString = Object.prototype.toString;

function isObject(value) {
	return value !== null && typeof value === 'object';
}

function isString(value) {
	return typeof value === 'string';
}

function isNumber(value) {
	return typeof value === 'number';
}

function isInt(value) {
	return Number(value) === value && value % 1 === 0;
}

function isFloat(value) {
	return value === Number(value) && !Number.isNaN(value);
}

var isArray = Array.isArray;

function isFunction(value) {
	return typeof value === 'function';
}

function isDate(value) {
	return toString.call(value) === '[object Date]';
}

function isDateValue(value) {
	return parseYYYYMMDD(value).toString() !== 'Invalid Date';
}

function isNullOrUndefined(value) {
	return value === null || value === undefined;
}

function isEmpty(value) {
	return value === null || value === undefined || value === '';
}

function parseYYYYMMDD(yyyymmdd) {
	if (!yyyymmdd)
		return yyyymmdd;

	yyyymmdd = yyyymmdd.replace(/[\/,:, ,年,月,日]/g, '');

	if (yyyymmdd.length === 6)
		return new Date(Number.parseInt(yyyymmdd.substr(0, 4)), Number.parseInt(yyyymmdd.substr(4, 2)) - 1, 1);

	if (yyyymmdd.length === 7)
		return new Date(Number.parseInt(yyyymmdd.substr(0, 4)), Number.parseInt(yyyymmdd.substr(4, 2)) - 1, 1);

	if (yyyymmdd.length === 8)
		return new Date(Number.parseInt(yyyymmdd.substr(0, 4)), Number.parseInt(yyyymmdd.substr(4, 2)) - 1, Number.parseInt(yyyymmdd.substr(6, 2)));

	if (yyyymmdd.length === 12)
		return new Date(Number.parseInt(yyyymmdd.substr(0, 4)), Number.parseInt(yyyymmdd.substr(4, 2)) - 1, Number.parseInt(yyyymmdd.substr(6, 2)), Number.parseInt(yyyymmdd.substr(8, 2)), Number.parseInt(yyyymmdd.substr(10, 2)));

	return new Date(Number.parseInt(yyyymmdd.substr(0, 4)), Number.parseInt(yyyymmdd.substr(4, 2)) - 1, Number.parseInt(yyyymmdd.substr(6, 2)), Number.parseInt(yyyymmdd.substr(8, 2)), Number.parseInt(yyyymmdd.substr(10, 2)), Number.parseInt(yyyymmdd.substr(12, 2)));
}

function formatDate(date, format) {
	function zeroFill(value) {
		value = String(value);
		return (value.length === 1) ? ('0' + value) : value;
	}

	date = ko.utils.unwrapObservable(date);

	if (!date) {
		return '';
	}

	var result = '';
	var weeks = ['日', '月', '火', '水', '木', '金', '土'];
	var yen = false;
	var html = false;

	for (var i = 0; i < format.length; i++) {
		var c = format[i];

		if (!yen && !html) {
			switch (c) {
				case '\\':
					yen = true;
					continue;
				case '<':
					html = true;
					break;
				case 'y':
					c = date.getFullYear();
					break;
				case 'Y':
					c = String(date.getFullYear()).substr(2, 4);
					break;
				case 'm':
					c = zeroFill(date.getMonth() + 1);
					break;
				case 'M':
					c = date.getMonth() + 1;
					break;
				case 'd':
					c = zeroFill(date.getDate());
					break;
				case 'D':
					c = date.getDate();
					break;
				case 'h':
					c = zeroFill(date.getHours());
					break;
				case 'H':
					c = date.getHours();
					break;
				case 'i':
					c = zeroFill(date.getMinutes());
					break;
				case 'I':
					c = date.getMinutes();
					break;
				case 's':
					c = zeroFill(date.getSeconds());
					break;
				case 'S':
					c = date.getSeconds();
					break;
				case 'w':
					c = weeks[date.getDay()];
					break;
			}
		}

		result += c;
		yen = false;
		if (html && c === '>') {
			html = false;
		}
	}

	if (yen) {
		result += '\\';
	}

	return result;
}

function extend() {
	var target = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		ko.utils.extend(target, arguments[i]);
	}
	return target;
}

function forEach(item, callback) {
	try {
		if ('length' in item) {
			ko.utils.arrayForEach(item, callback);
		} else {
			ko.utils.objectForEach(item, callback);
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
}

window.core = core;
