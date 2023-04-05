'use strict';

import pkg from 'gulp';
const { gulp, src, dest, parallel, series, watch } = pkg;

import pug from 'gulp-pug';
import { deleteAsync } from 'del';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import svgmin from 'gulp-svgmin';
import imagemin from 'gulp-imagemin';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';
import browserSync from 'browser-sync';

const paths = {
	dev: {
		img: 'dev/img/**/*.{*, !svg}',
		svg: 'dev/img/svg/**/*',
		html: 'dev/pug/**/*',
		css: 'dev/sass/**/*',
		js: 'dev/js/**/*',
	  },
	  build: {
		html: 'assets/html',
		svg: 'dev/img/svg',
		css: 'assets/css',
		img: 'assets/img',
		js: 'assets/js',
	  },
	  serv: {
		html: 'assets/html/',
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
/*
	Нет работы с JS, возможно стоит подключить TypeScript
*/

function html() {
  return src(paths.dev.html)
    .pipe(pug({ pretty: true }))
    .pipe(dest(paths.build.html))
}

function css() {
	return src(paths.dev.css)
		.pipe(sass())
		.pipe(dest(paths.build.css))
		.pipe(browserSync.stream())
}

function js() {
	return src(paths.dev.js)
	  .pipe(dest(paths.build.js))
  }

function svg() {
	return src(paths.dev.svg)
		.pipe(svgmin())
		.pipe(dest(paths.build.svg))
		.pipe(browserSync.stream())
}

function img() {
	return src(paths.dev.img)
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
	watch(paths.dev.html, html);
	watch(paths.dev.css, css);
	watch(paths.dev.img, img);
	watch(paths.dev.svg, svg);
	watch(paths.dev.js, js);
	watch([paths.dev.html, paths.dev.js]).on('change', browserSync.reload);
}

export default series(html, css, svg, img, parallel(browsersync, startwatch));