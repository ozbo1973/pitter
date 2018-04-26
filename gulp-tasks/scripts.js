const gulp = require("gulp"),
  webpack = require("webpack");

gulp.task("scripts", ["modernizr"], callback => {
  webpack(require("../webpack.config.js"), (err, stats) => {
    if (err) {
      console.log(err.toString());
    } else {
      console.log(stats.toString());
    }
    callback();
  });
});
