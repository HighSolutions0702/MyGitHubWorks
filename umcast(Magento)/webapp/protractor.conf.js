// Configuration file for protractor.
exports.config = {
    /* // Do not start a Selenium Standalone sever - only run this using chrome.
     chromeOnly: true,
     chromeDriver: '../selenium/chromedriver',*/
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        //Enables the actual chrome based test running. Uncomment to run in your dev environment
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['incognito', 'disable-extensions', 'start-maximized', 'enable-crash-reporter-for-testing'],
            'excludeSwitches': ['ignore-certificate-errors']
        },
        //Enables headless testing on continuous integration server
//        'browserName': 'phantomjs',
//        'phantomjs.binary.path': 'node_modules/phantomjs/bin/phantomjs',
        'loggingPrefs': {
            'browser': 'ALL'
        }
    },

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: [
        //'controllers/tests/*_e2e.spec',
       'directives/tests/thumbNailDirective_e2e.spec',
        'directives/tests/titleBoxTests_e2e.spec'
        //'filters/tests/*_e2e.spec'
    ],

    frameworks: 'jasmine',
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },
    baseUrl: 'http://localhost:8000/'
};
