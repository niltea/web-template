var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browser = require('browser-sync');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var pug = require('gulp-pug');
var uglify = require('gulp-uglify');

gulp.task('default',['server'], function() {
	gulp.watch(['src/js/**/*.js','!src/js/min/**/*.js'],['js']);
	gulp.watch('src/sass/**/*.scss',['sass']);
	gulp.watch(['src/pug/**/*.pug'],['pug']);
});

gulp.task('server', function() {
	browser({
		server: {
			baseDir: './public/'
		}
	});
});
gulp.task('sass', function() {
	gulp.src('src/sass/**/*.scss')
	.pipe(plumber())
	.pipe(sass({
		outputStyle: 'compressed'
	}))
	.pipe(autoprefixer({
		browsers: ['last 2 versions', 'ie >= 9', 'Android >= 4','ios_saf >= 8'],
		cascade: false
	}))
	.pipe(gulp.dest('./public/css'))
	.pipe(browser.reload({stream:true}));
});
gulp.task('pug', function() {
	gulp.src(
		['src/pug/**/*.pug', '!src/pug/**/_*.pug']
		)
	.pipe(plumber())
	.pipe(pug({
		pretty: true
	},{'ext': '.html'}))
	.pipe(gulp.dest('./public/'))
	.pipe(browser.reload({stream:true}));
});
gulp.task('js', function() {
	gulp.src(['src/js/**/*.js','!src/js/min/**/*.js'])
	.pipe(plumber())
    .pipe(babel())
	.pipe(uglify())
	.pipe(gulp.dest('./public/js'));
});