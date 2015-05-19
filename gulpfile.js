var _ = require('lodash'),
    underscored = require('underscore.string/underscored'),
    fs = require('fs'),
    pkg = require('./package.json'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    babel = require('gulp-babel'),
    paths = {
      scripts: ['src/**/*.js'],
      tests: ['test/**/*.js'],
      concatenatedScripts: ['build/' + pkg.name + '.js']
    },
    buildLocation = 'build'

gulp.task('combineAllSets', function () {
  var dirPath = './node_modules/mtgjson/json/'

  fs.readdir(dirPath, function (err, files) {

    var allSets = {}

    _.each(files, function (filename) {
      var fileContents = fs.readFileSync(dirPath + filename, {encoding: 'utf8'})
      var release = JSON.parse(fileContents)
      allSets[underscored(release.name)] = release
    })

    fs.writeFile('./lib/cards.json', JSON.stringify(allSets))
  })
})

gulp.task('compileScripts', function () {
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(babel())
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
    'watch'
  ],
  build: ['compileScripts']
}

gulp.task('build', tasks.build)
gulp.task('dev', tasks.dev)
gulp.task('default', tasks.default)
