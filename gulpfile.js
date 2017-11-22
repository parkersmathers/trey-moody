var gulp         = require('gulp'),
    rev          = require('gulp-rev'),
    collect      = require('gulp-rev-collector'),
    revDel       = require('rev-del'),
    imagemin     = require('gulp-imagemin'),
    jpegRecompress = require('imagemin-jpeg-recompress'),
    imageminPngquant = require('imagemin-pngquant')

// process images

gulp.task('images', function () {
  gulp.src('images/*')
    .pipe(imagemin([
      imageminPngquant(),
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

// File Revision

gulp.task('rename', () =>
  gulp.src(['dist/**/*.html',
            'dist/**/*.css',
            'dist/**/*.js',
            'dist/**/*.{jpg,png,jpeg,gif,svg}'])
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest('manifest.json'))
    .pipe(revDel({ dest: 'dist' }))
    .pipe(gulp.dest('dist'))
);

gulp.task('updateReferences', ['rename'], () =>
   gulp.src(['dist/manifest.json','dist/**/*.{html,json,css,js}'])
   .pipe(collect())
   .pipe(gulp.dest('dist'))
);


// run

gulp.task('run', ['images'])
