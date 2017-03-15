app.controller('seemoreVidoeCtrl', function ($scope, $http, $window, $sce, $cookies, $cookieStore) {
    var unstoppableLoginURL = "http://localhost:8080/unstoppablemarketers/login.html";
    var newURL1 = window.location.search;
    if (newURL1 != "") {
        var aarrVal = newURL1.split('=');
        var id = aarrVal[aarrVal.length - 1];
        var key = aarrVal[aarrVal.length - 2];
        if (key == "?cookieToken" && id != "") {
            //$window.location.href = "channelcast.html?ved="+id;
            var a = new Date();
            a = new Date(a.getTime() + 1000 * 60 * 60 * 24);
            document.cookie = "userToken = " + id + "; expires= " + a.toUTCString() + "; path=/";
        }
    }
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
    $scope.cookie = cookie;
    //logout function
    $scope.logOut = function () {
        $http({
            method: 'GET',
            url: '/umcast/resources/rest/userLogOut?token=' + cookie,
            data: $scope.logOutUser
        }).success(function (data) {
            if (data.status.status == 200) {
                $scope.checkToken = false;
                document.cookie = 'userToken= ' + ' ' + ' ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
                var docURL = document.URL;
                var pageUrl = null;
                if (docURL != '') {
                    var aarr = docURL.split('?');
                    if (aarr.length > 2) {
                        pageUrl = aarr[aarr.length - 2];
                    }
                    else {
                        pageUrl = 'channel.html';
                    }
                }
                $window.location.href = pageUrl;
            }
        });

    };

    $scope.vidoesByCategory = function () {
        $http({
            method: 'GET',
            url: 'resources/rest/getVideosByVideoCategory?categId=' + $scope.selCatId,
            data: $scope.videoCategoryBaseLists
        }).success(function (data) {
            $scope.listOfVideos = data.videos;
            if (data.status.status == 200) {
                $scope.listOfVideosInfo = $scope.listOfVideos;
                if ($scope.listOfVideosInfo instanceof Array) {
                    $scope.listOfVideosInfo = $scope.listOfVideosInfo;
                } else {
                    $scope.listOfVideosInfo = [$scope.listOfVideosInfo];
                }
                if ($scope.listOfVideosInfo != null && $scope.listOfVideosInfo != "" && $scope.listOfVideosInfo.length > 0) {
                    $scope.listOfVideosLength = $scope.listOfVideosInfo.length;
                }
                else {
                    $scope.checkMovieVideos = true;
                }
                if ($scope.listOfVideos.length > 1) {
                    angular.forEach($scope.listOfVideos, function (val) {
                        $scope.selCategoryName = val.videoCategory.categoryName;
                    });
                }
                else {
                    $scope.selCategoryName = $scope.listOfVideos.videoCategory.categoryName;
                }
            }

        });
    };

    var catURL = window.location.search;
    if (catURL != "") {
        var aarr = catURL.split('=');
        var catId = aarr[aarr.length - 1];
        var catKey = aarr[aarr.length - 2];
        if (catKey == "?selCatVal" && catId != "") {
            $scope.selCatId = catId;
            $scope.vidoesByCategory();
        }
    }
    /*	$scope.seeMoreVideo=function(listObj){
     //alert(listObj.videoCategory.categoryId);
     $window.location.href = '/umcast/seemore_videos.html?selCatVal='+listObj;
     };*/

    //for search videos by name
    $scope.searchFunc = function (srch) {
        if (srch != null && srch != '' && srch != 'undefined') {
            $window.location.href = '/umcast/umsearch.html?srch=' + srch;
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
                else {
                    $scope.checkSubscribe = false;
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
        //$scope.profileImageCmtUser();
    }
    else {
        $scope.checkToken = false;
        //	$scope.guestUserImage="/umcast/images/default-avatar.png";
    }

});