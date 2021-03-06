var ko = require('ko');

var BaseComponentModel = core.ComponentModels.BaseComponentModel;

var ColorComponentModel = function (params, componentInfo) {
    ColorComponentModel.prototype.init.call(this, params, componentInfo);
};
var colorList = [
    {hex: '#ffebee', name: 'red lighten-5'},
    {hex: '#ffcdd2', name: 'red lighten-4'},
    {hex: '#ef9a9a', name: 'red lighten-3'},
    {hex: '#e57373', name: 'red lighten-2'},
    {hex: '#ef5350', name: 'red lighten-1'},
    {hex: '#f44336', name: 'red'},
    {hex: '#e53935', name: 'red darken-1'},
    {hex: '#d32f2f', name: 'red darken-2'},
    {hex: '#c62828', name: 'red darken-3'},
    {hex: '#b71c1c', name: 'red darken-4'},
    {hex: '#ff8a80', name: 'red accent-1'},
    {hex: '#ff5252', name: 'red accent-2'},
    {hex: '#ff1744', name: 'red accent-3'},
    {hex: '#d50000', name: 'red accent-4'},
    {hex: '#fce4ec', name: 'pink lighten-5'},
    {hex: '#f8bbd0', name: 'pink lighten-4'},
    {hex: '#f48fb1', name: 'pink lighten-3'},
    {hex: '#f06292', name: 'pink lighten-2'},
    {hex: '#ec407a', name: 'pink lighten-1'},
    {hex: '#e91e63', name: 'pink'},
    {hex: '#d81b60', name: 'pink darken-1'},
    {hex: '#c2185b', name: 'pink darken-2'},
    {hex: '#ad1457', name: 'pink darken-3'},
    {hex: '#880e4f', name: 'pink darken-4'},
    {hex: '#ff80ab', name: 'pink accent-1'},
    {hex: '#ff4081', name: 'pink accent-2'},
    {hex: '#f50057', name: 'pink accent-3'},
    {hex: '#c51162', name: 'pink accent-4'},
    {hex: '#f3e5f5', name: 'purple lighten-5'},
    {hex: '#e1bee7', name: 'purple lighten-4'},
    {hex: '#ce93d8', name: 'purple lighten-3'},
    {hex: '#ba68c8', name: 'purple lighten-2'},
    {hex: '#ab47bc', name: 'purple lighten-1'},
    {hex: '#9c27b0', name: 'purple'},
    {hex: '#8e24aa', name: 'purple darken-1'},
    {hex: '#7b1fa2', name: 'purple darken-2'},
    {hex: '#6a1b9a', name: 'purple darken-3'},
    {hex: '#4a148c', name: 'purple darken-4'},
    {hex: '#ea80fc', name: 'purple accent-1'},
    {hex: '#e040fb', name: 'purple accent-2'},
    {hex: '#d500f9', name: 'purple accent-3'},
    {hex: '#aa00ff', name: 'purple accent-4'},
    {hex: '#ede7f6', name: 'deep-purple lighten-5'},
    {hex: '#d1c4e9', name: 'deep-purple lighten-4'},
    {hex: '#b39ddb', name: 'deep-purple lighten-3'},
    {hex: '#9575cd', name: 'deep-purple lighten-2'},
    {hex: '#7e57c2', name: 'deep-purple lighten-1'},
    {hex: '#673ab7', name: 'deep-purple'},
    {hex: '#5e35b1', name: 'deep-purple darken-1'},
    {hex: '#512da8', name: 'deep-purple darken-2'},
    {hex: '#4527a0', name: 'deep-purple darken-3'},
    {hex: '#311b92', name: 'deep-purple darken-4'},
    {hex: '#b388ff', name: 'deep-purple accent-1'},
    {hex: '#7c4dff', name: 'deep-purple accent-2'},
    {hex: '#651fff', name: 'deep-purple accent-3'},
    {hex: '#6200ea', name: 'deep-purple accent-4'},
    {hex: '#e8eaf6', name: 'indigo lighten-5'},
    {hex: '#c5cae9', name: 'indigo lighten-4'},
    {hex: '#9fa8da', name: 'indigo lighten-3'},
    {hex: '#7986cb', name: 'indigo lighten-2'},
    {hex: '#5c6bc0', name: 'indigo lighten-1'},
    {hex: '#3f51b5', name: 'indigo'},
    {hex: '#3949ab', name: 'indigo darken-1'},
    {hex: '#303f9f', name: 'indigo darken-2'},
    {hex: '#283593', name: 'indigo darken-3'},
    {hex: '#1a237e', name: 'indigo darken-4'},
    {hex: '#8c9eff', name: 'indigo accent-1'},
    {hex: '#536dfe', name: 'indigo accent-2'},
    {hex: '#3d5afe', name: 'indigo accent-3'},
    {hex: '#304ffe', name: 'indigo accent-4'},
    {hex: '#e3f2fd', name: 'blue lighten-5'},
    {hex: '#bbdefb', name: 'blue lighten-4'},
    {hex: '#90caf9', name: 'blue lighten-3'},
    {hex: '#64b5f6', name: 'blue lighten-2'},
    {hex: '#42a5f5', name: 'blue lighten-1'},
    {hex: '#2196f3', name: 'blue'},
    {hex: '#1e88e5', name: 'blue darken-1'},
    {hex: '#1976d2', name: 'blue darken-2'},
    {hex: '#1565c0', name: 'blue darken-3'},
    {hex: '#0d47a1', name: 'blue darken-4'},
    {hex: '#82b1ff', name: 'blue accent-1'},
    {hex: '#448aff', name: 'blue accent-2'},
    {hex: '#2979ff', name: 'blue accent-3'},
    {hex: '#2962ff', name: 'blue accent-4'},
    {hex: '#e1f5fe', name: 'light-blue lighten-5'},
    {hex: '#b3e5fc', name: 'light-blue lighten-4'},
    {hex: '#81d4fa', name: 'light-blue lighten-3'},
    {hex: '#4fc3f7', name: 'light-blue lighten-2'},
    {hex: '#29b6f6', name: 'light-blue lighten-1'},
    {hex: '#03a9f4', name: 'light-blue'},
    {hex: '#039be5', name: 'light-blue darken-1'},
    {hex: '#0288d1', name: 'light-blue darken-2'},
    {hex: '#0277bd', name: 'light-blue darken-3'},
    {hex: '#01579b', name: 'light-blue darken-4'},
    {hex: '#80d8ff', name: 'light-blue accent-1'},
    {hex: '#40c4ff', name: 'light-blue accent-2'},
    {hex: '#00b0ff', name: 'light-blue accent-3'},
    {hex: '#0091ea', name: 'light-blue accent-4'},
    {hex: '#e0f7fa', name: 'cyan lighten-5'},
    {hex: '#b2ebf2', name: 'cyan lighten-4'},
    {hex: '#80deea', name: 'cyan lighten-3'},
    {hex: '#4dd0e1', name: 'cyan lighten-2'},
    {hex: '#26c6da', name: 'cyan lighten-1'},
    {hex: '#00bcd4', name: 'cyan'},
    {hex: '#00acc1', name: 'cyan darken-1'},
    {hex: '#0097a7', name: 'cyan darken-2'},
    {hex: '#00838f', name: 'cyan darken-3'},
    {hex: '#006064', name: 'cyan darken-4'},
    {hex: '#84ffff', name: 'cyan accent-1'},
    {hex: '#18ffff', name: 'cyan accent-2'},
    {hex: '#00e5ff', name: 'cyan accent-3'},
    {hex: '#00b8d4', name: 'cyan accent-4'},
    {hex: '#e0f2f1', name: 'teal lighten-5'},
    {hex: '#b2dfdb', name: 'teal lighten-4'},
    {hex: '#80cbc4', name: 'teal lighten-3'},
    {hex: '#4db6ac', name: 'teal lighten-2'},
    {hex: '#26a69a', name: 'teal lighten-1'},
    {hex: '#009688', name: 'teal'},
    {hex: '#00897b', name: 'teal darken-1'},
    {hex: '#00796b', name: 'teal darken-2'},
    {hex: '#00695c', name: 'teal darken-3'},
    {hex: '#004d40', name: 'teal darken-4'},
    {hex: '#a7ffeb', name: 'teal accent-1'},
    {hex: '#64ffda', name: 'teal accent-2'},
    {hex: '#1de9b6', name: 'teal accent-3'},
    {hex: '#00bfa5', name: 'teal accent-4'},
    {hex: '#e8f5e9', name: 'green lighten-5'},
    {hex: '#c8e6c9', name: 'green lighten-4'},
    {hex: '#a5d6a7', name: 'green lighten-3'},
    {hex: '#81c784', name: 'green lighten-2'},
    {hex: '#66bb6a', name: 'green lighten-1'},
    {hex: '#4caf50', name: 'green'},
    {hex: '#43a047', name: 'green darken-1'},
    {hex: '#388e3c', name: 'green darken-2'},
    {hex: '#2e7d32', name: 'green darken-3'},
    {hex: '#1b5e20', name: 'green darken-4'},
    {hex: '#b9f6ca', name: 'green accent-1'},
    {hex: '#69f0ae', name: 'green accent-2'},
    {hex: '#00e676', name: 'green accent-3'},
    {hex: '#00c853', name: 'green accent-4'},
    {hex: '#f1f8e9', name: 'light-green lighten-5'},
    {hex: '#dcedc8', name: 'light-green lighten-4'},
    {hex: '#c5e1a5', name: 'light-green lighten-3'},
    {hex: '#aed581', name: 'light-green lighten-2'},
    {hex: '#9ccc65', name: 'light-green lighten-1'},
    {hex: '#8bc34a', name: 'light-green'},
    {hex: '#7cb342', name: 'light-green darken-1'},
    {hex: '#689f38', name: 'light-green darken-2'},
    {hex: '#558b2f', name: 'light-green darken-3'},
    {hex: '#33691e', name: 'light-green darken-4'},
    {hex: '#ccff90', name: 'light-green accent-1'},
    {hex: '#b2ff59', name: 'light-green accent-2'},
    {hex: '#76ff03', name: 'light-green accent-3'},
    {hex: '#64dd17', name: 'light-green accent-4'},
    {hex: '#f9fbe7', name: 'lime lighten-5'},
    {hex: '#f0f4c3', name: 'lime lighten-4'},
    {hex: '#e6ee9c', name: 'lime lighten-3'},
    {hex: '#dce775', name: 'lime lighten-2'},
    {hex: '#d4e157', name: 'lime lighten-1'},
    {hex: '#cddc39', name: 'lime'},
    {hex: '#c0ca33', name: 'lime darken-1'},
    {hex: '#afb42b', name: 'lime darken-2'},
    {hex: '#9e9d24', name: 'lime darken-3'},
    {hex: '#827717', name: 'lime darken-4'},
    {hex: '#f4ff81', name: 'lime accent-1'},
    {hex: '#eeff41', name: 'lime accent-2'},
    {hex: '#c6ff00', name: 'lime accent-3'},
    {hex: '#aeea00', name: 'lime accent-4'},
    {hex: '#fffde7', name: 'yellow lighten-5'},
    {hex: '#fff9c4', name: 'yellow lighten-4'},
    {hex: '#fff59d', name: 'yellow lighten-3'},
    {hex: '#fff176', name: 'yellow lighten-2'},
    {hex: '#ffee58', name: 'yellow lighten-1'},
    {hex: '#ffeb3b', name: 'yellow'},
    {hex: '#fdd835', name: 'yellow darken-1'},
    {hex: '#fbc02d', name: 'yellow darken-2'},
    {hex: '#f9a825', name: 'yellow darken-3'},
    {hex: '#f57f17', name: 'yellow darken-4'},
    {hex: '#ffff8d', name: 'yellow accent-1'},
    {hex: '#ffff00', name: 'yellow accent-2'},
    {hex: '#ffea00', name: 'yellow accent-3'},
    {hex: '#ffd600', name: 'yellow accent-4'},
    {hex: '#fff8e1', name: 'amber lighten-5'},
    {hex: '#ffecb3', name: 'amber lighten-4'},
    {hex: '#ffe082', name: 'amber lighten-3'},
    {hex: '#ffd54f', name: 'amber lighten-2'},
    {hex: '#ffca28', name: 'amber lighten-1'},
    {hex: '#ffc107', name: 'amber'},
    {hex: '#ffb300', name: 'amber darken-1'},
    {hex: '#ffa000', name: 'amber darken-2'},
    {hex: '#ff8f00', name: 'amber darken-3'},
    {hex: '#ff6f00', name: 'amber darken-4'},
    {hex: '#ffe57f', name: 'amber accent-1'},
    {hex: '#ffd740', name: 'amber accent-2'},
    {hex: '#ffc400', name: 'amber accent-3'},
    {hex: '#ffab00', name: 'amber accent-4'},
    {hex: '#fff3e0', name: 'orange lighten-5'},
    {hex: '#ffe0b2', name: 'orange lighten-4'},
    {hex: '#ffcc80', name: 'orange lighten-3'},
    {hex: '#ffb74d', name: 'orange lighten-2'},
    {hex: '#ffa726', name: 'orange lighten-1'},
    {hex: '#ff9800', name: 'orange'},
    {hex: '#fb8c00', name: 'orange darken-1'},
    {hex: '#f57c00', name: 'orange darken-2'},
    {hex: '#ef6c00', name: 'orange darken-3'},
    {hex: '#e65100', name: 'orange darken-4'},
    {hex: '#ffd180', name: 'orange accent-1'},
    {hex: '#ffab40', name: 'orange accent-2'},
    {hex: '#ff9100', name: 'orange accent-3'},
    {hex: '#ff6d00', name: 'orange accent-4'},
    {hex: '#fbe9e7', name: 'deep-orange lighten-5'},
    {hex: '#ffccbc', name: 'deep-orange lighten-4'},
    {hex: '#ffab91', name: 'deep-orange lighten-3'},
    {hex: '#ff8a65', name: 'deep-orange lighten-2'},
    {hex: '#ff7043', name: 'deep-orange lighten-1'},
    {hex: '#ff5722', name: 'deep-orange'},
    {hex: '#f4511e', name: 'deep-orange darken-1'},
    {hex: '#e64a19', name: 'deep-orange darken-2'},
    {hex: '#d84315', name: 'deep-orange darken-3'},
    {hex: '#bf360c', name: 'deep-orange darken-4'},
    {hex: '#ff9e80', name: 'deep-orange accent-1'},
    {hex: '#ff6e40', name: 'deep-orange accent-2'},
    {hex: '#ff3d00', name: 'deep-orange accent-3'},
    {hex: '#dd2c00', name: 'deep-orange accent-4'},
    {hex: '#efebe9', name: 'brown lighten-5'},
    {hex: '#d7ccc8', name: 'brown lighten-4'},
    {hex: '#bcaaa4', name: 'brown lighten-3'},
    {hex: '#a1887f', name: 'brown lighten-2'},
    {hex: '#8d6e63', name: 'brown lighten-1'},
    {hex: '#795548', name: 'brown'},
    {hex: '#6d4c41', name: 'brown darken-1'},
    {hex: '#5d4037', name: 'brown darken-2'},
    {hex: '#4e342e', name: 'brown darken-3'},
    {hex: '#3e2723', name: 'brown darken-4'},
    {hex: '#fafafa', name: 'grey lighten-5'},
    {hex: '#f5f5f5', name: 'grey lighten-4'},
    {hex: '#eeeeee', name: 'grey lighten-3'},
    {hex: '#e0e0e0', name: 'grey lighten-2'},
    {hex: '#bdbdbd', name: 'grey lighten-1'},
    {hex: '#9e9e9e', name: 'grey'},
    {hex: '#757575', name: 'grey darken-1'},
    {hex: '#616161', name: 'grey darken-2'},
    {hex: '#424242', name: 'grey darken-3'},
    {hex: '#212121', name: 'grey darken-4'},
    {hex: '#eceff1', name: 'blue-grey lighten-5'},
    {hex: '#cfd8dc', name: 'blue-grey lighten-4'},
    {hex: '#b0bec5', name: 'blue-grey lighten-3'},
    {hex: '#90a4ae', name: 'blue-grey lighten-2'},
    {hex: '#78909c', name: 'blue-grey lighten-1'},
    {hex: '#607d8b', name: 'blue-grey'},
    {hex: '#546e7a', name: 'blue-grey darken-1'},
    {hex: '#455a64', name: 'blue-grey darken-2'},
    {hex: '#37474f', name: 'blue-grey darken-3'},
    {hex: '#263238', name: 'blue-grey darken-4'},
    {hex: '#000000', name: 'black'},
    {hex: '#ffffff', name: 'white'}
];

core.extendComponentModel(ColorComponentModel.prototype, BaseComponentModel.prototype, {
    properties: {
        theme: {}
    },
    init: function (params, componentInfo) {
        var self = this;
        self.colorList = colorList;
        BaseComponentModel.prototype.init.call(this, params, componentInfo);
    },
    setColor: function (colorName) {
        application.theme(colorName);
        // Store
        localStorage.setItem('color', colorName);
        application.closeActionPage('color');
    },
});
core.ComponentModels.ColorComponentModel = ColorComponentModel;

module.exports = ColorComponentModel;