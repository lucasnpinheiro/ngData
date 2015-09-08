// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-01-28 using
// generator-karma 0.8.3

module.exports = function(config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['mocha', 'chai', 'phantomjs-shim'],

        // reporters configuration 
        reporters: ['mocha'],

        // list of files / patterns to load in the browser
        files: [
            // bower:js
            'bower_components/angular/angular.js',
            'bower_components/bluebird/js/browser/bluebird.js',
            'bower_components/lodash/lodash.js',
            'bower_components/knex/build/knex.js',
            'bower_components/ngCordova/dist/ng-cordova.js',
            'bower_components/squel/squel-basic.js',
            'bower_components/Faker/build/build/faker.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/faker/build/build/faker.js',
            // endbower
            'src/*.js',
            'src/constants/**/*.js',
            'src/providers/**/*.js',
            'src/services/**/*.js',
            'src/directives/**/*.js',
            'test/spec/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'PhantomJS'
        ],

        // Which plugins to enable
        plugins: [
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-chai',
            'karma-mocha-reporter',
            'karma-phantomjs-shim'
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_ERROR,

        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //   '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'
    });
};