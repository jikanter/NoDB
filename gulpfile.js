'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var DEST = 'target/';

gulp.task('default', function() { 
  
  // Simile AJAX
  gulp.src('src/ajax/api/scripts/*.js')
    // non minified
    .pipe(gulp.dest(DEST + 'simileajax/api/scripts/'))
    // minified
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(DEST + 'simileajax/api/scripts/'));
 
  // Exhibit
  return gulp.src('src/webapp/api/scripts/*.js')
    .pipe(gulp.dest(DEST + 'exhibit/api/scripts/'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(DEST + 'exhibit/api/scripts/'));
});