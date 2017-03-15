videoModule.controller('videoEditController', function ($scope, $http, $cookies, $window, $sce) {
    var unstoppableLoginURL = "http://localhost:8080/unstoppablemarketers/login.html";
    $scope.userVideos = [];
    $scope.videoLength;
    $scope.checkToken = false;
    //$scope.tagValues=[];
    //get session cookie
    var cookie = $cookies.sessionToken;


//  logout function
    $scope.logOut = function () {
        /*document.cookie = 'userToken= ' +' '+' ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
         $scope.checkToken=false;
         $window.location.href = "/umcast/login.html";*/
        $http({
            method: 'GET',
            url: '/umcast/resources/rest/userLogOut?token=' + cookie,
            data: $scope.logOutUser
        }).success(function (data) {
            if (data.status.status === 200) {
                $scope.checkToken = false;
                document.cookie = 'userToken= ' + ' ' + ' ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
                $window.location.href = unstoppableLoginURL;
            }
        });
    };

    if (cookie == null || cookie == '') {
        $scope.logOut();
    }

    $http({
        method: 'GET',
        url: '/umcast/resources/rest/getCategories',
        data: $scope.allCategories
    }).success(function (data) {
        $scope.categoryItems = data.categories;
    });
//  Get Videos list by login user	
    $scope.getVideo = function () {
        $http({
            method: 'GET',
            url: '/umcast/resources/rest/getMyVideos?token=' + cookie,
            data: $scope.usersVideoList
        }).success(function (data) {
            $scope.usersVideoList = data;
            if ($scope.usersVideoList.status.status == 200) {
                $scope.userVideos = $scope.usersVideoList.videos;
                if ($scope.userVideos instanceof Array) {
                    $scope.userVideos = $scope.userVideos;
                } else {
                    $scope.userVideos = [$scope.userVideos];
                }
                if ($scope.userVideos != null && $scope.userVideos != "" && $scope.userVideos.length > 0) {
                    $scope.videoLength = $scope.userVideos.length;
                }
                else {
                    $scope.checkVideos = true;
                    $scope.msg = "No records found";
                }
            }
            else if (data.status.status == 206) {
                $scope.checkVideos = true;
                $scope.msg = "No records found";
            }
            else {
                //$scope.logOut();
            }
        });
    };
    //Get login users profile details
    $http({
        method: 'GET',
        url: '/umcast/resources/rest/getUserProfile?token=' + cookie,
        data: $scope.profile
    }).success(function (data) {
        $scope.profile = data.user;
        if (data.status.status === 200) {
            //	$scope.affiliatelink=$scope.profile.referralCode;
            $scope.getVideo();
        }
        else {
            $scope.logOut();
        }
    });
    //Edit user Videos by login user
    $scope.editVideo = function (videos) {
        $window.location.href = "/umcast/video/edit_video.html?Vedt=" + videos.videoId + "&token=" + cookie;
    };
    var value = null;
    var strArray = Array();
    $scope.tagValues = [];
    $scope.getEditVideoDetail = function () {
        //Get users profile details edited by admin
        $http({
            method: 'GET',
            url: '/umcast/resources/rest/getVideoDetByUser?vid=' + $scope.videoEditId + '&token=' + $scope.videoOwnerId,
            data: $scope.videoDetails
        }).success(function (data) {
            $scope.editedVideo = data.video;
            if (data.status.status === 200) {
                value = $scope.editedVideo.videoTag;
                var val = value.split(",");
                var len = val.length;
                for (var i = 0; i < len; i++) {
                    strArray[i] = (val[i]);
                }
                $scope.tagValues = strArray;
            }
            else {
                //$scope.logOut();
            }
        });
    };
    $scope.update = function () {
        var tagsDetails = $scope.videoForm.tagsDetails.$viewValue;
        $scope.editedVideo.tags = tagsDetails;
        $http({
            method: 'POST',
            url: '/umcast/resources/rest/updateVideoByUser?vid=' + $scope.videoEditId + '&token=' + $scope.videoOwnerId,
            headers: {'Content-Type': 'application/json'},
            data: $scope.editedVideo
        }).success(function (data) {
            if (data.status.status === 200) {
                $scope.checkStatus = true;
                $scope.checkErrorStatus = false;
                $scope.msg = "Saved successfully";
            }
            else if (data.status.status === 204) {
                $scope.checkStatus = false;
                $scope.checkErrorStatus = true;
                $scope.msg = "Value Required";
            }
            else {
                $scope.checkStatus = false;
                $scope.checkErrorStatus = true;
                $scope.msg = "Internal Error";
            }
        });
    };
    $scope.tags = [];
    var strArray1 = Array();
    var tagVal = null;
    $http({
        method: 'GET',
        url: '/umcast/resources/rest/getAllTags',
        data: $scope.tagsList
    }).success(function (data) {
        tagVal = data.tags;
        var len = tagVal.length;
        for (var i = 0; i < len; i++) {
            strArray1[i] = (tagVal[i].tagName);
        }
        $scope.tagNames = strArray1;

    });
    $scope.loadTags = function (query) {
        return ($scope.tagNames + '?query=' + query);
    };

    // delete user
    $scope.removeVideo = function (videos) {
        var key = confirm("Do you want to remove it ?");
        if (key === true) {
            $scope.checkVal = false;
            $scope.deleteVideo = videos;
            if ($scope.deleteVideo !== null) {
                $http({
                    method: 'POST',
                    url: '/umcast/resources/rest/deleteVideo',
                    headers: {'Content-Type': 'application/json'},
                    data: $scope.deleteVideo
                }).success(function (data) {
                    if (data.status.status === 200) {
                        $scope.checkStatus = true;
                        //$scope.getVideo();
                        $scope.msg = "Delete successfully";
                        $window.location.reload();
                    }
                    else if (data.status.status === 206) {
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

    //chack menu active
    $scope.isActive = function (viewLocation) {
        var patharr = window.location.pathname.split("/");
        var active = (viewLocation === patharr[patharr.length - 1]);
        return active;
    };
    var newURL = window.location.search;
    if (newURL !== "") {
        var aarr = newURL.split('&');
        if (aarr.length > 1) {
            var id = aarr[aarr.length - 1];
            var key = aarr[aarr.length - 2];
            var arr = key.split('=');   //for getting edited user id
            var uid = arr[arr.length - 1];
            var uidKey = arr[arr.length - 2];

            var adarr = id.split('=');
            var adid = adarr[adarr.length - 1];
            var adidKey = adarr[adarr.length - 2];
            if (uidKey === "?Vedt" && adidKey === "token") {
                if (uid !== null && adid !== "") {
                    $scope.videoEditId = uid;
                    $scope.videoOwnerId = adid;
                    $scope.getEditVideoDetail();
                }

            }
        }
    }
    if (cookie !== null && cookie !== '') {
        $scope.checkToken = true;
        //$scope.userProfile();
        // Get Active Menu
        /*	$http({
         method: 'GET',
         url: '/umcast/resources/rest/getActiveMenu?token='+cookie,
         data:  $scope.menuActive
         }). success(function(data) {
         if(data.status.status == 200)
         {
         $scope.menuActive = data.menu;
         }
         else
         {
         $scope.logOut();
         }
         });*/
    }
    else {
        $scope.checkToken = false;
    }
//  redirect to videos page
    $scope.redirectToVideo = function (videolst) {
        $window.location.href = "/umcast/user/umcastchannel.html?ved=" + videolst.videoId;
    };
});