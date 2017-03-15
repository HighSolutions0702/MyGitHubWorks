/**
 * Created by cini priya devi_l on 10/1/14.
 */

'use strict';


describe('TitleLabelSummerizedTests', function () {

    var titleLabel;


    beforeEach(function () {
        browser.get('/filters/tests/ellipseFilterTester.html');
    });

    beforeEach(function () {
        titleLabel = element(by.id('titleLabel'));
    });

    afterEach(function () {
        browser.manage().logs().get('browser').then(function (browserLog) {
            console.log('log: ' + require('util').inspect(browserLog));
        });
    });

    it('Is the label initialized? ', function () {
        expect(titleLabel.isDisplayed()).toBe(true);
        // expect(element(by.id('titleLabel')).getText()).toBe("umcast video testing site for title label should summerized text");
    });
    it('is the label contains value', function () {
        expect(titleLabel.getText()).toBeDefined();
    });


});

