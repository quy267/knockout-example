var router = require('router');

router
    .otherwise('login')
    .state('pc', {
        url: '/pc',
        views: {
            main: {
                component: 'pcpage'
            }
        },
        isAbstract: true
    })
    .state('smt', {
        url: '/smt',
        views: {
            main: {
                component: 'smartphonepage'
            }
        },
        isAbstract: true
    })
    .state('login', {
        url: '/login',
        views: {
            main: {
                component: 'loginpage'
            }
        },
        title: 'ログイン'
    })
    .state('pc.list', {
        url: '/list',
        views: {
            mainContent: {
                component: 'timesheetlistpage'
            }
        },
        params: {},
        title: 'Timesheet List'
    })
    .state('pc.new', {
        url: '/new',
        views: {
            mainContent: {
                component: 'timesheetnewpage'
            }
        },
        params: {},
        title: 'Timesheet Create'
    })
    .state('pc.market', {
        url: '/market/:param',
        views: {
            mainContent: {
                component: 'marketcomponent'
            }
        },
        params: {
            param: 'default value'
        },
        title: 'Market'
    })
    .state('pc.markettop', {
        url: '/markettop',
        views: {
            mainContent: {
                component: 'markettoppage'
            }
        },
        params: {},
        title: 'Market Top'
    })
    .state('pc.marketdetail', {
        url: '/marketdetail/:id',
        views: {
            mainContent: {
                component: 'marketdetail'
            }
        },
        params: {
            // id: 'id'
        },
        title: 'Market Detail'
    })
    .state('pc.news', {
        url: '/news',
        views: {
            mainContent: {
                component: 'newspage'
            }
        },
        params: {},
        title: 'News'
    })
    .state('pc.time', {
        url: '/time',
        views: {
            mainContent: {
                component: 'time'
            }
        },
        params: {},
        title: 'Time'
    })
    .state('pc.weather', {
        url: '/weather',
        views: {
            mainContent: {
                component: 'weatherpage'
            }
        },
        params: {},
        title: 'Weather'
    })
    .state('pc.weathertable', {
        url: '/weathertable',
        views: {
            mainContent: {
                component: 'weathertablepage'
            }
        },
        params: {},
        title: 'WeatherTable'
    })
    .state('smt.news', {
        url: '/news',
        views: {
            mainContent: {
                component: 'newspage'
            }
        },
        params: {},
        title: 'News'
    })
    .run();