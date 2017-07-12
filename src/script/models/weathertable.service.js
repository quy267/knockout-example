/**
 * Created by quy.nguyentrong on 12/7/2017.
 */
var $ = require('jquery'),
    ko = require('ko'),
    core = require('core');

require('./weathertable');
var InterfaceService = require('./interface.service');
var WeatherTable = core.Models.WeatherTable;

function WeatherTableService() {
    WeatherTableService.prototype.init.call(this);
}

$.extend(WeatherTableService.prototype, InterfaceService.prototype, {
    city: null,

    init: function () {
        InterfaceService.prototype.init.call(this);
    },

    findInWeatherTable: function (city) {
        var self = this,
            deferred = $.Deferred();

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: self._getURL(city),
            data: {},
            success: function (response) {
                if (response) {
                    var data = [];
                    for (var i = 0; i < response.list.length; i++) {
                        var dataRaw = core.Parsers.WeatherTableParser.parse(response.list[i]);
                        if (!dataRaw) return;
                        var weatherTable = new WeatherTable(dataRaw);
                        data.push(weatherTable);
                    }
                    deferred.resolve({
                        'data': data,
                        'city': response.city.name,
                        'country': response.city.country,
                        'lon': response.city.coord.lon,
                        'lat': response.city.coord.lat
                    });
                }
            },
            error: function (e) {
                console.log(e);
                deferred.reject(e);
            }
        });

        return deferred.promise();
    },

    _getURL: function (city) {
        return 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&cnt=5&appid=98c535130cf6232e520a400d3c1bcfc5';
    }

});

// One instance
var service = new WeatherTableService();
module.exports = service;

core.ModelsService.WeatherTableService = service;