var ko = require('ko');

var SmartPhonePage = function (params, componentInfo) {
    SmartPhonePage.prototype.init.call(this, params, componentInfo);
};

$.extend(SmartPhonePage.prototype, {

    init: function (params, componentInfo) {
       
    }
});

var template = require('./smartphonepage.html');
core.register('smartphonepage', SmartPhonePage, template);