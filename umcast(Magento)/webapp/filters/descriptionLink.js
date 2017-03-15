/**
 * Created by cini priya devi_l on 10/4/14.
 */

app.filter('linky', function ($sce) {
    var regEx = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g;
    return function (str) {
        str = str || '';
        return $sce.trustAsHtml(str.
                replace(/</g, '&lt;').
                replace(/>/g, '&gt;').
                replace(regEx,
                function ($1) {
                    if ($1.indexOf("http://") != -1) {
                        return '<a href="' + $1 + '">' + $1 + '</a>';
                    }
                    else {
                        return '<a href=http://' + $1 + '>' + $1 + '</a>';
                    }
                })
        );
    }
});
