'use strict';

let ts = require("gulp-typescript");
let buffer = require('vinyl-buffer');
let uglify = require("gulp-uglify");
let sourcemaps = require("gulp-sourcemaps");

let fancy_log = require("fancy-log");
let source = require('vinyl-source-stream');
let babelify = require('babelify');
let browserify = require('browserify');
let browserifyInc = require('browserify-incremental');
let tsify = require("tsify");

const paths = {
    tsConfig: 'tsconfig.json',
    scriptsDst: 'dist',
    outDev: 'game.dev.js',
    outFinal: 'game.js',
    tempDst: 'dist/tmp',
    entry: 'dist/tmp/entry.js'
};

const babelConfig = {
    extensions: [".ts", ".js"],
    global: true,
    presets: [
        // ["@babel/preset-typescript", {allowNamespaces: true,}],
        "@babel/preset-env",
    ],
    sourceType: "module",
    plugins: [
        // "@babel/transform-arrow-functions",
        // '@babel/plugin-transform-typescript',
        // ['@babel/plugin-transform-modules-commonjs', {}],
    ],
    compact: true,
    minified: true,
    comments: false
};

const babelConfigDebug = {
    ...babelConfig,
    minified: false,
    compact: false,
    comments: true
};

const browserifyConfig = {
    entries: ["src/index.ts"],
    basedir: ".",
    cache: {},
    packageCache: {}
};

const browserifyConfigDebug = {
    ...browserifyConfig,
    cacheFile: './dist/browserify-cache.json',
    debug: true,
};

module.exports = function (gulp, options, plugins) {
    function BrowserfyBuild(debug = false) {
        // console.log(__dirname)
        return browserify(Object.assign({}, debug ? browserifyConfigDebug : browserifyConfig))
            .plugin(tsify, {target: 'es5'})
            .transform(babelify, debug ? babelConfigDebug : babelConfig)
            .transform('browserify-postcss', {
                plugin: [
                    'postcss-import',
                    ['postcss-cssnext', {
                        'browsers': [
                            '> 1%',
                            'last 2 versions',
                            'Safari 8'
                        ]
                    }],
                    'postcss-assets'
                ],
                inject: true,
                global: true,
                extensions: ['.pcss']
            })
            .bundle()
            .pipe(source(debug ? paths.outDev : paths.outFinal))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            //.pipe(uglify())
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest(paths.scriptsDst));
    }

    gulp.task("copy-html", function () {
        return gulp.src(["src/*.html"]).pipe(gulp.dest(paths.scriptsDst));
    });

    gulp.task('build:release', () => BrowserfyBuild(false));
    gulp.task('build:debug', () => BrowserfyBuild(true));

    gulp.task('dev', gulp.series('build:debug', "copy-html"));
    gulp.task('release', gulp.parallel([ 'build:release']));
};
