app.controller('srchCtrl', function ($scope, $http, $window, $sce, $cookies, $cookieStore) {
    var unstoppableLoginURL = "http://localhost:8080/unstoppablemarketers/login.html";
    $scope.searchResultInfo = [];
    $scope.searchResultLength = 0;

    //get session cookie
    var cookie = '';
    var vals = document.cookie.split(';');
    for (i = 0; i < vals.length; i++) {
        var val = vals[i].split('=');
        if (val[0].trim() == "userToken") {
            cookie = val[val.length - 1];
            $scope.cookieVal = (cookie != null && cookie != '') ? cookie : null;
        }
    }
    //logout function
    $scope.logOut = function () {
        //	document.cookie = 'userToken= ' +' '+' ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        $http({
            method: 'GET',
            url: '/umcast/resources/rest/userLogOut?token=' + cookie,
            data: $scope.logOutUser
        }).success(function (data) {
            if (data.status.status == 200) {
                $scope.checkToken = false;
                document.cookie = 'userToken= ' + ' ' + ' ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
                $window.location.href = unstoppableLoginURL;
            }
        });
    };
    //Get login users profile details
    $scope.userProfile = function () {
        $http({
            method: 'GET',
            url: '/umcast/resources/rest/getUserProfile?token=' + cookie,
            data: $scope.profile
        }).success(function (data) {
            $scope.profile = data.user;
            if (data.status.status == 200) {
                if ($scope.profile.subscribe_On != null) {
                    $scope.checkSubscribe = true;
                }
                $scope.affiliatelink = $scope.profile.referralCode;
            }
            else {
                $scope.logOut();
            }
        });
    };
    if (cookie != null && cookie != '') {
        $scope.checkToken = true;
        $scope.userProfile();
    }
    else {
        $scope.checkToken = false;
        $scope.guestUserImage = "/umcast/images/default-avatar.png";
    }

    //redirect to videos page
    $scope.redirectToVideo = function (videolst) {
        $window.location.href = "channelcast.html?ved=" + videolst.videoId;
    };
    //for search videos by name
    $scope.searchFunc = function (srch) {
        if (srch != null && srch != '' && srch != 'undefined') {
            $window.location.href = '/umcast/umsearch.html?srch=' + srch;
        }
    };
    $scope.goSearch = function () {

        if ($scope.val != null) {
            var searchRes = "";
            var searchVal = $scope.val;
            var searchValArr = searchVal.split('%20');
            for (i = 0; i < searchValArr.length; i++) {
                searchRes = searchRes + searchValArr[i] + " ";
            }
            $scope.searchVideos = searchRes;
            $http({
                method: 'GET',
                url: '/umcast/resources/rest/searchItems?value=' + $scope.val,
                data: $scope.resultItems
            }).success(function (data) {
                $scope.searchResult = data.videos;
                if (data.status.status === 200) {
                    $scope.searchResultInfo = $scope.searchResult;
                    if ($scope.searchResultInfo instanceof Array) {
                        $scope.searchResultInfo = $scope.searchResultInfo;
                    } else {
                        $scope.searchResultInfo = [$scope.searchResultInfo];
                    }
                    if ($scope.searchResultInfo !== null && $scope.searchResultInfo != "" && $scope.searchResultInfo.length > 0) {
                        $scope.searchResultLength = $scope.searchResultInfo.length;
                    }
                    else {
                        $scope.searchMsg = "No records found";

                    }

                }
                else if (data.status.status == 206) {
                    $scope.searchMsg = "No records found";
                }
                else {
                }
            });
        }
    };
    $scope.uploadCheck = function () {
        if (cookie != null && cookie != '') {
            $window.location.href = "/video/videoupload.html";
        }
        else {
            $window.location.href = unstoppableLoginURL;
        }
    };
    var newURL = window.location.search;
    if (newURL != "") {
        var aarr = newURL.split('=');
        var id = aarr[aarr.length - 1];
        var key = aarr[aarr.length - 2];
        if (key == "?srch" && id != "") {
            $scope.val = id;
            $scope.goSearch();
        }
    }

});