app.controller('forgotpwdCtrl', function ($scope, $http, $location, $window, $cookies) {
    $scope.user = {};
    $scope.msg = null;
    $scope.checkVal = false;

    $scope.forgotPassword = function () {
        $http({
            method: 'POST',
            url: 'resources/rest/forgotPassword',
            headers: {'Content-Type': 'application/json'},
            data: $scope.user
        })
            .success(function (data) {
                $scope.status = data.status;

                if ($scope.status.status == 200) {
                    $scope.checkVal = true;
                    $scope.msg = "Mail sent successfully";
                    $window.location.href = "../login.html";
                }
                else if ($scope.status.status == 401) {
                    $scope.checkVal = true;
                    $scope.msg = "Email id not exist";
                }
                else {
                    $scope.msg = "Internal Error";
                }
            });
    };
});