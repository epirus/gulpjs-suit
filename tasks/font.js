var gulp = require('gulp');
var fontmin = require('gulp-fontmin');

gulp.task('font', function () {
    return gulp.src(process.cwd()+'/fonts/*.ttf')
        .pipe(fontmin({
            text: '天地玄黄 宇宙洪荒',
        }))
        .pipe(gulp.dest(process.cwd()+'/css/'));
});
