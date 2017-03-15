app.controller('settingsCtrl', function ($scope, $http, $location, $window, $cookies) {
    $scope.menuDetails = [];
    $scope.cmsDetails = [];
    $scope.menuLength = 0;
    $scope.msg = null;
    $scope.checkVal = false;

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
    $http({
        method: 'GET',
        url: '/unstoppablemarketers/resources/rest/getMenuSettings',
        data: $scope.menu
    }).success(function (data) {

        if (data.status.status == 200) {
            $scope.menuDetails = data.menus;
            if ($scope.menuDetails instanceof Array) {
                $scope.menuDetails = $scope.menuDetails;
            } else {
                $scope.menuDetails = [$scope.menuDetails];
            }
            if ($scope.menuDetails != null && $scope.menuDetails != "" && $scope.menuDetails.length > 0) {
                $scope.menuLength = $scope.menuDetails.length;
            }
        }
        else if (data.status.status == 206) {
            $scope.checkVal = true;
            $scope.msg = "No record";
        }
        else {
            //$scope.logOut();
        }
    });

    //update setting details
    $scope.update = function () {
        $http({
            method: 'POST',
            url: '/unstoppablemarketers/resources/rest/updateMenuSettings',
            headers: {'Content-Type': 'application/json'},
            data: $scope.menuDetails
        }).success(function (data) {
            if (data.status.status == 200) {
                $scope.userstatus = data.status;
                $scope.checkVal = true;
                $scope.msg = "Saved successfully";
            }
            else if (data.status.status == 204) {
                $scope.checkVal = true;
                $scope.msg = "Value Required";
            }
            else {
                //$scope.logOut();
            }
        });


    };
    //back button
    $scope.back = function () {
        $window.location.href = "/admin/admindashboard.html";
    };
    //Get login users profile details
    $http({
        method: 'GET',
        url: '../resources/rest/getUserProfile?token=' + cookie,
        data: $scope.profile
    }).success(function (data) {
        if (data.status.status == 200) {
            $scope.profile = data.user;
            $scope.affiliatelink = $scope.profile.referralCode;
        }
        else {
            $scope.logOut();
        }
    });


    // get CMS Details
    $http({
        method: 'GET',
        url: '/unstoppablemarketers/resources/rest/getCMSContents',
        data: $scope.content
    }).success(function (data) {
        if (data.status.status == 200) {
            $scope.cmsDetails = data.contents;
            if ($scope.cmsDetails instanceof Array) {
                $scope.cmsDetails = $scope.cmsDetails;
            } else {
                $scope.cmsDetails = [$scope.cmsDetails];
            }
        }
        else {
            //$scope.logOut();
        }
    });
});