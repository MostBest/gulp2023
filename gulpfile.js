'use strict';

// Сборка Gulp
import pkg from 'gulp';
const { gulp, src, dest, parallel, series, watch } = pkg;

// Сборка HTML
import pug from 'gulp-pug';

// Удаление файлов
import { deleteAsync } from 'del';

// Сборка CSS
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import sourceMap from 'gulp-sourcemaps';

// Отслеживание изменений
import changed from 'gulp-changed';

// Оптимизация графики
import svgmin from 'gulp-svgmin';
import imagemin from 'gulp-imagemin';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';

// Объединение медиа запросов
import groupMedia from 'gulp-group-css-media-queries';

// Сервер
import browserSync from 'browser-sync';




// 3. Дополнить итоговую сборку сжатыми файлами css и js
// 4. Разделить JS по страницам. Не тянуть весь JS на стреницы, где он не используется. 
// 5. В целом можно и css делить постранично отбрасывая не используемые стили


const paths = {
	src: {
		html: 'src/pug/*.pug',
		font: 'src/fonts/**/*',
		img: 'src/img/**/*.{*, !svg}',
		svg: 'src/img/svg/**/*',
		css: 'src/sass/main.sass',
		js: 'src/js/**/*',
	  },
	  build: {
		html: 'assets/',
		font: 'assets/font',
		svg: 'assets/img/svg',
		css: 'assets/css',
		img: 'assets/img',
		js: 'assets/js',
	  },
	  watch: {
		html: 'src/pug/**/*',
		css: 'src/sass/**/*',
	  },
	  serv: {
		html: 'assets',
	  },
	  del: {
		dev: 'assets',
	  }
};

function browsersync() {
	browserSync.init({
		server: {
			baseDir: paths.serv.html
		},
		browser: 'firefox'
	})
}

function clean() {
	return deleteAsync('./assets/');
}

function font() {
	return src(paths.src.font)
		.pipe(dest(paths.build.font))
}


function html() {
  return src(paths.src.html)
  	.pipe(changed(paths.build.html))
    .pipe(pug({ pretty: true }))
    .pipe(dest(paths.build.html))
}

function css() {
	return src(paths.src.css)
		.pipe(changed(paths.build.css))
		.pipe(sourceMap.init())		
		.pipe(sass())
		.pipe(groupMedia())
		.pipe(sourceMap.write())
		.pipe(dest(paths.build.css))
		.pipe(browserSync.stream())
}

function js() {
	return src(paths.src.js)
	  .pipe(dest(paths.build.js))
  }

function svg() {
	return src(paths.src.svg)
		.pipe(changed(paths.build.svg))
		.pipe(svgmin())
		.pipe(dest(paths.build.svg))
		.pipe(browserSync.stream())
}

function img() {
	return src(paths.src.img)
		.pipe(changed(paths.build.img))
		.pipe(imagemin([
			imageminJpegRecompress({
				loops: 6,
				min: 70,
				max: 85,
				quality: 'high'
			})
		]))
		.pipe(dest(paths.build.img))
		.pipe(browserSync.stream());
}

function startwatch() {
	watch(paths.watch.html, html);
	watch(paths.watch.css, css);
	watch(paths.src.font, font);
	watch(paths.src.img, img);
	watch(paths.src.svg, svg);
	watch(paths.src.js, js);
	watch([paths.watch.html, paths.src.js]).on('change', browserSync.reload);
}

export default series(clean, parallel(html, js, font, css, svg, img), parallel(browsersync, startwatch));
