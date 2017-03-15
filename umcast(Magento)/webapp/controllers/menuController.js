
app.controller('menuCntrl', function ($scope, $http, $cookies, $window) {
    $scope.checkRecords = false;
    $scope.msg = null;
    //get session cookie
    var cookie = '';
    var vals = document.cookie.split(';');
    for (i = 0; i < vals.length; i++) {
        var val = vals[i].split('=');
        if (val[0].trim() == "userToken") {
            cookie = val[val.length - 1];
        }
    }

//	logout function
    $scope.logOut = function () {
        document.cookie = 'userToken= ' + ' ' + ' ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        $scope.checkToken = false;
        $window.location.href = "/admin/login.html";
    };


    //Get login users profile details
    $http({
        method: 'GET',
        url: '/unstoppablemarketers/resources/rest/getActiveMenu?token=' + cookie,
        data: $scope.menuActive
    }).success(function (data) {
        $scope.menuActive = data.menu;
        if (data.status.status == 200) {
            $scope.affiliatelink = $scope.profile.referralCode;
        }
        else {
            $scope.logOut();
        }
    });
});
	