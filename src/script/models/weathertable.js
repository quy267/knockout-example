/**
 * Created by quy.nguyentrong on 12/7/2017.
 */
var $ = require('jquery');
var core = require('core');


function WeatherTable(raw) {
    WeatherTable.prototype.init.call(this, raw);
}

$.extend(WeatherTable.prototype, {
    location: null,
    description: null,
    lon: null,
    lat: null,
    geo: null,
    temp: null,
    temperature: null,
    speed: null,
    deg: null,
    wind: null,
    humidity: null,
    clouds: null,
    time: null,
    pressure: null,
    city: null,
    country: null,


    init: function (raw) {
        var self = this;

        self.city = ko.observable(raw ? raw.city : null);
        self.country = ko.observable(raw ? raw.country : null);
        self.description = ko.observable(raw ? raw.description : null);
        self.lon = ko.observable(raw ? raw.lon : null);
        self.lat = ko.observable(raw ? raw.lat : null);
        self.temp = ko.observable(raw ? raw.temp : null);
        self.speed = ko.observable(raw ? raw.speed : null);
        self.deg = ko.observable(raw ? raw.deg : null);
        self.humidity = ko.observable(raw ? raw.deg : null);
        self.clouds = ko.observable(raw ? raw.clouds : null);
        self.time = ko.observable(raw ? raw.time : null);
        self.pressure = ko.observable(raw ? raw.pressure : null);
        self.location = ko.computed(function () {
            var city = ko.unwrap(self.city);
            var country = ko.unwrap(self.country);
            if (!city || !country) {
                return;
            }
            return city + ',' + country;

        });

        self.geo = ko.computed(function () {
            var lon = ko.unwrap(self.lon);
            var lat = ko.unwrap(self.lat);

            if (!lon || !lat) {
                return;
            }

            return '[' + lon + ',' + lat + ']';
        });

        self.temperature = ko.computed(function () {
            var temp = ko.unwrap(self.temp);
            if (!temp) {
                return;
            }
            return Math.floor(temp - 273.15);
        });

        self.wind = ko.computed(function () {
            var speed = ko.unwrap(self.speed);
            var deg = ko.unwrap(self.deg);
            if (!speed || !deg) {
                return;
            }
            return "Speed" + speed + " m/s with degree " + deg;
        });

        self.time = ko.computed(function () {
            var time = ko.unwrap(self.time);
            if (!time) {
                return;
            }
            var d = new Date(time * 1000);
            return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
        });

    },

    update: function (raw) {
        var self = this;
        self.temp(raw ? raw.temp : null);
        self.clouds(raw ? raw.clouds : null);
        self.humidity(raw ? raw.humidity + '%' : null);
        self.pressure(raw ? raw.pressure + ' hpq' : null);

    }


});


core.Models.WeatherTable = WeatherTable;

core.Parsers.WeatherTableParser = {
    parse: function (res) {
        var raw = {};
        core.Parsers.WeatherTableParser.update(raw, res);
        return raw;
    },

    update: function (raw, res) {
        raw.description = res && res.weather[0].description ? res.weather[0].description : null;
        raw.temp = res && res.temp.day ? res.temp.day : null;
        raw.pressure = res && res.pressure ? res.pressure : null;
        raw.speed = res && res.speed ? res.speed : null;
        raw.deg = res && res.deg ? res.deg : null;
        raw.clouds = res && res.clouds ? res.clouds : null;
    }

};