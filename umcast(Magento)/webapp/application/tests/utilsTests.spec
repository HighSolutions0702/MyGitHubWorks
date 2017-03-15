describe('Testing utility functions:', function () {

    it('Starts with character', function () {
        var testStr = '/';
        expect(utils.startsWith(testStr, '/')).toBe(true);
    });

    it('Starts with string', function () {
        var testStr = '/resources';
        expect(utils.startsWith(testStr, '/resources')).toBe(true);
    });

    it('Does not start with string', function () {
        var testStr = 'resources';
        expect(utils.startsWith(testStr, '/resources')).toBe(false);
    });


    it('Null string is empty', function () {
        var testStr = null;
        expect(utils.isNotEmpty(testStr)).toBe(false);
    });

    it('Empty string is empty', function () {
        var testStr = '';
        expect(utils.isNotEmpty(testStr)).toBe(false);
    });

    it('Undefined string is empty', function () {
        var testStr;
        expect(utils.isNotEmpty(testStr)).toBe(false);
    });


    it('Undefined string is empty', function () {
        var testStr;
        expect(utils.isNotEmpty(testStr)).toBe(false);
    });

    it('Numeric value is not empty', function () {
        var testStr = 0;
        expect(utils.isNotEmpty(testStr)).toBe(true);
    });

    it('Object value is not empty', function () {
        var obj = {};
        expect(utils.isNotEmpty(obj)).toBe(true);
    });


    it('Object value is valid', function () {
        var obj = {};
        expect(utils.isValid(obj)).toBe(true);
    });

    it('Undeclared object value is not valid', function () {
        var obj;
        expect(utils.isValid(obj)).toBe(false);
    });

    it('Null object value is not valid', function () {
        var obj = null;
        expect(utils.isValid(obj)).toBe(false);
    });


});
