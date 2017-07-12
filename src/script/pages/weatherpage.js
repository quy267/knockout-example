/**
 * Created by quy.nguyentrong on 11/7/2017.
 */
var ko = require('ko');

var WeatherPage = function (params, componentInfo) {
    WeatherPage.prototype.init.call(this, params, componentInfo);
};

$.extend(WeatherPage.prototype, {

    init: function (params, componentInfo) {
        var self = this;
    }
});

var template = require('./weatherpage.html');
core.register('weatherpage', WeatherPage, template);