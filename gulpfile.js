var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var path = require('path');
var bs = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var maps = require('gulp-sourcemaps');

require('colors');

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var processors = [
    autoprefixer({browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"]})
];
var APP = path.resolve(__dirname, 'app.js');
var ROUTERS = path.resolve(__dirname, 'routes');
var VIEW = path.resolve(__dirname, 'views/**');
var PAGEDATA = path.resolve(__dirname, 'data/pageData/*.js');
var MDS = path.resolve(__dirname, 'data/news/*.md');

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('bs', () => {
    bs.init(null, {
        proxy: "http://localhost:3000",
        port: 2333,
        files: ['./public/css/style-output.css', './public/js/*.js']
    });
    return Promise.resolve()
});

gulp.task('bs-delay', (cb) => {
    console.log('浏览器刷新!'.red);
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            bs.reload();
            bs.notify("This message will only last a second", 1000);
        }, 1700);
        resolve()
    });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('css:dev', () => {
    return gulp.src(path.resolve(__dirname, 'src/sass/style-output.scss'))
        .pipe(maps.init())
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(maps.write())
        .pipe(gulp.dest(path.resolve(__dirname, 'public/css/')));
});

gulp.task('css:pro', () => {
    return gulp.src(path.resolve(__dirname, 'src/sass/style-output.scss'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest(path.resolve(__dirname, 'public/css/')));
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('watch:node', function () {
    gulp.watch(['./routes/**/*.js', './app.js', './bin/www', './views/**/*.html', PAGEDATA],
        gulp.parallel('bs-delay')
    );
});

gulp.task('watch:css', () => {
    gulp.watch(path.resolve(__dirname, 'src/sass/**/*.scss'),
        gulp.parallel('css:dev')
    );
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('nodemon', (cb) => {
    let started = false;
    nodemon({
        script: path.resolve(__dirname, 'bin/www'),
        verbose: false,
        ext: 'js html',
        env: {'NODE_ENV': 'develop'},
        watch: [APP, ROUTERS, VIEW, PAGEDATA]
    }).on('start', () => {
        console.log('启动完成!'.green);
    }).on('restart', () => {
        console.log('重启中...................'.blue);
    });
    return Promise.resolve()
});


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('md', () => {
    var {md2html} = require('./md2ht');
    return md2html()
});

gulp.task('watch:md', () => {
    var {singleMd2html} = require('./md2ht');
    gulp.watch(MDS)
        .on('change', function (file) {
            console.log((file + ' has been changed').cyan);
            singleMd2html(file);
        })
        .on('add', function (file) {
            console.log((file + ' has been added').magenta);
            singleMd2html(file);
        })
        .on('unlink', function (file) {
            console.log((file + ' is deleted').blue);
            singleMd2html(file, true);
        });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('dev',
    gulp.series('css:dev', 'nodemon', 'bs',
        gulp.parallel('watch:node', 'watch:css')
    )
);

gulp.task('prod',
    gulp.series('css:pro')
);

// 一次性任务
var rn = require('gulp-rename');

gulp.task('rn', (cb) => {
   gulp.src('./data/news/*.md')
       .pipe(rn(function (path) {
           let a = path.basename.split('.');
           a[0] = a[0].trim();
           let b = a[0].split('-');
           if (b[1].length == 1) b[1] = '0' + b[1];
           if (b[2].length == 1) b[2] = '0' + b[2];
           let c = b.join('-');
           a[0] = c;
           let d = a.join('.');
           path.basename = d
       }))
       .pipe(gulp.dest('./data/news/'));
    cb()
});
