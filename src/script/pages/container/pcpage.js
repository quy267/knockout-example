var ko = require('ko');

var PCPage = function (params, componentInfo) {
    PCPage.prototype.init.call(this, params, componentInfo);
};
var minWidth = 3,
    maxWidth = 9;
$.extend(PCPage.prototype, {

    init: function (params, componentInfo) {
        var self = this;

        self.leftWidth = ko.observable(8);
        self.wHeight = (window.innerHeight - 97) + 'px';
        if (localStorage.getItem('leftWidth'))
            self.leftWidth(parseInt(localStorage.getItem('leftWidth')));
        if (!application.showcomplex()) {
            self.leftWidth(12);
        }
        self.leftClass = ko.computed(function () {
            return 's' + self.leftWidth();
        });
        self.rightClass = ko.computed(function () {
            return 's' + (12 - self.leftWidth());
        });
    },
    showClick: function () {
        var self = this;
        return function () {
            if (application.showcomplex()) {
                self.leftWidth(12);
                application.showcomplex(false);
            } else {
                self.leftWidth(8);
                if (localStorage.getItem('leftWidth'))
                    self.leftWidth(parseInt(localStorage.getItem('leftWidth')));
                application.showcomplex(true);
            }
            // Store
            localStorage.setItem('showcomplex', application.showcomplex());
        };
    },
    changeClick: function (data) {
        var self = this;
        var old = self.leftWidth();
        if (data) {
            return function () {
                if (old > minWidth) {
                    self.leftWidth(old - 1);
                    localStorage.setItem('leftWidth', self.leftWidth());
                }
            };
        } else {
            return function () {
                if (old < maxWidth) {
                    self.leftWidth(old + 1);
                    localStorage.setItem('leftWidth', self.leftWidth());
                }
            };
        }
    }
});

var template = require('./pcpage.html');
core.register('pcpage', PCPage, template);