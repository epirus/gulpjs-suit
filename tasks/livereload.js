var gulp = require('gulp');
var connect = require('gulp-connect');
var os = require('os');
var qrcode = require('qrcode-terminal');
var request = require('request');

var argv = require('minimist')(process.argv.slice(2));
//-q -> get the qrcode;
var setQrcode = argv.q ? true : false;

var proxyHost= 'http://10.10.10.14';
var portfinder = require('portfinder');
gulp.task('connect', function() {
    portfinder.getPort(function(err, port) {
        if (setQrcode) {
            var page = "";
            if (argv.q && argv.q != true) {
                page = '/' + argv.q;
            } else {
                page = "/"+argv.b;
            }
            var debug_url = 'http://' + os.networkInterfaces().en0[1].address + ':' + port + page;
            qrcode.generate(debug_url);
            console.log("deubg_url->"+debug_url);
        }
        var serverConfiguration = {};
        serverConfiguration = {
            port:port,
            root: './',
            livereload: {
                port: port + 27729,
            },
            middleware: function(connect, opt) {
                return [
                    function(req, res, next) {
                        if (req.headers.crossdomain === 'true') {
                            console.log(req.url);
                            var newUrl = proxyHost+ req.url;
                            gutil.log(gutil.colors.magenta('-----跨域---->'+newUrl));
                            request({
                                method: req.method,
                                url: newUrl,
                                headers: req.headers
                            }).pipe(res);
                        } else {
                            next();
                        }
                    }
                ];
            }
        };
        //find the avaliable port;
        connect.server(serverConfiguration);
    });
});



var gutil = require('gulp-util');
gulp.task('html', function() {
    gulp.src(process.cwd()+ '/*.html')
        .pipe(connect.reload())
        .on('end', function() {
            // gutil.log(gutil.colors.magenta('<----------------') + gutil.colors.cyan(new Date().toLocaleTimeString().toString()) + gutil.colors.magenta('---------------->'));
        });
});


gulp.task('livereload-watch', function() {
    gulp.watch([process.cwd()+ '/*.html'], ['html']);
    gulp.watch([process.cwd()+ '/js/**/*.js'], ['html','babel']);
    gulp.watch([process.cwd()+ '/css/**/*.css'], ['html']);
    gulp.watch([process.cwd()+ '/scss/**/*.scss'], ['livereload-sass']);
    // gulp.watch(['img/**/*'], function(e) {
    //     gulp.start('html');
    // });
});

gulp.task('livereload', ['livereload-sass', 'connect', 'livereload-watch', 'open','babel']);
