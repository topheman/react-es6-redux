'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var processhtml = require('gulp-processhtml');
var gutil = require('gulp-util');
var minifyHtml = require('gulp-minify-html');
var gulpif = require('gulp-if');
var footer = require('gulp-footer');

var common = require('./common');

if(process.env.PROD){
  console.log('PRODUCTION mode');
}
else{
  console.log('DEVELOPMENT mode');
}

function getWebpackHash(){
  try{
    return require('./build/stats.json').hash;
  }
  catch(e){
    throw new Error('./build/stats.json file missing, please relaunch the build', e);
  }
}

function getTagFromFilepath(filepath){
  //fix path
  filepath = filepath.replace('/build','.');
  gutil.log('Injecting', filepath);
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
  var hash = process.env.PROD ? '-'+getWebpackHash() : '';
  return gulp.src('./public/index.html')
    .pipe(inject( gulp.src('./build/assets/js/bundle'+hash+'.js', {read: false}), {
      starttag: '<!-- inject:js -->',
      transform: getTagFromFilepath
    }))
    .pipe(inject( gulp.src('./build/assets/css/main'+hash+'.css', {read: false}), {
      starttag: '<!-- inject:css -->',
      transform: getTagFromFilepath
    }))
    .pipe(processhtml())
    .pipe(gulpif(process.env.PROD ? true : false, minifyHtml({empty: true}))) //only minify html in production
    .pipe(footer(common.getBannerHtml()))
    .pipe(gulp.dest('./build'));
});

gulp.task('build', ['compile']);