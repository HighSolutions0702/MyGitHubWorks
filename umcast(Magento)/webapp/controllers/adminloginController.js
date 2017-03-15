app.controller('adminloginCtrl', function ($scope, $http, $location, $window, $cookies) {
    $scope.user = {};
    $scope.msg = null;
    $scope.checkVal = false;

    $scope.login = function () {
        $http({
            method: 'POST',
            url: '/resources/rest/adminLogin',
            headers: {'Content-Type': 'application/json'},
            data: $scope.user
        })
            .success(function (data) {
                $scope.status = data.status;

                if ($scope.status.status == 200) {
                    var a = new Date();
                    a = new Date(a.getTime() + 1000 * 60 * 60 * 24);
                    document.cookie = "userToken = " + data.token + "; expires= " + a.toUTCString() + "; path=/";
                    $window.location.href = "/admin/admindashboard.html";
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
