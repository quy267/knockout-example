var ko = require('ko');

var LoginPage = function (params, componentInfo) {
    LoginPage.prototype.init.call(this, params, componentInfo);
};

$.extend(LoginPage.prototype, {

    init: function (params, componentInfo) {
        var self = this;

    }
});

var template = require('./loginpage.html');
core.register('loginpage', LoginPage, template);