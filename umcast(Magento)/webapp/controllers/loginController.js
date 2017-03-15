app.controller('loginCtrl', function ($scope, $http, $location, $window, $cookies) {
    $scope.user = {};
    $scope.msg = null;
    $scope.checkVal = false;

    $scope.login = function () {
        $http({
            method: 'POST',
            url: 'resources/rest/login',
            headers: {'Content-Type': 'application/json'},
            data: $scope.user
        })
            .success(function (data) {
                $scope.status = data.status;

                if ($scope.status.status == 200) {
                    var a = new Date();
                    a = new Date(a.getTime() + 1000 * 60 * 60 * 24);
                    document.cookie = "userToken = " + data.token + "; expires= " + a.toUTCString() + "; path=/";
                    var newURL = window.location.search;
                    if (newURL != "") {
                        var aarr = newURL.split('=');
                        var id = aarr[aarr.length - 1];
                        var key = aarr[aarr.length - 2];
                        if (key == "?ved" && id != "") {
                            $window.location.href = "channelcast.html?ved=" + id + "&cookieToken=" + data.token;
                        }
                    }
                    else {
                        $window.location.href = "member/home.html";
                    }
                }
                else if ($scope.status.status == 401) {
                    $scope.checkVal = true;
                    $scope.msg = "Login Failed";
                }
                else {
                    $scope.msg = "Internal Error";
                }
            });
    };
});