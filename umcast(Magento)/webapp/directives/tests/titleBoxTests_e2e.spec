/**
 * Created by cini priya devi_l on 9/26/14.
 */
'use strict';


describe('VideoTitleSizeConstrainsTests', function () {

    var titleTextBox;


    beforeEach(function () {
        browser.get('/directives/tests/videoTitleTester.html');
    });

    beforeEach(function () {
        titleTextBox = element(by.id('titleBox'));
    });

    afterEach(function () {
        browser.manage().logs().get('browser').then(function (browserLog) {
            console.log('log: ' + require('util').inspect(browserLog));
        });
    });

    it('Is the text box initialized? ', function () {
        expect(titleTextBox.isDisplayed()).toBe(true);
        expect(titleTextBox.getAttribute('value')).toEqual('umcast video testing site');
    });

    it('Does the text box accept valid title string? ', function () {
        expect(titleTextBox.isPresent()).toBe(true);
        titleTextBox.clear();
        // var title = 'Umcast protractor testing,for video title-that contains Alpha numeric characters and numbers like 100';
        var title = 'video Title should contains Alphanumeric values like @#';
        titleTextBox.sendKeys(title);
        expect(titleTextBox.getAttribute('value')).toEqual(title);
    });

    it('Is the video title length 55?', function () {
        titleTextBox.clear();
        var title = 'video Title should contains Alphanumeric values like 51gd';
        titleTextBox.sendKeys(title);
        expect(titleTextBox.getAttribute('value')).toEqual('video Title should contains Alphanumeric values like 51gd');
        expect(element(by.id('errMaxlength')).isDisplayed()).toBe(true); //Is error getting displayed?
        expect(element(by.id('errMaxlength')).getText()).toBe("Title should be shorter than 55 characters."); //Is error getting displayed?
    });

    it('Is the video title contains alphanumeric and numbers?', function () {
        titleTextBox.clear();
        var title = 'video Title should contains Alphanumeric values like 8fd,-tobe';
        titleTextBox.sendKeys(title);
        expect(titleTextBox.getAttribute('value')).toMatch(new RegExp('^[a-zA-Z0-9 ,.@!%$&*?-]+$'));

    })

    it('The video title should not contain defined special characters ?', function () {
        titleTextBox.clear();
        var title = 'video Title should contains Alphanumeric values like :#~!';
        titleTextBox.sendKeys(title);
        expect(titleTextBox.getAttribute('value').getText()).toNotMatch(new RegExp('^[:;_~#]+$'));
    })

});

