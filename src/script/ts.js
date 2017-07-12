var $ = require('jquery');
var router = require('router');

var Application = function () {
    Application.prototype.init.call(this);

};

$.extend(Application.prototype, {
    theme: null,
    isloggedin: null,
    showNewsNav: null,
    issmartphone: null,

    init: function () {
        var self = this;

        var color = 'blue';
        var show = false;
        if (localStorage.getItem('color'))
            color = localStorage.getItem('color');
        if (localStorage.getItem('showcomplex'))
            show = localStorage.getItem('showcomplex');
        self.theme = ko.observable(color);

        self.showcomplex = ko.observable(show === 'true');

        self.showNewsNav = ko.observable(false);

        self.issmartphone = ko.observable(core.browser.android || core.browser.ios);

        self.title = ko.observable('');
        router.on('$stateChangeSuccess', function () {
            application.title(document.title);
        });

        self.isloggedin = ko.observable(!!localStorage.getItem('loggedin'));

        if (!localStorage.getItem('loggedin') && window.location.href.indexOf('login.html') === -1) {
            router.transitionTo('login', null, { replace: true });
        }

    },


    showActionPage: function (name, attributes, events) {
        this.closeActionPage();

        var tag = '<' + name;
        if (attributes) {
            core.forEach(attributes, function (name, value) {
                tag += ' ' + name + '="' + value + '"';
            });
        }
        tag += '></' + name + '>';

        var elem = $('div.actionpage div.contents');
        core.append(elem, tag);
        tag = $(elem.children()[0]);
        if (events) {
            core.forEach(events, function (name, event) {
                tag.on(name, event);
            });
        }

        $('div.actionpage').addClass('show');
        $('div.actionpage').addClass('actionpage-' + name);

    },

    onActionPageBackgroundClicked: function () {
        this.closeActionPage();
    },

    closeActionPage: function () {

        $('div.actionpage').removeClass('show');
        $('div.actionpage').removeClass(function (index, className) {
            return (className.match(/\bactionpage-\S+/g) || []).join(' ');
        });
        core.cleanNode($('div.actionpage div.contents').children());
    },

    toggleOverlay: function (isShow) {
        if (isShow)
            $('div.overlay').addClass('show');
        else
            $('div.overlay').removeClass('show');
    },

    moveBack: function () {
        history.back();
    },

});

core.browser = require('./utility/browser');
core.EventTrigger = new (require('./utility/eventtrigger'))();

var application = new Application();
window.application = application;

require('./ts-router');
require('./componentloader');


ko.applyBindings(application);
