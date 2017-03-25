const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

// Instructions for how task will run.
gulp.task('concat', function(){
  gulp.src(['./public/scripts/app.js', './public/scripts/*.js','./public/scripts/**/*.js'])
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(concat('all.js'))
  .pipe(gulp.dest('./public/dist'));
});


// Compile scss into css files
gulp.task('sass', function() {
  gulp.src([
    // './styles/base/reset.css',  //left this out because the compiled scss files need to come after imported libraries but the reset file needs to come before 
    './public/styles/*{.scss,.css}',
    ])
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('all.css'))
  .pipe(gulp.dest('./public/dist'));
});

gulp.task('watch', function(){
    gulp.watch(['./public/scripts/**/*.js', './public/scripts/*.js'], ['concat']);
    gulp.watch('./public/styles/*{.css,.scss}', ['sass']);

})

gulp.task('default', ['concat', 'sass', 'watch']);


// Gulp watch
// takes two arguments: the file(s) to watch, and then the task to do if it notices a change.