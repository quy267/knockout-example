var ko = require('ko');
var $ = require('jquery');

var WeatherTableService = core.ModelsService.WeatherTableService;
var BaseComponentModel = core.ComponentModels.BaseComponentModel;


var WeatherTableComponentModel = function (params, componentInfo) {
    WeatherTableComponentModel.prototype.init.call(this, params, componentInfo);
};

core.extendComponentModel(WeatherTableComponentModel.prototype, BaseComponentModel.prototype, {

    properties: {
        city: {observer: 'onConditionChanged'}
    },

    city: null,
    lon: null,
    lat: null,
    country: null,
    weatherTable: null,

    init: function (params, componentInfo) {
        var self = this;
        BaseComponentModel.prototype.init.call(this, params, componentInfo);
        self.city = ko.observable('london');
        self.lon = ko.observable(0);
        self.lat = ko.observable(0);
        self.weatherTable = ko.observableArray('');
        self.isLoading = ko.observable(false);
        self.onConditionChanged();

    },

    onConditionChanged: function () {
        var self = this;
        var city = ko.unwrap(self.city);
        if (!city) {
            return;
        }
        self.weatherTable(null);
        self.isLoading(true);
        WeatherTableService.findInWeatherTable(city).done(function (source) {
            console.log(source);
            self.weatherTable(source.data);
            self.country(source.country);
            self.lon(source.lon);
            self.lat(source.lat);
            self.isLoading(false);
        }).fail(function (message) {
            self.isLoading(false);
            self.message(message);
        });

    }

});

core.ComponentModels.WeatherTableComponentModel = WeatherTableComponentModel;
module.exports = WeatherTableComponentModel;

