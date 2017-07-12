var ko = require('ko'),
    BasePage = require('./basepage');

var MarketPage = function (params, componentInfo) {
    MarketPage.prototype.init.call(this, params, componentInfo);
};

$.extend(MarketPage.prototype, BasePage.prototype, {

    init: function (params, componentInfo) {
        var self = this;

        BasePage.prototype.init.call(this, params, componentInfo);
    },

    triggerSomeEvent: function () { 
        core.EventTrigger.trigger('complex.customevent', { agr1: 'Value 1', arg2: 'Value 2', something: 101010 });
    }

});

var template = require('./marketpage.html');
core.register('marketcomponent', MarketPage, template);