const gulp = require("gulp"),
  postCss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  varsCss = require("postcss-simple-vars"),
  nestedCss = require("postcss-nested"),
  importCss = require("postcss-import"),
  mixinsCss = require("postcss-mixins"),
  hexrgba = require("postcss-hexrgba");

gulp.task("styles", () => {
  return gulp
    .src("./app/assets/styles/styles.css")
    .pipe(
      postCss([importCss, mixinsCss, nestedCss, varsCss, hexrgba, autoprefixer])
    )
    .on("error", function(errMsg) {
      console.log("ERROR: " + errMsg.toString());
      this.emit("end");
    })
    .pipe(gulp.dest("./app/temp/styles"));
});
