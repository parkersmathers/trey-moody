var gulp         = require('gulp'),
    imagemin     = require('gulp-imagemin'),
    jpegRecompress = require('imagemin-jpeg-recompress')

// process images

gulp.task('images', function () {
  gulp.src('images/*')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 5}),
      jpegRecompress({
        loops: 4,
        min: 50,
        max: 85,
        quality:'high'
      })
    ], {
      verbose: true
    }))
    .pipe(gulp.dest('public/images'))
})

// run

gulp.task('run', ['images'])
