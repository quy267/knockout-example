var $ = require('jquery');
var ko = require('ko');
var router = require('router');

/**
 * Base class of ComponentModel.
 * @namespace componentmodel
 * @class BaseComponentModel
 */
var LoginComponentModel = function(params, componentInfo) {
	LoginComponentModel.prototype.init.call(this, params, componentInfo);
};

$.extend(LoginComponentModel.prototype, {
	username: null,
	password: null,


	init: function(params, componentInfo) {
		var self = this;

		self.username = ko.observable();
		self.password = ko.observable();
	},

	submitLogin: function() {
		var loggedin = {};
		var username = ko.unwrap(this.username);
		if(username) {
			username = username.trim();
		}
		var password = ko.unwrap(this.password);
		if(username && password) {
			loggedin.username = username;
			loggedin.password = password;
			localStorage.setItem('loggedin', loggedin);
			
			application.isloggedin(true);
			
			router.transitionTo(application.issmartphone() ? 'smt.news' : 'pc.list', { afterlogin: true }, { replace : true });
		}
	},

	submitCancel: function() {
		this.username(null);
		this.password(null);
	}
});

core.ComponentModels.LoginComponentModel = LoginComponentModel;

module.exports = LoginComponentModel;