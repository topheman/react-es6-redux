'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var processhtml = require('gulp-processhtml');

if(process.env.PROD){
  console.log('PRODUCTION mode');
}
else{
  console.log('DEVELOPMENT mode');
}

function getTagFromFilepath(filepath){
  //fix path
  filepath = filepath.replace('/build','.');
  //return tag
  if(/\.js$/.test(filepath)){
    return '<script src="' + filepath + '"></script>';
  }
  if(/\.css$/.test(filepath)){
    return '<link rel="stylesheet" href="' + filepath + '">';
  }
  throw new Error('Unrecognized file type (not js or css');
}

gulp.task('compile', function() {
  return gulp.src('./public/index.html')
    .pipe(inject( gulp.src('./build/assets/js/bundle.js', {read: false}), {
      starttag: '<!-- inject:js -->',
      transform: getTagFromFilepath
    }))
    .pipe(inject( gulp.src('./build/assets/css/main.css', {read: false}), {
      starttag: '<!-- inject:css -->',
      transform: getTagFromFilepath
    }))
    .pipe(processhtml())
    .pipe(gulp.dest('./build'));
});

gulp.task('build', ['compile']);