(function(scripts) {
    for (var i = 0; i < scripts.length; ++i) {
        document.write('<script type="text/javascript" src="' + scripts[i] + '"></script>');
    }
})([
    "js/jquery.js",
    "js/jquery.dump.js",
    "js/jquery.couch.js",
    "js/jquery.date.js",
    "js/jquery.dump.js",
    "js/jquery.application.js",
    "vendor/couchapp/jquery.couch.app.js",
    "vendor/couchapp/jquery.couch.app.util.js",
    "vendor/couchapp/jquery.evently.js",
    "vendor/couchapp/jquery.evently.couch.js",
    "vendor/couchapp/jquery.mustache.js",
    "vendor/couchapp/jquery.pathbinder.js"
]);

