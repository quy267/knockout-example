var path = require('path');
var grunt = require('grunt');

var load = function(kind) {
	var script = ''
	var dir = path.resolve('./src/script/' + kind + '/');
	grunt.file.expand({ cwd: dir }, '**/*.js').forEach(function(file) {
		script += 'require(\'./' + kind + '/' + file.slice(0, file.lastIndexOf('.')) + '\');\n';
	});
	return script;
};

module.exports = {
	load: function() {
		var script = '';
		script += load('service') + '\n';
		script += load('models') + '\n';
		script += load('componentmodels') + '\n';
		script += load('components') + '\n';
		script += load('pages') + '\n';
		script += load('utility') + '\n';
		return script;
	}
};