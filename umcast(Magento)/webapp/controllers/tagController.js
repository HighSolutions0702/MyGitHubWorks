app.controller('tagCtrl', function ($scope, $http, $cookies, $window) {
    $scope.tagsDetails = [];
    $scope.tagsLength = 0;
    $scope.index = 0;
    $scope.tagId = 0;
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
        $window.location.href = "admin/login.html";
    };

    //Get login users profile details
    $http({
        method: 'GET',
        url: 'resources/rest/getUserProfile?token=' + cookie,
        data: $scope.profile
    }).success(function (data) {
        if (data.status.status == 200) {
            $scope.profile = data.user;
            $scope.affiliatelink = $scope.profile.referralCode;
        }
        else if (data.status.status == 206) {
            $scope.checkVal = true;
            $scope.msg = "No record";
        }
        else {
            $scope.logOut();
        }
    });
    //Get login users profile details
    $http({
        method: 'GET',
        url: 'resources/rest/getAllTags',
        data: $scope.tagsList
    }).success(function (data) {

        $scope.tagsList = data;
        if ($scope.tagsList.status.status == 200) {
            $scope.tagsDetails = $scope.tagsList.tags;
            if ($scope.tagsDetails instanceof Array) {
                $scope.tagsDetails = $scope.tagsDetails;
            } else {
                $scope.tagsDetails = [$scope.tagsDetails];
            }
            if ($scope.tagsDetails != null && $scope.tagsDetails != "" && $scope.tagsDetails.length > 0) {
                $scope.tagsLength = $scope.tagsDetails.length;
            }
            else {
                $scope.checkTags = true;
                $scope.tagMsg = "No records found";
            }
        }
        else {
            //$scope.logOut();
        }
    });

    //add new tags
    $scope.addTag = function () {
        $scope.visitTag = true;
        if ($scope.tagValues.tagName != null && $scope.tagValues.tagName != '') {
            $scope.visitTag = false;
            $http({
                method: 'POST',
                url: 'resources/rest/addTags',
                headers: {'Content-Type': 'application/json'},
                data: $scope.tagValues
            }).success(function (data) {
                $scope.tagStatus = data.status;
                if ($scope.tagStatus.status == 200) {
                    $scope.checkVal = true;
                    $scope.msg = "Saved successfully";
                }
                else if ($scope.tagStatus.status == 204) {
                    $scope.checkVal = true;
                    $scope.msg = "Value Required";
                }
                else {
                    //$scope.logOut();
                }
            });
        } else {
            $scope.visitTag = true;
        }
    };
    $scope.getTagById = function () {
        $http({
            method: 'GET',
            url: 'resources/rest/getTagById?getId=' + $scope.tagId,
            data: $scope.getTagVal
        }).success(function (data) {
            $scope.tagEditValues = data.tag;
        });
    };
    $scope.updateTag = function () {
        $scope.visitTag = true;
        if ($scope.tagEditValues.tagName != null && $scope.tagEditValues.tagName != '') {
            $scope.visitTag = false;
            $http({
                method: 'POST',
                url: 'resources/rest/updateTags?updateId=' + $scope.tagId,
                headers: {'Content-Type': 'application/json'},
                data: $scope.tagEditValues
            }).success(function (data) {
                $scope.tagStatus = data.status;
                if ($scope.tagStatus.status == 200) {
                    $scope.checkVal = true;
                    $scope.msg = "updated successfully";
                }
                else if ($scope.tagStatus.status == 204) {
                    $scope.checkVal = true;
                    $scope.msg = "Value Required";
                }
                else {
                    //$scope.logOut();
                }
            });
        } else {
            $scope.visitTag = true;
        }
    };
    $scope.addNewTag = function () {
        $window.location.href = "admin/addupdatetags.html";
    };

    $scope.editTag = function (tags) {
        $window.location.href = "admin/addupdatetags.html?tagId=" + tags.tagId;
    };

    //load edited Video id from url
    var newURL = window.location.search;
    if (newURL != "") {

        var aarr = newURL.split('=');
        var id = aarr[aarr.length - 1];
        var key = aarr[aarr.length - 2];
        if (key == "?tagId" && id != "") {
            $scope.tagId = id;
            $scope.getTagById();
        }
    }
});
