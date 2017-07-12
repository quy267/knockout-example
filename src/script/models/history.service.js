//  ストア
var $ = require('jquery'),
    ko = require('ko'),
    core = require('core');

require('./history');
var InterfaceService = require('./interface.service');
var History = core.Models.History;

function HistoryService() {
    HistoryService.prototype.init.call(this);
}

$.extend(HistoryService.prototype, InterfaceService.prototype, {

    init: function () {
        InterfaceService.prototype.init.call(this);
    },

    findOfHistory: function (dateIndex) {
        var self = this,
            history = new History(),
            deferred = $.Deferred();

        if (!dateIndex) {
            /* core.ExceptionLogService.log('HistoryService.findOfHistory : dateIndex')*/
            return history;
        }

        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: self._getURL(dateIndex),
            data: {},
            success: function (response) {
                if (response) {
                    var data = core.Parsers.HistoryParser.parse(response);
                    history.update(data);
                    deferred.resolve(history);
                }
            },
            error: function (e) {
                console.log(e);
                deferred.reject(e);
            }
        });

        return deferred.promise();
    },

    _getURL: function (dateIndex) {
        var date = new Date(dateIndex),
            month = core.formatDate(date, 'M'),
            day = core.formatDate(date, 'D');

        return 'http://history.muffinlabs.com/date/' + month + '/' + day;
    },

});

// One instance
var service = new HistoryService();

module.exports = service;

core.ModelsService.HistoryService = service;
