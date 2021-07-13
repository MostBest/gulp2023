'use strict';

const log = param => console.log(param);

const { src, dest, series, parallel, watch }     = require('gulp');
const pug                                        = require('gulp-pug');
const sass                                       = require('gulp-sass')(require('sass'));
const del                                        = require('del');

const imagemin											             = require('gulp-imagemin');
const svgmin											               = require('gulp-svgmin');

const browserSync											           = require('browser-sync').create();
const reload                                     = browserSync.reload;
const stream                                     = browserSync.stream();

const version                                    = '2.0.0';
const lastModified                               = '7/13/2021';

const path = {
  dev: {
    html: 'dev/pug/*.pug',
    css: 'dev/sass/**/*.sass',
    img: 'dev/img/**/*.{*,!svg}',
    svg: 'dev/img/**/*.svg',
    js: 'dev/js/**/*.js',
  },
  build: {
    html: 'build',
    css: 'build/css',
    img: 'build/img',
    js: 'build/js',
  },
  serv: {
    html: 'dev/pug/**/*.pug',
  },
}

function mkdir() {
  return src('*.*', {read: false})
    .pipe(dest('./dev/pug'))
    .pipe(dest('./dev/sass'))
    .pipe(dest('./dev/img'))
    .pipe(dest('./dev/js'));
}

function clean() {
  return del(['build/**', '!build', '!build/img']);
}

function server() {

  browserSync.init({
      server: "./build"
  });

  watch(path.serv.html, html);
  watch(path.dev.css, css);
  watch(path.dev.img, img, svg).on('change', reload);
  watch(path.dev.js, js).on('change', reload);
  watch(path.build.html).on('change', reload);
}

function html() {
  return src(path.dev.html)
    .pipe(pug({
      pretty: true,
    }))
    .pipe(dest(path.build.html));
}

function img() {
  return src(path.dev.img)
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(dest(path.build.img));
}

function svg() {
  return src(path.dev.svg)
    .pipe(svgmin())
    .pipe(dest(path.build.img));
}

function css() {
  return src(path.dev.css)
    .pipe(sass())
    .pipe(dest(path.build.css))
}

function js() {
  return src(path.dev.js)
    .pipe(dest(path.build.js));
}

exports.clean = clean;
exports.mkdir = mkdir;
exports.default = series(
  clean,
  parallel(html, img, svg, css, js),
  server
);
