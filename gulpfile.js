var gulp         = require('gulp'),
    imagemin     = require('gulp-imagemin'),
    jpegRecompress = require('imagemin-jpeg-recompress')

// process images

gulp.task('images', function () {
  gulp.src('images/*')
    .pipe(imagemin([
      jpegRecompress({
        loops:4,
        min: 50,
        max: 95,
        quality:'high'
      })
    ]))
    .pipe(gulp.dest('images'))
})

// run

gulp.task('run', ['images'])
