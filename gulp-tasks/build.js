const gulp = require("gulp"),
  imagemin = require("gulp-imagemin"),
  del = require("del"),
  usemin = require("gulp-usemin"),
  rev = require("gulp-rev"),
  cssnano = require("gulp-cssnano"),
  uglify = require("gulp-uglify"),
  browserSync = require("browser-sync").create();

gulp.task("previewDist", () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
});

gulp.task("deleteDistFolder", ["icons"], () => {
  return del("./docs");
});

gulp.task("copyGeneralFiles", ["deleteDistFolder"], () => {
  const paths = [
    "./app/**/*",
    "!./app/index.html",
    "!./app/assets/img/**",
    "!./app/assets/styles/**",
    "!./app/assets/scripts/**",
    "!./app/assets/temp",
    "!./app/assets/temp/**",
    "!./app/assets/design",
    "!./app/assets/design/**"
  ];
  return gulp.src(paths).pipe(gulp.dest("./docs"));
});

gulp.task("optimizeImages", ["deleteDistFolder"], () => {
  return gulp
    .src([
      "./app/assets/img/**/*",
      "!./app/assets/img/icons",
      "!./app/assets/img/icons/**/*"
    ])
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
      })
    )
    .pipe(gulp.dest("./docs/assets/img"));
});

gulp.task("useminTrigger", ["deleteDistFolder"], () => {
  gulp.start("usemin");
});

gulp.task("usemin", ["styles", "scripts"], () => {
  return gulp
    .src("./app/index.html")
    .pipe(
      usemin({
        css: [
          () => {
            return rev();
          },
          () => {
            return cssnano();
          }
        ],
        js: [
          () => {
            return rev();
          },
          () => {
            return uglify();
          }
        ]
      })
    )
    .pipe(gulp.dest("./docs"));
});

gulp.task("build", [
  "deleteDistFolder",
  "copyGeneralFiles",
  "optimizeImages",
  "useminTrigger"
]);
