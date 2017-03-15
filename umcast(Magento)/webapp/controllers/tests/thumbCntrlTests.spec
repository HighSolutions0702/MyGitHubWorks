describe("Loading 3 thumbnails for populating upload list", function () {
    'use strict';

    var httpMock, scope, createController;

    var cookie = "asew2efwef2323";

    beforeEach(module('com.obs.upload'));

    beforeEach(inject(function ($injector) {

        // Set up the mock http service responses
        httpMock = $injector.get('$httpBackend');


        // Get hold of a scope (i.e. the root scope)
        var $rootScope = $injector.get('$rootScope');
        scope = $rootScope.$new();


        var $controller = $injector.get('$controller');

        createController = function () {
            return $controller('ThumbNailCtrl', {'$scope': scope, '$cookies': {'sessionToken': cookie }});
        };

    }));


afterEach(function () {
        httpMock.verifyNoOutstandingExpectation();
        httpMock.verifyNoOutstandingRequest();
        httpMock = null;
    });

    it("Is a valid url passed to server??", function () {
        httpMock.expectGET('http://localhost:/resources/rest/createThumbnailFromTemp?token=' + cookie, {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        }).respond(200, {'status': 200});

        createController();
        scope.loadThumbnail();
        httpMock.flush(); //Forces the backend to consume the request immediately
    });

    it('Stores thumbnails to scope on valid response recieved', function () {
        httpMock.expectGET('/resources/rest/createThumbnailFromTemp?token=' + cookie, {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        }).respond({ 'status': { 'status': 200, 'msg': 'Success'}, 'thumbnails': ['/images/tests/aThumb.png', '/images/tests/anotherThumb.png', '/images/tests/yetAnotherThumb.png']});

        createController();
        scope.loadThumbnail();

        httpMock.flush();
        expect(scope.thumbnails).toEqual(['/images/tests/aThumb.png', '/images/tests/anotherThumb.png', '/images/tests/yetAnotherThumb.png']);

    });

    it('Sets selected thumbnail to first one in the list', function () {
        httpMock.expectGET('/resources/rest/createThumbnailFromTemp?token=' + cookie, {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        }).respond({ 'status': { 'status': 200, 'msg': 'Success'}, 'thumbnails': ['/images/tests/aThumb.png', '/images/anotherThumb.png', '/images/yetAnotherThumb.png']});

        createController();
        scope.loadThumbnail();

        httpMock.flush();
        expect(scope.selectedThumb).toEqual('/images/tests/aThumb.png');

    });


    it('Does not mangle thumbnail paths that are starting with relative notation', function () {
        httpMock.expectGET('/resources/rest/createThumbnailFromTemp?token=' + cookie, {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        }).respond({ 'status': { 'status': 200, 'msg': 'Success'}, 'thumbnails': ['/images/tests/aThumb.png', '/images/tests/anotherThumb.png', '/images/tests/yetAnotherThumb.png']});

        createController();
        scope.loadThumbnail();

        httpMock.flush();
        expect(scope.thumbnails).toEqual(['/images/tests/aThumb.png', '/images/tests/anotherThumb.png', '/images/tests/yetAnotherThumb.png']);

    });

    it('Does not mangle thumbnail paths that are starting with relative notation with no forward slash prefix', function () {
        httpMock.expectGET('/resources/rest/createThumbnailFromTemp?token=' + cookie, {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        }).respond({ 'status': { 'status': 200, 'msg': 'Success'}, 'thumbnails': ['images/tests/aThumb.png', 'images/tests/anotherThumb.png', 'images/tests/yetAnotherThumb.png']});

        createController();
        scope.loadThumbnail();

        httpMock.flush();
        expect(scope.thumbnails).toEqual(['/images/tests/aThumb.png', '/images/tests/anotherThumb.png', '/images/tests/yetAnotherThumb.png']);

    });


    it('Activates save button on valid response received', function () {
        httpMock.expectGET('/resources/rest/createThumbnailFromTemp?token=' + cookie, {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        }).respond({ 'status': { 'status': 200, 'msg': 'Success'}, 'thumbnails': ['/images/tests/aThumb.png', '/images/tests/anotherThumb.png' , '/images/tests/yetAnotherThumb.png']});

        createController();
        scope.loadThumbnail();

        httpMock.flush();
        expect(scope.showSaveBtn).toBe(true);

    });

    it('Display upload success message on valid response recieved', function () {
        httpMock.expectGET('/resources/rest/createThumbnailFromTemp?token=' + cookie, {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        }).respond({ 'status': { 'status': 200, 'msg': 'Success'}, 'thumbnails': ['/images/tests/thumb1.png', '/images/tests/thumb2.png']});

        createController();
        scope.loadThumbnail();
        httpMock.flush();
        expect(scope.uploadMsg).toEqual('Created thumbnail. Please enter required information to save.');

    });


    it('Display default images on server error', function () {
        httpMock.expectGET('/resources/rest/createThumbnailFromTemp?token=' + cookie, {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        }).respond({ 'status': { 'status': 204, 'msg': 'Failed'}, 'thumbnails': ['/images/tests/thumb1.png', '/images/tests/thumb2.png']});

        createController();
        scope.loadThumbnail();

        httpMock.flush();
        expect(scope.thumbnails).toEqual(['/images/tests/upload_sign.png', '/images/tests/upload_sign1.png', '/images/tests/upload_sign2.png']);
        expect(scope.selectedThumb).toEqual('/images/tests/upload_sign.png');
        expect(scope.uploadMsg).toEqual('Failed to create thumbnails on server!');

    });


});
