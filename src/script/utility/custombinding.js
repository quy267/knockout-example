var ko = require('ko');
var $ = require('jquery');

ko.bindingHandlers.numberFormat = {
	update: function (element, valueAccessor/*, allBindings, viewModel, bindingContext*/) {
		var value = ko.unwrap(valueAccessor());
		ko.applyBindingsToNode(element, {text: $.numberFormat(value)});
	}
};

// For Ref
ko.bindingHandlers.numberFormatWithDefault = {
	update: function (element, valueAccessor/*, allBindings, viewModel, bindingContext*/) {
		var value = ko.unwrap(valueAccessor().value);
		var defaultValue = ko.unwrap(valueAccessor().default) || 0;

		value = !!value ? value : defaultValue;
		ko.applyBindingsToNode(element, {text: $.numberFormat(value)});
	}
};
