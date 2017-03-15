/**
 * Created by cini priya devi_l on 10/4/14.
 */

app.directive('loading', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="loading" align="center"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="50" height="40" />LOADING...</div>',
        link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    };
});