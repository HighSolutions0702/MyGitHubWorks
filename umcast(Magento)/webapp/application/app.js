var utils = {
    startsWith: function (str, expr) {
        return str.indexOf(expr) == 0;
    },
    isNotEmpty: function (str) {
        if (str === undefined)
            return false;
        return str !== '' && str !== null;
    },
    isValid: function (obj) {
        if (typeof obj === 'undefined') {
            return false;
        } else if (typeof obj === 'string') {
            return this.isNotEmpty(obj);
        } else if (obj === null) {
            return false;
        }
        return true;
    }
};

var props = {
    apiconn: {
        protocol: '',
        host: '',
        port: '',
        url: function (path) {
            function mungePort(port) {
                if (port == 80) {
                    return '';
                }
                return ':' + port;
            }
            var scheme = utils.isValid(this.protocol) ? this.protocol + '://' : 'http' + '://';
            var domain = utils.isValid(this.host) ? this.host : 'localhost';
            var portF = utils.isValid(this.port) ? mungePort(this.port) : ':8080';
            var suffix = utils.startsWith(path, '/') ? path : '/' + path;
            return scheme + domain + portF + suffix;
        },
        reset: function () {
            this.host = this.port = this.protocol = '';
        }
    },
    /**
     * Initializes the property object with data from property files.
     * @param {String} propLocation  Point to the root folder of the property files. This can be a relative path
     */
    init: function (propLocation, ajaxFunc) {
        var config = {};
        if (propLocation && ajaxFunc) {
            config = {
                filePath: propLocation,
                ajaxFunction: ajaxFunc
            };
        } else if (propLocation) {
            config = {
                filePath: propLocation
            };
        } else {
            config = {
                ajaxFunction: ajaxFunc
            };
        }
        messageResource.init(config);
        messageResource.load('connection', function (status) {
            if (status === 200) {
                props.apiconn.protocol = messageResource.get('api.conn.protocol', 'connection');
                props.apiconn.host = messageResource.get('api.conn.host', 'connection');
                props.apiconn.port = messageResource.get('api.conn.port', 'connection');
            }
        });
    },
    clear: function () {
        props.apiconn.reset();
        messageResource.reset();
    }

};



var app = angular.module('com.obs', ['ngCookies', 'ngSanitize'])
    .config(function ($httpProvider) {
        //TODO Handle the path differently for tests from production
        props.init('/application/properties');
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.interceptors.push(function ($q) {
            return {
                'request': function (config) {
                    //Ensures that no url other than REST resource urls are intercepted
                    if (utils.startsWith(config.url, '/resources') || utils.startsWith(config.url, 'resources')) {
                        console.info('url path:' + config.url);
                        config.url = props.apiconn.url(config.url);
                    }
                    return config || $q.when(config);
                }

            }
        });
    });

var videoModule = angular.module('com.obs.video', ['com.obs', 'ngTagsInput']);

var uploadModule = angular.module('com.obs.video.upload', [ 'com.obs.video','angularFileUpload']);

var cmsModule = angular.module('com.obs.cmsModule', ['com.obs', 'textAngular']);

var videoSettingsModule = angular.module('com.obs.videocast', ['ngCookies', 'angularFileUpload', 'ngSanitize']);

var channelModule = angular.module('com.obs.channel', ['com.obs.video']);



