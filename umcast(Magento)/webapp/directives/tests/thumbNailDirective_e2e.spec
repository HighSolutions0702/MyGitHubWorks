'use strict';


describe('thumbnailDirectiveTest', function () {

    var ptor, loadThumbNailBtn;


    beforeEach(function () {
        var httpBackendMock = function () {
            var cookie = 'sdfewfw234234';
            angular.module('httpBackendMock', ['ngMockE2E', 'ngCookies'])
                .run(function ($cookies) {
                    $cookies.sessionToken = cookie;

                })
                .run(function ($httpBackend) {
                    var data = {
                        'status': { 'status': 200, 'msg': 'Success'},
                        'thumbnails': ['images/tests/aThumb.png', '/images/tests/anotherThumb.png' , '/images/tests/yetAnotherThumb.png']
                    };

                    $httpBackend.whenGET('http://localhost:8080/resources/rest/createThumbnailFromTemp?token=' + cookie, {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json, text/plain, */*'
                    }).respond(200, data);


                    $httpBackend.whenGET(/.*/).passThrough();
                });
        };

        ptor = protractor.getInstance();
        ptor.addMockModule('httpBackendMock', httpBackendMock);
        browser.get('/directives/tests/thumbNailTester.html');
    });

    beforeEach(function () {
        loadThumbNailBtn = element(by.buttonText('load!'));
    });

    afterEach(function () {
        browser.manage().logs().get('browser').then(function (browserLog) {
            console.log('log: ' + require('util').inspect(browserLog));
        });
    });


    it('Is the thumbnail list initialized? ', function () {
        expect(element(by.buttonText('load!')).isPresent()).toBe(true);
        var thumbList = element.all(by.repeater('thumbnail in thumbnails'));
        expect(thumbList.count()).toEqual(3);
    });

    it('Does thumbnail list contain 3 values? ', function () {
        loadThumbNailBtn.click();
        var thumbList = element.all(by.repeater('thumbnail in thumbnails'));
        expect(thumbList.count()).toEqual(3);
    });

    it('Is contained image src well formed? ', function () {
        loadThumbNailBtn.click();
        var firstThumbNail = element.all(by.repeater('thumbnail in thumbnails')).first();
        expect(firstThumbNail).toNotBe(null);
        var imageSrc = firstThumbNail.element(by.tagName('img'));
        expect(imageSrc).toNotBe(null);
        expect(imageSrc.getAttribute('src')).toBe('http://localhost:8000/images/tests/aThumb.png');
    });

    it('Is selected image displayed? ', function () {
        loadThumbNailBtn.click();
        var thumbNailToClick = element.all(by.repeater('thumbnail in thumbnails')).last();
        var imageHref = thumbNailToClick.element(by.tagName('a'));
        imageHref.click();
        expect(element(by.id('selectedImage')).element(by.tagName('img')).getAttribute('src')).toBe('http://localhost:8000/images/tests/yetAnotherThumb.png');
    });
});

