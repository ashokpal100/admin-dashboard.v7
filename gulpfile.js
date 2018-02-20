var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('./gulp.config')();
var browserSync = require('browser-sync');
var del = require('del');
var reload = browserSync.reload;
var modRewrite = require('connect-modrewrite');    
var runSequence = require('run-sequence');
var minifyHTML = require('gulp-minify-html');


// var useref = require('gulp-useref');
// var uglify = require('gulp-uglify');

/**
 * Gulp Tasks
 */
 
 // inject from html file css and js file for minification
gulp.task('inject', function(){
  log('Injecting custom scripts and css from index.html');
  return gulp.src(config.client+'/*.html')
    .pipe($.useref())
    .pipe($.if('*.js', $.uglify({compress: {drop_console: true}})))
    .pipe($.if('*.css', $.cssnano()))
    .pipe(gulp.dest('dist'))
});


// copy images,fonts,views and js files
gulp.task('copy', function(){
  log('copy images,fonts,views and js files to dist')
  gulp.src(config.client+'/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe($.cache($.imagemin({interlaced: true})))
    .pipe(gulp.dest('dist/img'))
  gulp.src(config.client+'/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
  gulp.src(config.client+'/views/**/*')
    .pipe(gulp.dest('dist/views'))
    
  return gulp.src(config.client+'/js/**/**/**/**/*')
  .pipe(gulp.dest('dist/js'))
});

//minify css,html and js files
gulp.task('minify', function() {
  log('minify css,html and js files')
	var opts = {comments:true,spare:true};
  gulp.src('dist/views/**/**/**/**/*.js')
    .pipe($.uglify({compress: {drop_console: true}}))
    .pipe(gulp.dest('dist/views/'));
    
  var optss = {comments:true,spare:true};
  gulp.src('dist/views/**/**/**/**/*.html')
    .pipe(minifyHTML(optss))
    .pipe(gulp.dest('dist/views/'))
    
  return gulp.src('dist/views/**/**/**/**/*.css')
    .pipe($.useref())
    .pipe($.if('*.css', $.cssnano()))
    .pipe(gulp.dest('dist/views/'))
    
});


gulp.task('browser-sync', function() {
  var options = {
        port: 8000,
        host: '*',
        logger: 'dev',
        ghostMode: {
            clicks: false,
            location: false,
            forms: false,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0, //1000,
        online: true
    };
    options.server = {
            baseDir: 'src',
            middleware: [
                       modRewrite(['!\.html|\.woff|\.woff2|\.eot|\.ttf|\.svg|\.js|\.jpg|\.mp4|\.mp3|\.gif|\.svg\|.css|\.png$ /index.html [L]'])
                ]
        };

  browserSync(options);
        
      
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return $.nodemon({
    script: 'server.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 100);
  });
});


gulp.task('watch', ['browser-sync'], function () {
  gulp.watch(['src/**/**/**.*'], reload);
});

// delete dist
gulp.task('clean', function() {
  return del.sync('dist');
})

// clear cache
gulp.task('cache:clear', function (callback) {
    return $.cache.clearAll(callback)
})

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.green(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.green(msg));
    }
}


gulp.task('dev', function (callback) {
    runSequence(
        'watch',
    callback);
});

gulp.task('default', function (callback) {
    runSequence(
        'watch',
    callback);
});


gulp.task('prod', function(callback){
    runSequence(
        'clean',
        'cache:clear',
        ['inject','copy','minify'],
        'nodemon',
        callback
    );
});

