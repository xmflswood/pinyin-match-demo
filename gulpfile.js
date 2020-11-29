// const { src, dest } = require('gulp');
// const cleanCSS = require('gulp-clean-css');

// exports.default = function() {
//   return src('src/*.css')
//     // gulp-uglify 插件并不改变文件名
//     .pipe(cleanCSS())
//     .pipe(dest('dist/'));
// }

// const { src, dest } = require('gulp');
// var uglify = require('gulp-uglify');
// var babel = require('gulp-babel');
 
// exports.default = function() {
//     return src('./x.js')
//         .pipe(babel())
//         .pipe(uglify())
//         .pipe(dest('dist/'));
// }

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
 
exports.default = function() {
  return gulp.src('./*.html')
  .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true, removeComments: true }))
  .pipe(gulp.dest('dist'));
}
  