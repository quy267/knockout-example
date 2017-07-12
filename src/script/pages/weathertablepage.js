/**
 * Created by quy.nguyentrong on 11/7/2017.
 */
var ko = require('ko');

var WeatherTablePage = function (params, componentInfo) {
    WeatherTablePage.prototype.init.call(this, params, componentInfo);
};

$.extend(WeatherTablePage.prototype, {

    init: function (params, componentInfo) {
        var self = this;
    }
});

var template = require('./weathertablepage.html');
core.register('weathertablepage', WeatherTablePage, template);
