//gulp stuff i need
var _ = require('underscore'),
    fs = require('fs'),
    pkg = require('./package.json'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel')

// non-gulp stuff i need
var http = require('http'),
    connect = require('connect')

var paths = {
  scripts: ['src/**/*.js'],
  concatenatedScripts: ['build/' + pkg.name + '.js']
  },
  serverPort = 3000,
  buildLocation = 'build'

gulp.task('combineAllSets', function () {
  fs.readdir('./lib/', function (err, files) {

    var allSets = []

    _.each(files, function (filename) {
      var fileContents = fs.readFileSync('./lib/' + filename, {encoding: 'utf8'})
      var release = JSON.parse(fileContents)
      allSets.push(release)
    })

    fs.writeFile('./lib/cards.json', JSON.stringify(allSets))
  })
})

gulp.task('compileScripts', function () {
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(concat(pkg.name + '.js'))
    .pipe(babel())
    .pipe(gulp.dest(buildLocation))
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

// launch this repo as a server (port 3000)
gulp.task('serve', function () {
  var app = connect().use(connect.static(__dirname))

  http.createServer(app).listen(serverPort)
  console.log('server running on localhost:' + serverPort)
})

// builds everything to the build directory
gulp.task('build', ['compileScripts', 'compressScripts'])

// runs a build and launches a server
gulp.task('dev', ['compileScripts', 'watch', 'serve'])

gulp.task('default', ['dev'])
