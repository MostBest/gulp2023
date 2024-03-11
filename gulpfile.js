'use strict';

import pkg from 'gulp';
const { gulp, src, dest, parallel, series, watch } = pkg;

import pug from 'gulp-pug';
import { deleteAsync } from 'del';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import sourceMap from 'gulp-sourcemaps';
import changed from 'gulp-changed';
import svgmin from 'gulp-svgmin';
import imagemin from 'gulp-imagemin';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';
import browserSync from 'browser-sync';

// gulp assets -> создается папка assets (production ver.). Готовый проект с жатыми стилями и скриптами.
// gulp -> создается папка dev. Версия для разработки
// Сделать отдельно сборку для production
// 1. Очистить папку assets
// 2. Добавить gulp-group-css-media-queries - объединяет файлы по брейкпоинтам

const paths = {
	dev: {
		html: 'dev/pug/index.pug',
		img: 'dev/img/**/*.{*, !svg}',
		svg: 'dev/img/svg/**/*',
		css: 'dev/sass/**/*',
		js: 'dev/js/**/*',
	  },
	  build: {
		html: 'assets/',
		svg: 'assets/img/svg',
		css: 'assets/css',
		img: 'assets/img',
		js: 'assets/js',
	  },
	  watch: {
		html: 'dev/pug/**/*'
	  },
	  serv: {
		html: 'assets',
	  },
};

function browsersync() {
	browserSync.init({
		server: {
			baseDir: paths.serv.html
		},
		browser: 'firefox'
	})
}

function html() {
  return src(paths.dev.html)
  	.pipe(changed(paths.build.html))
    .pipe(pug({ pretty: true }))
    .pipe(dest(paths.build.html))
}

function css() {
	return src(paths.dev.css)
		.pipe(changed(paths.build.css))
		.pipe(sourceMap.init())
		// .pipe(groupMedia())
		.pipe(sass())
		.pipe(sourceMap.write())
		.pipe(dest(paths.build.css))
		.pipe(browserSync.stream())
}

function js() {
	return src(paths.dev.js)
	  .pipe(dest(paths.build.js))
  }

function svg() {
	return src(paths.dev.svg)
		.pipe(changed(paths.build.svg))
		.pipe(svgmin())
		.pipe(dest(paths.build.svg))
		.pipe(browserSync.stream())
}

function img() {
	return src(paths.dev.img)
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
	watch(paths.dev.css, css);
	watch(paths.dev.img, img);
	watch(paths.dev.svg, svg);
	watch(paths.dev.js, js);
	watch([paths.watch.html, paths.dev.js]).on('change', browserSync.reload);
}

export default series(html, css, svg, img, parallel(browsersync, startwatch));