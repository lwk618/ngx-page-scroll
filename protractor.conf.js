var config = {
    baseUrl: 'http://localhost:4200/',
    specs: ['test/e2e/**/*.spec.js'],
    directConnect: false,
    exclude: [],
    allScriptsTimeout: 110000,
    getPageTimeout: 100000,
    framework: 'jasmine2',
    jasmineNodeOpts: {
        isVerbose: false,
        showColors: true,
        includeStackTrace: false,
        defaultTimeoutInterval: 400000,
        helpers: ['node_modules/jasmine-expect/index.js']
    },

    /**
     * ng2 related configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     *
     */
    useAllAngular2AppRoots: true
};

if (process.env.TRAVIS) {

    var capabilities = [
        // [platform, browsername, version]
        ['macOS 10.13', 'chrome', '66.0'],
        ['macOS 10.13', 'chrome', '65.0'],
        ['macOS 10.13', 'chrome', '64.0'],
        ['macOS 10.13', 'chrome', '63.0'],
        ['macOS 10.13', 'chrome', '62.0'],
        ['macOS 10.12', 'chrome', '61.0'],
        ['macOS 10.12', 'chrome', '60.0'],
        ['macOS 10.12', 'chrome', '54.0'],
        ['macOS 10.12', 'chrome', '49.0'],
        ['Windows 10', 'MicrosoftEdge', '16.16299'],
        ['Windows 10', 'MicrosoftEdge', '14.14393'],
        ['Windows 10', 'MicrosoftEdge', '13.10586'],
        // TODO Check why getting window height does not work in android any more
        // ['Linux', 'android', '6.0']
        // TODO Selenium Driver problem for the following
        // ['macOS 10.12', 'safari', '10.0'],
        // ['Windows 10', 'internet explorer', '11.103'],
        // ['Windows 10', 'firefox', '50.0'],
        // TODO Problem calculating the target position in tests
        // ['OS X 10.10', 'iphone', '10.0'],
        // ['OS X 10.10', 'iphone', '9.3']
    ];

    // Override the baseUrl, as the port is a different one
    config.baseUrl = 'http://localhost:8000/';
    config.multiCapabilities = capabilities.map(function (capability) {
        return {
            browserName: capability[1],
            platform: capability[0],
            version: capability[2],
            shardTestFiles: true,
            name: 'NgxPageScroll',
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
        }
    });
    config.sauceUser = process.env.SAUCE_USERNAME;
    config.sauceKey = process.env.SAUCE_ACCESS_KEY;
    config.sauceBuild = 'travis-build#' + process.env.TRAVIS_BUILD_NUMBER;
} else {
    config.multiCapabilities = [{browserName: 'chrome'}];
}

exports.config = config;
