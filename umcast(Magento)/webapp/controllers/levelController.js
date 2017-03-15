app.controller('levelCtrl', function ($scope, $http, $location, $window, $cookies) {
    $scope.levelDetails = [];
    $scope.msg = null;
    $scope.checkVal = false;
    $scope.levelLength = 0;
    $scope.onlyNumbers = /^\d+$/;
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


    // get Level Details
    $scope.loadLevel = function () {
        $http({
            method: 'GET',
            url: '/unstoppablemarketers/resources/rest/getLevelContents',
            data: $scope.levels
        }).success(function (data) {
            if (data.status.status == 200) {
                $scope.levelDetails = data.levels;
                if ($scope.levelDetails instanceof Array) {
                    $scope.levelDetails = $scope.levelDetails;
                } else {
                    $scope.levelDetails = [$scope.levelDetails];
                }
                if ($scope.levelDetails != null && $scope.levelDetails != "" && $scope.levelDetails.length > 0) {
                    $scope.levelLength = $scope.levelDetails.length;
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
    };
    $scope.loadLevel();
    //add details
    $scope.add = function () {
        $scope.checkVal = false;
        $scope.newlevelcontent = "";
        document.getElementById("added").style.display = "block";
        document.getElementById("editor").style.display = "none";
        document.getElementById("level_table").style.display = "none";
    };
    //edit details
    $scope.edit = function (level) {
        $scope.checkVal = false;
        $scope.levelcontent = level;
        document.getElementById("editor").style.display = "block";
        document.getElementById("level_table").style.display = "none";
    };
    //update  details
    $scope.update = function (levelcontent) {
        if ($scope.levelcontent.amount != null && $scope.levelcontent.levelName != null) {
            document.getElementById("editor").style.display = "none";
            document.getElementById("level_table").style.display = "block";
            $http({
                method: 'POST',
                url: '/unstoppablemarketers/resources/rest/updateLevel',
                headers: {'Content-Type': 'application/json'},
                data: $scope.levelcontent
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
        } else {
            $scope.checkVal = true;
            $scope.msg = "Value Required";
        }
    };
    //update new  details
    $scope.updateNew = function (newlevelcontent) {
        //alert($scope.newlevelcontent.period);
        if ($scope.newlevelcontent.amount != null && $scope.newlevelcontent.levelName != null && $scope.newlevelcontent.period != null) {
            document.getElementById("added").style.display = "none";
            document.getElementById("level_table").style.display = "block";
            $scope.visitedLevelName = false;
            $scope.visitedAmount = false;
            $http({
                method: 'POST',
                url: '/unstoppablemarketers/resources/rest/updateNewLevel',
                headers: {'Content-Type': 'application/json'},
                data: $scope.newlevelcontent
            }).success(function (data) {
                if (data.status.status == 200) {
                    $scope.userstatus = data.status;
                    $scope.checkVal = true;
                    $scope.msg = "Saved successfully";
                    $scope.loadLevel();
                }
                else if (data.status.status == 204) {
                    $scope.checkVal = true;
                    $scope.msg = "Value Required";
                }
                else {
                    //$scope.logOut();
                }
            });
        } else {
            $scope.checkVal = true;
            $scope.msg = "Value Required";
        }

    };
    //back button
    $scope.back = function () {
        document.getElementById("editor").style.display = "none";
        document.getElementById("added").style.display = "none";
        document.getElementById("level_table").style.display = "block";
    };
    //delete level
    $scope.remove = function (level) {
        var key = confirm("Do you want to remove it ?");
        if (key == true) {
            $scope.checkVal = false;
            $scope.deletelevelcontent = level;
            if ($scope.deletelevelcontent != null) {
                $http({
                    method: 'POST',
                    url: '/unstoppablemarketers/resources/rest/deleteLevel',
                    headers: {'Content-Type': 'application/json'},
                    data: $scope.deletelevelcontent
                }).success(function (data) {
                    if (data.status.status == 200) {
                        $scope.userstatus = data.status;
                        $scope.checkVal = true;
                        $scope.loadLevel();
                        $scope.msg = "Delete successfully";
                    }
                    else if (data.status.status == 206) {
                        $scope.checkVal = true;
                        $scope.msg = "No record";
                    }
                    else {
                        //$scope.logOut();
                    }
                });
            }
        }
    };
});