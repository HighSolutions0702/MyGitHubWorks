describe('Property object: ', function () {

    var ajaxScaffoldWithMissingValue, ajaxScaffold, ajaxScaffoldFailed;

    beforeEach(function () {
        ajaxScaffoldWithMissingValue = function (url, callback) {
            callback('api.conn.host=testhost\napi.conn.port=99999', 200);
        };
        ajaxScaffold = function (url, callback) {
            callback('api.conn.protocol=http\napi.conn.host=testhost\napi.conn.port=99999', 200);
        };

        ajaxScaffoldWithDefaultPort = function (url, callback) {
            callback('api.conn.protocol=http\napi.conn.host=testhost\napi.conn.port=80', 200);
        };

        ajaxScaffoldFailed = function (url, callback) {
            callback(null, 404);
        };
    });

    afterEach(function () {
        props.clear(); //Cleanup
    });

    it('Is api connection properties loaded?', function () {
        props.init('/application/properties/tests', ajaxScaffold);
        expect(props.apiconn.host).toEqual('testhost');
        expect(props.apiconn.port).toBe('99999');
        expect(props.apiconn.protocol).toBe('http');
    });

    it('is fed with partially set properties file', function () {
        props.init('/application/properties/tests', ajaxScaffoldWithMissingValue);
        expect(props.apiconn.host).toEqual('testhost');
        expect(props.apiconn.port).toBe('99999');
        expect(props.apiconn.protocol).toBe('api.conn.protocol');
    });

    it('is hit by ajax failure', function () {
        props.init('/application/properties/tests', ajaxScaffoldFailed);
        expect(props.apiconn.host).toEqual('');
        expect(props.apiconn.port).toBe('');
        expect(props.apiconn.protocol).toBe('');
    });


    it('gets default url with ajax failiure!', function () {
        props.init('/application/properties/tests', ajaxScaffoldFailed);
        expect(props.apiconn.url('/resources')).toEqual('http://localhost:8080/resources');
        expect(props.apiconn.url('')).toEqual('http://localhost:8080/');
    });

    it('gets valid url with well defined properties file', function () {
        props.init('/application/properties/tests', ajaxScaffold);
        expect(props.apiconn.url('/resources')).toEqual('http://testhost:99999/resources');
        expect(props.apiconn.url('')).toEqual('http://testhost:99999/');
    });


    it('ignores port 80 in url returned', function () {
        props.init('/application/properties/tests', ajaxScaffoldWithDefaultPort);
        expect(props.apiconn.url('/resources')).toEqual('http://testhost/resources');
        expect(props.apiconn.url('')).toEqual('http://testhost/');
    });

});
