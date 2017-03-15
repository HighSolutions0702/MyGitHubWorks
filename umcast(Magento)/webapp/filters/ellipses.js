/**
 * Created by cini priya devi_l on 10/1/14.
 */

app.filter('ellipseFilter', function () {
    return function (words, limit) {
            if (!utils.isValid(words)) return words;
            if (isNaN(limit)) return words;
            if (limit <= 0) return '';
            if (limit > 55) {
                // alert(words.length);
                if (words != null && words != undefined && words.length > limit) {
                    return (words.substr(0, limit) + ' ' + '...');
                }
            }
            if (limit <= 55) {
                // alert(words.length);

                if (words != null && words != undefined && words.length > limit) {
                    return (words.substr(0, 50) + ' ' + '...');
                }
                if (words != null && words != undefined && words.length < limit) {
                    return words;
                }
            }
    }
});

