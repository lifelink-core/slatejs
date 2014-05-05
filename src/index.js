var requirejs = require('requirejs');
// This is taken almost wholesale from http://requirejs.org/docs/node.html
// under "Building node modules with AMD or RequireJS"

requirejs.config({
    /* In node, use a base URL of the directory that contains this file */
    baseUrl: __dirname,


    nodeRequire: require
});


var Slate = requirejs('slate');

//Now export a value visible to Node.
module.exports = Slate;

