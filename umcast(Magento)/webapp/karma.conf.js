
    // Karma configuration
    // Generated on Wed Sep 17 2014 14:24:01 GMT+0530 (IST)

    module.exports = function (config) {
        config.set({


            // base path that will be used to resolve all patterns (eg. files, exclude)
            basePath: '',


            // frameworks to use
            // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
            frameworks: ['jasmine'],

            // list of files / patterns to load in the browser
            files: [
                'bower_components/angular/angular.js',
                'bower_components/angular-mocks/angular-mocks.js',
                'bower_components/angular-cookies/angular-cookies.js',
                'bower_components/angular-sanitize/angular-sanitize.js',
                'js/messageResource.js',
                'application/app.js',
			    'controllers/*.js',
                'directives/*.js',
                'filters/*.js',
                'controllers/tests/*.spec',
                'directives/tests/*.spec',
                'filters/tests/*.spec'
	]


     
            // list of files to exclude
            exclude: [
                'controllers/tests/*_e2e.spec'
            ],


     
            // test results reporter to use
            // possible values: 'dots', 'progress'
            // available reporters: https://npmjs.org/browse/keyword/karma-reporter
            reporters: ['progress', 'brackets'],


   
            // web server port
            port: 9876,
            runnerPort: 9100,



            // enable / disable colors in the output (reporters and logs)
            colors: true,



            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_DEBUG,



            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: true,



            // start these browsers
            // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
            browsers: ['PhantomJS'],



            captureTimeout: 60000,

            // Continuous Integration mode
            // if true, Karma captures browsers, runs the tests and exits
            singleRun: false
        });
    };
