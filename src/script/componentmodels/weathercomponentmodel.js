var ko = require('ko');
var $ = require('jquery');

var BaseComponentModel = core.ComponentModels.BaseComponentModel;

var WeatherComponentModel = function (params, componentInfo) {
    WeatherComponentModel.prototype.init.call(this, params, componentInfo);
};

core.extendComponentModel(WeatherComponentModel.prototype, BaseComponentModel.prototype, {
    location: null,
    temperature: null,
    wind: null,
    cloudiness: null,
    pressure: null,
    humidity: null,
    sunrise: null,
    sunset: null,
    geo: null,

    init: function (params, componentInfo) {
        var self = this;
        BaseComponentModel.prototype.init.call(this, params, componentInfo);
        self.location = ko.observable();
        self.temperature = ko.observable();
        self.wind = ko.observable();
        self.pressure = ko.observable();
        self.humidity = ko.observable();
        self.sunrise = ko.observable();
        self.sunset = ko.observable();
        self.geo = ko.observable();
        self.convertSecondToHours = function (millisecond) {
            var totalMilliSeconds = millisecond;
            var minutes = Math.floor((totalMilliSeconds / (1000 * 60)) % 60);
            var hours = Math.floor((totalMilliSeconds / (1000 * 60 * 60)) % 24);
            return hours + ":" + minutes;
        };
        self.getapidata = function () {
            var dataResponse;
            $.ajax({
                type: "GET",
                dataType: "json",
                url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=fcf6effa21efc4e37db6731042bf165e',
                data: {},
                success: function (response) {
                    if (response) {
                        dataResponse = core.Parsers.WeatherParser.parse(response);
                    }
                    var conversion = Math.floor((5.0 / 9.0) * (dataResponse.temp - 32));
                    self.temperature(conversion);
                    self.humidity(dataResponse.humidity);
                    var sunriseData = self.convertSecondToHours(dataResponse.sunrise);
                    self.sunrise(sunriseData);
                    var sunsetData = self.convertSecondToHours(dataResponse.sunset);
                    self.sunset(sunsetData);
                    var windData = dataResponse.speed;
                    self.wind(windData);
                    self.pressure(dataResponse.pressure);
                    var geoData = '[ ' + dataResponse.longitude + ',' + dataResponse.latitude + ' ]';
                    self.geo(geoData);
                    var locationData = dataResponse.name + ', ' + dataResponse.country;
                    self.location(locationData);
                },
                error: function () {
                    console.log('error');
                }
            });

        };

        self.getapidata();
    },

});

core.ComponentModels.WeatherComponentModel = WeatherComponentModel;
module.exports = WeatherComponentModel;

