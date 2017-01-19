const gulp = require('gulp'),
    babel = require('gulp-babel'),
    amdclean = require('gulp-amdclean'),
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    del = require('del');

gulp.task('js', () => {
    del('dist').then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        return gulp.src('src/js/*.js')
            .pipe(order([
                'src/js/*.js',
                'src/js/miyazono.js'
            ], { base: './' }))
            // .pipe(babel())
            .pipe(concat("miyazono.js"))
            // .pipe(
            //     amdclean.gulp({
            //         'prefixMode': 'standard'
            //     })
            // )
            .pipe(gulp.dest("dist"));
    });
})