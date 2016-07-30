(function (requirejs, karma) {
    var testModules = [];
    for (var file in karma.files) {
        var match = file.match(/(tests\/.*?).js/);
        var match = file.match(/^\/base\/(tests\/.*?).js$/);
        if (match) {
            testModules.push(match[1]);
        }
    }

    requirejs.config({
        baseUrl: '/base',
        paths: {
            slate: 'src/slate',
            'native-promise-only': 'node_modules/native-promise-only/npo'
        },

        deps: testModules,

        callback: function () {
            karma.start();
        }
    });
})(requirejs, window.__karma__);
