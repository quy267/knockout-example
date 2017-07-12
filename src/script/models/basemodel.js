var $ = require('jquery');
var core = require('core');

function BaseModel(raw) {
	BaseModel.prototype.init.call(this,raw);
}

$.extend(BaseModel.prototype, {

	state: null,
	init: function (raw) {
		var self = this;
		self.state = ko.observable('init');
	},
	update: function(raw){
		var self = this;
		self.state('updated');
	}
});

core.Models.BaseModel = BaseModel;

module.exports = BaseModel;
