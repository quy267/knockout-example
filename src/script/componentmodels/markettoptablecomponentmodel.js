var $ = require('jquery');
var ko = require('ko');

var BaseComponentModel = core.ComponentModels.BaseComponentModel;

/**
 * Base class of ComponentModel.
 * @namespace componentmodel
 * @class MarketTopComponentModel
 */
var MarketTopComponentModel = function (params, componentInfo) {
	MarketTopComponentModel.prototype.init.call(this, params, componentInfo);
};

core.extendComponentModel(MarketTopComponentModel.prototype, BaseComponentModel.prototype, {
	properties: {
		marketindex: {},
	},
	marketdata: null,
	marketdatafilter: null,
	pagenumber: null,
	perpage: null,
	totalpages: null,
	paginated: null,
	hasprevious: null,
	hasnext: null,
	active: null,
	next: null,
	previous: null,
	pages: null,
	jumpto: null,
	filterkeyword: null,
	autocomplete: null,
	selectkeyword: null,
	selected: null,
	keyword: null,
	focusinput: null,
	outfocusinput: null,
	enterfilter: null,
	selectrow: null,
	selectedrow: null,
	selectnextrow: null,
	selectprevrow: null,
	init: function (params, componentInfo) {
		var self = this;
		BaseComponentModel.prototype.init.call(this, params, componentInfo);

		self.marketdata = ko.utils.parseJson(sessionStorage.getItem('marketTopData'));
		self.pagenumber = ko.observable(0);
		self.perpage = 20;

		self.selected = ko.observable(false);
		self.keyword = ko.observable('');
		self.filterkeyword = ko.observable('');
		self.selectedrow = ko.observable('');

		self.marketdatafilter = ko.computed(function () {
			if (!self.filterkeyword()) {
				return self.marketdata;
			} else {
				self.pagenumber(0);
				var rs = ko.utils.arrayFilter(self.marketdata, function (prod) {
					return prod.symbol.indexOf(self.filterkeyword()) !== -1 || prod.symbol.toLowerCase().indexOf(self.filterkeyword()) !== -1;
				});
				return rs;
			}
		});

		self.autocomplete = ko.computed(function () {
			if (!self.keyword()) {
				return [];
			}
			var rs = ko.utils.arrayFilter(self.marketdata, function (prod) {
				return prod.symbol.indexOf(self.keyword()) !== -1 || prod.symbol.toLowerCase().indexOf(self.keyword()) !== -1;
			});
			return rs.slice(0, 10);
		});

		self.focusinput = function () {
			self.selected(false);
		};

		self.outfocusinput = function () {
			self.filterkeyword(self.keyword());
			setTimeout(function () {
				self.selected(true);
			}, 200);
		};

		self.selectkeyword = function (keyword) {
			self.keyword(keyword);
			self.filterkeyword(keyword);
			self.selected(true);
		};

		self.enterfilter = function (data, event) {
			event.preventDefault();
			if (event.keyCode === 13) {
				if (self.selectedrow()) {
					self.keyword(self.selectedrow().symbol);
				}

				self.selected(true);
				$('input').blur();
			}

			if (event.keyCode === 38) {
				self.selectprevrow();
			} else if (event.keyCode === 40) {
				self.selectnextrow();
			}
		};

		self.selectrow = function (data) {
			self.selectedrow(data);
		};

		self.selectnextrow = function () {
			var index = self.autocomplete().indexOf(self.selectedrow()) + 1;

			if (index >= self.autocomplete().length) index = 0;
			self.selectedrow(self.autocomplete()[index]);
		};

		self.selectprevrow = function () {
			var index = self.autocomplete().indexOf(self.selectedrow()) - 1;
			if (index < 0) index = self.autocomplete().length - 1;
			self.selectedrow(self.autocomplete()[index]);
		};
		/*pagination*/
		self.totalpages = ko.computed(function () {
			var div = Math.floor(self.marketdatafilter().length / self.perpage);
			div += self.marketdatafilter().length % self.perpage > 0 ? 1 : 0;
			return div - 1;
		});

		self.paginated = ko.computed(function () {
			var start = self.pagenumber() * self.perpage;
			return self.marketdatafilter().slice(start, start + self.perpage);
		});

		self.hasPrevious = ko.computed(function () {
			return self.pagenumber() !== 0;
		});

		self.hasNext = ko.computed(function () {
			return self.pagenumber() !== self.totalpages();
		});

		self.active = function (page) {
			return self.pagenumber() === page - 1;
		};

		self.next = function () {
			if (self.pagenumber() < self.totalpages()) {
				self.pagenumber(self.pagenumber() + 1);
			}
		};

		self.previous = function () {
			if (self.pagenumber() !== 0) {
				self.pagenumber(self.pagenumber() - 1);
			}
		};

		self.pages = ko.computed(function () {
			var pages = [], i;
			if (self.pagenumber() <= 5 && self.totalpages() > 12) {
				for (i = 1; i <= 8; i++) {
					pages.push(i);
				}
				pages.push('.');
				pages.push('.');
				pages.push('.');
				pages.push(self.totalpages() + 1);
				return pages;
			}
			if (self.totalpages() > 12 && self.pagenumber() > 5) {
				pages.push(1);
				pages.push('.');
				pages.push('.');
				pages.push('.');

				for (i = 2; i <= self.totalpages(); i++) {
					if (i >= self.pagenumber() - 1 && i <= self.pagenumber() + 3) {
						pages.push(i);
					}
				}

				if (self.totalpages() - pages.slice(-1)[0] > 2) {
					pages.push('.');
					pages.push('.');
					pages.push('.');
				}
				pages.push(self.totalpages() + 1);
				return pages;
			}

			for (i = 1; i <= self.totalpages() + 1; i++) {
				pages.push(i);
			}

			return pages;
		});

		self.jumpto = function (page) {
			if (page === '.') {
				return false;
			}
			self.pagenumber(page - 1);
		};
		/*pagination end*/
	},

});

core.ComponentModels.MarketTopComponentModel = MarketTopComponentModel;

module.exports = MarketTopComponentModel;


