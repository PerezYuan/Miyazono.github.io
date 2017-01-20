const gulp = require('gulp'),
    babel = require('gulp-babel'),
    amdclean = require('gulp-amdclean'),
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del');

gulp.task('dev', () => {
    return gulp.src('src/js/*.js')
        .pipe(babel())
        .pipe(order([
            '!src/js/miyazono.js',
            'src/js/miyazono.js'
        ], { base: '.' }))
        .pipe(concat("miyazono.js"))
        .pipe(
            amdclean.gulp({
                'prefixMode': 'standard'
            })
        )
        .pipe(gulp.dest("dist"));
})

gulp.task('prod', ['dev'], () => {
    return gulp.src('dist/miyazono.js')
        .pipe(uglify())
        .pipe(concat('miyazono.min.js'))
        .pipe(gulp.dest("dist"));
})

gulp.task('default', () => {
    del('dist').then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        gulp.run('prod');
    });
})