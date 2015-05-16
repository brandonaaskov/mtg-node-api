var _ = require('underscore'),
    underscoreString = require('underscore.string'),
    fs = require('fs'),
    pkg = require('./package.json'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    mocha = require('gulp-mocha'),
    paths = {
      scripts: ['src/**/*.js'],
      tests: ['test/**/*.js'],
      concatenatedScripts: ['build/' + pkg.name + '.js']
    },
    buildLocation = 'build'

_.mixin(underscoreString.exports())

// TODO no longer used (just requiring mtgjson now)
//gulp.task('combineAllSets', function () {
//  var dirPath = './node_modules/mtgjson/json/'
//
//  fs.readdir(dirPath, function (err, files) {
//
//    var allSets = {}
//
//    _.each(files, function (filename) {
//      var fileContents = fs.readFileSync(dirPath + filename, {encoding: 'utf8'})
//      var release = JSON.parse(fileContents)
//      allSets[_.underscored(release.name)] = release
//    })
//
//    fs.writeFile('./lib/cards.json', JSON.stringify(allSets))
//  })
//})

gulp.task('compileScripts', function () {
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest(buildLocation))
})

gulp.task('runTests', function () {
  gulp.src(paths.tests)
    .pipe(plumber())
    .pipe(babel())
    .pipe(mocha())
})

gulp.task('compressScripts', function () {
  gulp.src(paths.concatenatedScripts)
    .pipe(uglify())
    .pipe(rename(pkg.name + '.min.js'))
    .pipe(gulp.dest(buildLocation))
})

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['build'])
})

// grouped tasks
var tasks = {
  'default': ['dev'],
  dev: [
    'compileScripts',
    'runTests',
    'watch'
  ],
  build: ['compileScripts']
}

gulp.task('build', tasks.build)
gulp.task('dev', tasks.dev)
gulp.task('default', tasks.default)
