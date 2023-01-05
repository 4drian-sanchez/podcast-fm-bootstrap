const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

//purgecss y rename
const purge = require("gulp-purgecss");
const rename = require("gulp-rename");

function css(done) {
  src("src/scss/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));
  done();
}

function buildcss(done) {
  src("build/css/app.css")
    .pipe(rename({ suffix: ".min" }))
    .pipe(
      purge({
        content: ["index.html"],
      })
    )
    .pipe(dest("build/css"));

  done();
}

function dev(done) {
  watch("src/scss/**/*.scss", css);
  done();
}

function versionWebp(done) {
  src("src/img/**/*.{png,jpg}").pipe(webp()).pipe(dest("build/img"));
  done();
}

function versionAvif(done) {
  src("src/img/**/*.{png,jpg}").pipe(avif()).pipe(dest("build/img"));
  done();
}

function img(done) {
  src("src/img/**/*")
    .pipe(imagemin({ optimizationLavel: 3 }))
    .pipe(dest("build/img"));
  done();
}

exports.css = css;
exports.dev = dev;
exports.img = img;
exports.webp = versionWebp;
exports.avif = versionAvif;
exports.build = buildcss;
exports.default = series(css, dev);
