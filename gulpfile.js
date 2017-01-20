const gulp = require('gulp'),
    babel = require('gulp-babel'),
    amdclean = require('gulp-amdclean'),
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),
    del = require('del');

gulp.task('default', () => {
    del('dist').then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        return gulp.src('src/js/*.js')
            .pipe(order([
                '!src/js/miyazono.js',
                'src/js/miyazono.js'
            ], {base: '.'}))
            .pipe(print())
            .pipe(babel())
            .pipe(concat("miyazono.js"))
            .pipe(
                amdclean.gulp({
                    'prefixMode': 'standard'
                })
            )
            .pipe(gulp.dest("dist"));
    });
})