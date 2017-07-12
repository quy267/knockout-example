/**
 * Created by quy.nguyentrong on 11/7/2017.
 */
var $ = require('jquery');
var core = require('core');

function Weather(raw) {
    Weather.prototype.init.call(this, raw);
}

$.extend(Weather.prototype, {

    longitude: null,
    latitude: null,
    pressure: null,
    temp: null,
    humidity: null,
    name: null,
    sunrise: null,
    sunset: null,

    init: function (raw) {
        var self = this;

        // self.marketcode = ko.observable(raw ? raw.marketcode : null);
        self.longitude = ko.observable(raw ? raw.coord.lon : null);
        self.latitude = ko.observable(raw ? raw.coord.lat : null);
        self.pressure = ko.observable(raw ? raw.main.pressure : null);
        self.temp = ko.observable(raw ? raw.main.temp : null);
        self.humidity = ko.observable(raw ? raw.main.humidity : null);
        self.sunrise = ko.observable(raw ? raw.sys.sunrise : null);
        self.sunset = ko.observable(raw ? raw.sys.sunset : null);

    },


    update: function (raw) {
        var self = this;

        self.longitude = ko.observable(raw ? raw.coord.lon : null);
        self.latitude = ko.observable(raw ? raw.coord.lat : null);
        self.pressure = ko.observable(raw ? raw.main.pressure : null);
        self.temp = ko.observable(raw ? raw.main.temp : null);
        self.humidity = ko.observable(raw ? raw.main.humidity : null);
        self.sunrise = ko.observable(raw ? raw.sys.sunrise : null);
        self.sunset = ko.observable(raw ? raw.sys.sunset : null);
        // self.lastupdated = ko.observable(raw ? raw.lastupdated : null);

        self.state('updated');
    },

});

core.Models.Weather = Weather;

core.Parsers.WeatherParser = {

    parse: function (message) {
        var raw = {};

        core.Parsers.WeatherParser.update(raw, message);

        return raw;
    },

    update: function (raw, message) {
        raw.longitude = message.coord && message.coord.lon ? message.coord.lon : null;
        raw.latitude = message.coord && message.coord.lat ? message.coord.lat : null;
        raw.pressure = message.main && message.main.pressure ? message.main.pressure : null;
        raw.temp = message.main && message.main.temp ? message.main.temp : null;
        raw.humidity = message.main && message.main.humidity ? message.main.humidity : null;
        raw.sunrise = message.sys && message.sys.sunrise ? message.sys.sunrise : null;
        raw.sunset = message.sys && message.sys.sunset ? message.sys.sunset : null;
        raw.name = message && message.name ? message.name : null;
        raw.country = message.sys && message.sys.country ? message.sys.country : null;
        raw.speed = message.wind && message.wind.speed ? message.wind.speed : null;
        raw.deg = message.wind && message.wind.deg ? message.wind.deg : null;
    },

};