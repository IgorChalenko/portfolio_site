const { src, dest, watch, parallel, series } = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const scss   = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const global = require('globalthis/auto');

function browsersync () {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
}
function cleanDist() {
    return del('dist');
}

function images () {
    return src ('app/img/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/img'));
}



function styles() {
    return src('app/scss/style.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        
        grid: true
        }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/script.min.js',
        'app/*.html',
        
    ], {base: 'app'})
    .pipe(dest('dist'));
}

function script () {
     return src('app/js/script.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function watching() {
    watch(['app/**/*.scss'], styles);
    watch(['app/js/script.js', '!app/js/script.min.js'], script);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.script = script;
exports.images = images;
exports.cleanDist = cleanDist;



exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, script, browsersync, watching);
