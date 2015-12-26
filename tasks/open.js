/****************
 * Open Url
 *****************/
var gulp = require('gulp');
var open = require('gulp-open');
var argv = require('minimist')(process.argv.slice(2));

//-b->open with browser
var setOpen = argv.b ? true : false;
gulp.task('open', function() {
    if (setOpen === false) {
        return;
    }
    portfinder.getPort(function(err, port) {
        if (argv.q && argv.q !== true) {
            page = '/' + argv.q;
        } else {
            page = "/index.html";
        }
        var options = {
            url: 'http://localhost:' + (port - 1) + page,
            app: 'google chrome'
        };
        gulp.src(process.cwd()+ '/index.html')
            .pipe(open('', options));
    });
});
