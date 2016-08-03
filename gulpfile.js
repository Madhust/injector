var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsdoc = require("gulp-typedoc");

var tsProject = ts.createProject("tsconfig.json", {
    typescript: require("typescript")
});

gulp.task("build", function () {
    return tsProject.src(["src/*.ts"])
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("."));
}); 

gulp.task("doc",["build"], function () {
    return gulp.src("src/*.ts").pipe(tsdoc({
        module:"commonjs",
        target:"es5",
        out:"doc/",
        name:"d-injector"
    }))
});