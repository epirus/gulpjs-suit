/*******************
 * Sass Livereload
 ********************/
var gulp = require('gulp');
var gulpif = require('gulp-if');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var argv = require('minimist')(process.argv.slice(2));
var pxtorem = require('gulp-pxtorem');
var autoprefixer = require('gulp-autoprefixer');

//-p->Pxtorem
var setPxtorem = argv.p ? true : false;

var pxtoremOptions = {
    root_value: 32,
    unit_precision: 5,
    prop_white_list: ['font', 'font-size', 'line-height', 'letter-spacing', 'background', 'background-position', 'background-size', 'border', 'width', 'height', 'margin', 'margin-top', 'margin-left', 'margin-right', 'margin-bottom', 'padding', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom', 'border', 'border-left', 'border-right', 'border-top', 'border-bottom', 'box-shadow', '-webkit-box-shadow', 'top', 'left', 'right', 'bottom', 'text-indent', 'transform', '-webkit-transform', 'border-radius'],
    replace: true,
    media_query: false
};
var postcssOptions = {
    map: false
};

gulp.task('livereload-sass', function() {
    gulp.src(process.cwd() + '/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                browsers: [
                    'last 10 versions',
                    'chrome 30',
                    'safari 5',
                    'ie 7',
                    'opera 10',
                ]
            })
        )
        .pipe(gulpif(setPxtorem, pxtorem(pxtoremOptions, postcssOptions)))
        .pipe(gulp.dest(process.cwd() + '/css/'))
        .pipe(connect.reload());



    gulp.src(process.cwd() + '/scss/m/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                browsers: [
                    'last 10 versions',
                    'chrome 30',
                    'safari 5',
                    'ie 7',
                    'opera 10',
                ]
            })
        )
        .pipe(pxtorem(pxtoremOptions, postcssOptions))
        .pipe(gulp.dest(process.cwd() + '/css/'))
        .pipe(connect.reload());
});
