var ko = require('ko');
var $ = require('jquery');

var BaseComponentModel = core.ComponentModels.BaseComponentModel;

var TimeComponentModel = function (params, componentInfo) {
    TimeComponentModel.prototype.init.call(this, params, componentInfo);
};

core.extendComponentModel(TimeComponentModel.prototype, BaseComponentModel.prototype, {
    hours: null,
    minutes: null,
    seconds: null,

    init: function (params, componentInfo) {
        var self = this;
        BaseComponentModel.prototype.init.call(this, params, componentInfo);
        self.hours = ko.observable();
        self.minutes = ko.observable();
        self.seconds = ko.observable();
    },

    updateTime: function () {
        var self = this;
        var timeInMs = Date.now();
        var d = new Date(timeInMs);
        var hour = d.getHours(), minute = d.getMinutes(), second = d.getSeconds();
        self.hours(hour);
        self.minutes(minute);
        self.seconds(second);
    }

});

core.ComponentModels.TimeComponentModel = TimeComponentModel;
module.exports = TimeComponentModel;