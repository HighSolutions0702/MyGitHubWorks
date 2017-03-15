app.controller('resetpwdCtrl', function ($scope, $http, $location, $window) {
    $scope.user = {};
    var newURL = window.location.search;
    var aarr = newURL.split('=');
    var id = aarr[aarr.length - 1];
    $scope.user.ref = id;


    $scope.msg = null;
    $scope.checkVal = false;
    $scope.resetPassword = function () {
        $http({
            method: 'POST',
            url: 'resources/rest/resetPassword',
            headers: {'Content-Type': 'application/json'},
            data: $scope.user
        })
            .success(function (data) {
                $scope.status = data.status;
                //alert($scope.status);
                if ($scope.status.status == 200) {
                    $scope.checkVal = true;
                    $scope.msg = "Password changed successfully";
                    $window.location.href = "../login.html";
                }
                else if ($scope.status.status == 401) {
                    $scope.checkVal = true;
                    $scope.msg = "Password reset Failed";
                }
                else {
                    //	$scope.msg="Email id already exist";
                }
            });
    };
});

app.directive('checkpwd', function () {
    return { require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.form.newPassword.$viewValue;
                ctrl.$setValidity('noMatch', !noMatch);
            });
        }
    };

});