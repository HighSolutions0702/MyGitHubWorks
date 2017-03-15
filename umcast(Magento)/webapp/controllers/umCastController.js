videoSettingsModule.controller('umcastCntrl', [ '$scope', '$upload', '$http', '$cookies', '$window', '$timeout', '$sce', function ($scope, $upload, $http, $cookies, $window, $timeout, $sce) {
    var unstoppableLoginURL = "http://localhost:8080/unstoppablemarketers/login.html";
    $scope.cmtMsgCheck = false;
    $scope.checkVal = false;

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
//	logout function
    $scope.logOut = function () {
        /*document.cookie = 'userToken= ' +' '+' ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
         $scope.checkToken=false;
         $window.location.href = "/umcast/login.html";*/
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
//	Get login users profile details
    $scope.getUserProfile = function () {
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
                $scope.profileImageFunc();
                $scope.getUsersVideo();
                $scope.getUsersVideosList();
            }
            else {
                $scope.logOut();
            }
        });
    };
    if (cookie == null || cookie == '') {
        $scope.logOut();
    }
    else {
        $scope.getUserProfile();
    }
    $scope.ownerVideosList = [];
    $scope.recordLength = 0;
    $scope.commentsRecordLength = 0;
    $scope.checkCmtsList = false;
    $scope.checkUser = false;

    // Get Active Menu
    $http({
        method: 'GET',
        url: '/umcast/resources/rest/getActiveMenu?token=' + cookie,
        data: $scope.menuActive
    }).success(function (data) {
        if (data.status.status == 200) {
            $scope.menuActive = data.menu;
        }
        else {
            //$scope.logOut();
        }
    });
    function loadjwplayer(videoUrl, posterUrl) {
        jwplayer('mediaplayer').setup({
            file: videoUrl,
            width: "575",
            height: "390",
            image: posterUrl
        });
    }

    //comments list against users videos
    $scope.userCommentsList = function () {
        $scope.commentsListInfo = [];
        $http({
            method: 'GET',
            url: '/umcast/resources/rest/getUsersComments?videoId=' + $scope.userVideo.videoId,
            data: $scope.usersCommentsList
        }).success(function (data) {
            $scope.usersCommentsList = data.comments;
            if (data.status.status == 200) {
                $scope.commentsListInfo = $scope.usersCommentsList;
                if ($scope.commentsListInfo instanceof Array) {
                    $scope.commentsListInfo = $scope.commentsListInfo;
                } else {
                    $scope.commentsListInfo = [$scope.commentsListInfo];
                }
                if ($scope.commentsListInfo != null && $scope.commentsListInfo != "" && $scope.commentsListInfo.length > 0) {
                    $scope.commentsRecordLength = $scope.commentsListInfo.length;
                }
                else {
                    $scope.checkCmtsList = true;
                }
            }
            else if (data.status.status == 206) {
                $scope.commentsRecordLength = 0;
            }
            else {
                $scope.checkCmtsList = true;
            }
        });
    };
    //add comments against selected video
    $scope.userCommentsFunc = function () {
        commentContent = $scope.form.comments.$viewValue;
        if (commentContent != null && commentContent != '') {
            $http({
                method: 'POST',
                url: '/umcast/resources/rest/userComments?videoId=' + $scope.userVideo.videoId + '&token=' + cookie,
                headers: {'Content-Type': 'application/json'},
                data: $scope.userVideoCmt
            }).success(function (data) {
                $scope.relatedComment = data.comment;
                if (data.status.status == 200) {
                    $scope.userVideoCmt.comments = '';
                    $scope.userCommentsList();
                }
            });
        }
        else {
            $scope.cmtMsgCheck = true;
            $scope.cmtMsg = "Comments Required";
        }
    };
    $scope.getUsersVideo = function () {
        $http({
            method: 'GET',
            url: '/umcast/resources/rest/getLoginUserVideo?token=' + cookie,
            data: $scope.userVideo
        }).success(function (data) {
            $scope.userVideo = data.video;
            if (data.status.status == 200) {
                $scope.checkUserVideo = false;
                $scope.userCommentsList();
                $scope.description = $scope.userVideo.videoDescription;
                document.getElementById("desc_content").innerHTML = $scope.description;
                if ($scope.userVideo.owner.umcast_name != null && $scope.userVideo.owner.umcast_name != '') {
                    $scope.videoShareLink = "http://umcast.com/umcast/" + $scope.userVideo.owner.umcast_name + "/" + $scope.userVideo.videoId;
                }
                else {
                    $scope.videoShareLink = "http://umcast.com/umcast/channelcast.html";
                }
                $scope.poster = $scope.userVideo.posterUrl;
                $scope.videoData = $sce.trustAsResourceUrl($scope.userVideo.videoUrl);
                var col = ($scope.userVideo.videoUrl).split('/');
                var filename = col[col.length - 1];
                var catfolder = col[col.length - 2];
                var userId = col[col.length - 3];
                var filetype = filename.split('.');
                $scope.userVideo.videoUrl = "rtmp://s2wybb8njtay67.cloudfront.net/cfx/st/" + filetype[filetype.length - 1] + ":" + userId + "/" + catfolder + "/" + filename;
                loadjwplayer($scope.userVideo.videoUrl, $scope.poster);
            }
            else if (data.status.status == 206) {
                $scope.checkUserVideo = true;
                $scope.videoMsg = "No Records found";
            }
            else {
                $scope.checkUserVideo = true;
                $scope.videoMsg = "No Records found";
            }
        });
    };


//	dynamic videos by id
    $scope.getVideosById = function () {
        $http({
            method: 'GET',
            url: '../resources/rest/getVideosInfo?videoId=' + $scope.videoId,
            data: $scope.userVideo
        }).success(function (data) {
            $scope.userVideo = data.videos;
            if (data.status.status == 200) {
                $scope.getUserProfile();
                $scope.userCommentsList();
                $scope.checkUserVideo = false;
                $scope.checkUser = true;
                $scope.description = $scope.userVideo.videoDescription;
                document.getElementById("desc_content").innerHTML = $scope.description;//setting description
                $scope.poster1 = $scope.userVideo.posterUrl;
                $scope.videoData = $sce.trustAsResourceUrl($scope.userVideo.videoUrl);
                var col = ($scope.userVideo.videoUrl).split('/');
                var filename = col[col.length - 1];
                var catfolder = col[col.length - 2];
                var userId = col[col.length - 3];
                var filetype = filename.split('.');
                $scope.userVideo.videoUrl = "rtmp://s2wybb8njtay67.cloudfront.net/cfx/st/" + filetype[filetype.length - 1] + ":" + userId + "/" + catfolder + "/" + filename;
                loadjwplayer($scope.userVideo.videoUrl, $scope.poster1);
            }
            else if (data.status.status == 206) {
                $scope.checkUserVideo = true;
                $scope.Msg = "No Records found";

            }
            else {
                //$scope.logOut();
            }
        });
    };
    /*//	Get Active Menu
     $http({
     method: 'GET',
     url: '/umcast/resources/rest/getActiveMenu?token='+cookie,
     data:  $scope.menuActive
     }). success(function(data) {
     $scope.menuActive = data.menu;
     if(data.status.status == 200)
     {
     $scope.affiliatelink=$scope.menuActive.referralCode;
     }
     else
     {
     //$scope.logOut();
     }
     });*/
//	list of videos based on Login user
    $scope.getUsersVideosList = function () {
        $http({
            method: 'GET',
            url: '../resources/rest/getVideosByUser?token=' + cookie,
            data: $scope.videoDeatilsList
        }).success(function (data) {
            $scope.videoDeatilsList = data.videos;
            if (data.status.status == 200) {
                $scope.ownerVideosList = $scope.videoDeatilsList;
                if ($scope.ownerVideosList instanceof Array) {
                    $scope.ownerVideosList = $scope.ownerVideosList;
                } else {
                    $scope.ownerVideosList = [$scope.ownerVideosList];
                }
                if ($scope.ownerVideosList != null && $scope.ownerVideosList != "" && $scope.ownerVideosList.length > 0) {
                    $scope.recordLength = $scope.ownerVideosList.length;
                }
                else {
                    $scope.checkOwnerVideos = true;
                    $scope.msg = "No records found";
                }
            }
            else {
                $scope.checkUserVideo = true;
            }
        });
    };

//	get Profile image
    $scope.profileImageFunc = function () {
        $http({
            method: 'GET',
            url: '/umcast/resources/rest/getProfileImageForSession?token=' + cookie,
            data: $scope.profImage
        }).success(function (data) {
            $scope.userProfileImage = data.userprofile;
            if (data.status.status == 200) {
                $scope.profileImageUrl = $scope.userProfileImage.profileImage;
                $scope.coverImageUrl = $scope.userProfileImage.coverImage;
            }
            else {
                $scope.profileImageUrl = $scope.userProfileImage.profileImage;
                $scope.coverImageUrl = $scope.userProfileImage.coverImage;
            }
        });
    };

    $scope.changeUmName = function () {

        $http({
            method: 'POST',
            url: '/umcast/resources/rest/updateUMCastName?token=' + cookie,
            headers: {'Content-Type': 'application/json'},
            data: $scope.profile
        }).success(function (data) {
            $scope.userstatus = data.status;
            if ($scope.userstatus.status == 200) {
                $("#link_div").hide();
                $scope.checkVal = true;
                $scope.msg = "Successfuly Changed";
            }
            else if ($scope.userstatus.status == 409) {
                $scope.checkVal = true;
                $scope.msg = "UM Cast name already exist";
            }
            else {

            }
        });
    };
    $("#text_hide").focus(function () {
        $("#link_div").show();
    });
    $scope.cancelFunc = function () {
        $("#link_div").hide();
    };
//	for uploading profile image

    $scope.fileReaderSupported = window.FileReader != null;
    $scope.uploadRightAway = true;
    $scope.uploadCoverRightAway = true;
    $scope.changeAngularVersion = function () {
        window.location.hash = $scope.angularVersion;
        window.location.reload(true);
    };
    /*$scope.hasUploader = function(index) {
     return $scope.upload[index] != null;
     };
     $scope.abort = function(index) {
     $scope.upload[index].abort();
     $scope.upload[index] = null;
     };*/
    $scope.angularVersion = window.location.hash.length > 1 ? window.location.hash.substring(1) : '1.2.0';


    $scope.onUploadImage = function ($files) {
        $scope.selectedFiles = [];
        $scope.progress = [];
        if ($scope.upload && $scope.upload.length > 0) {
            for (var i = 0; i < $scope.upload.length; i++) {
                if ($scope.upload[i] != null) {
                    $scope.upload[i].abort();
                }
            }
        }
        $scope.upload = [];
        $scope.uploadResult = [];
        $scope.selectedFiles = $files;
        $scope.dataUrls = [];
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            if (!$scope.isImage($file.name)) {
                $scope.checkValidImage = true;
            }
            else {
                $scope.checkValidImage = false;

                if (window.FileReader && $file.type.indexOf('image') > -1) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL($files[i]);
                    var loadFile = function (fileReader, index) {
                        fileReader.onload = function (e) {
                            $timeout(function () {
                                $scope.dataUrls[index] = e.target.result;
                            });
                        };
                    }(fileReader, i);
                }
                $scope.progress[i] = -1;
                if ($scope.uploadRightAway) {
                    $scope.start(i);
                    $scope.checkVal = false;
                    $scope.loading = true;
                }
            }
        }
    };
    $scope.isImage = function (filename) {
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'png':
            case 'jpeg':
            case 'jpg':
            case 'gif':
                // etc
                return true;
        }
        return false;
    };
    function getExtension(filename) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    }

    $scope.start = function (index) {
        $scope.progress[index] = 0;
        $scope.errorMsg = null;
        $scope.upload[index] = $upload.upload({
            url: '/umcast/imageUpload?token=' + cookie,
            method: $scope.httpMethod,
            headers: {'my-header': 'my-header-value'},

            file: $scope.selectedFiles[index],
            fileFormDataName: 'myFile'
        }).then(function (response) {
            $scope.uploadResult.push(response.data);
            $scope.checkVal = true;
            $scope.loading = false;
            $scope.msg = "Successfully Changed";
            if (response) {
                $scope.profileImageFunc();
            }
            ;

        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        }).xhr(function (xhr) {
            xhr.upload.addEventListener('abort', function () {
                console.log('abort complete')
            }, false);
        });
    };

    $scope.onUploadCoverImage = function ($files) {
        $scope.selectedCoverFiles = [];
        $scope.progress = [];
        if ($scope.upload && $scope.upload.length > 0) {
            for (var i = 0; i < $scope.upload.length; i++) {
                if ($scope.upload[i] != null) {
                    $scope.upload[i].abort();
                }
            }
        }
        $scope.upload = [];
        $scope.uploadCoverResult = [];
        $scope.selectedCoverFiles = $files;
        $scope.dataUrls = [];
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            if (!$scope.isImage($file.name)) {
                $scope.checkValidImage = true;
            }
            else {
                $scope.checkValidImage = false;
                if (window.FileReader && $file.type.indexOf('image') > -1) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL($files[i]);
                    var loadFile = function (fileReader, index) {
                        fileReader.onload = function (e) {
                            $timeout(function () {
                                $scope.dataUrls[index] = e.target.result;
                            });
                        };
                    }(fileReader, i);
                }
                $scope.progress[i] = -1;
                if ($scope.uploadCoverRightAway) {
                    $scope.startCover(i);
                    $scope.checkVal = false;
                    $scope.loading = true;
                }
            }
        }

    };

    $scope.startCover = function (index) {
        $scope.progress[index] = 0;
        $scope.errorMsg = null;
        $scope.upload[index] = $upload.upload({
            url: '/umcast/imageUpload?token=' + cookie,
            method: $scope.httpMethod,
            headers: {'my-header': 'my-header-value'},

            file: $scope.selectedCoverFiles[index],
            fileFormDataName: 'myFile1'
        }).then(function (response) {
            $scope.checkVal = true;
            $scope.loading = false;
            $scope.msg = "Successfully Changed";
            $scope.uploadCoverResult.push(response.data);
            if (response) {
                $scope.profileImageFunc();
            }
            ;

        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        }).xhr(function (xhr) {
            xhr.upload.addEventListener('abort', function () {
                console.log('abort complete')
            }, false);
        });
    };

//	highlight active menu
    $scope.isActive = function (viewLocation) {
        var patharr = window.location.pathname.split("/");
        var active = (viewLocation === patharr[patharr.length - 1]);
        return active;
    };


//	list of videos based on video id and owner
    $scope.getVideosInfoList = function () {
        $http({
            method: 'GET',
            url: 'resources/rest/getVideosDetails?videoId=' + $scope.videoId,
            data: $scope.videoDeatilsList
        }).success(function (data) {
            $scope.videoDeatilsList = data.videos;
            if (data.status.status == 200) {
                $scope.ownerVideosList = $scope.videoDeatilsList;
                if ($scope.ownerVideosList instanceof Array) {
                    $scope.ownerVideosList = $scope.ownerVideosList;
                } else {
                    $scope.ownerVideosList = [$scope.ownerVideosList];
                }
                if ($scope.ownerVideosList != null && $scope.ownerVideosList != "" && $scope.ownerVideosList.length > 0) {
                    $scope.recordLength = $scope.ownerVideosList.length;
                }
                else {
                    $scope.checkOwnerVideos = true;
                    $scope.msg = "No records found";
                }
            }
        });
    };

//	redirect to videos page
    $scope.redirectToVideo = function (videolst) {
        $http({
            method: 'GET',
            url: '../resources/rest/getVideosInfo?videoId=' + videolst.videoId,
            data: $scope.userVideo
        }).success(function (data) {
            $scope.userVideo = data.videos;
            if (data.status.status == 200) {
                $scope.userCommentsList();
                $scope.description = $scope.userVideo.videoDescription;
                document.getElementById("desc_content").innerHTML = $scope.description;
                $scope.poster2 = $scope.userVideo.posterUrl;
                $scope.videoData = $sce.trustAsResourceUrl($scope.userVideo.videoUrl);
                var col = ($scope.userVideo.videoUrl).split('/');
                var filename = col[col.length - 1];
                var catfolder = col[col.length - 2];
                var userId = col[col.length - 3];
                var filetype = filename.split('.');
                $scope.userVideo.videoUrl = "rtmp://s2wybb8njtay67.cloudfront.net/cfx/st/" + filetype[filetype.length - 1] + ":" + userId + "/" + catfolder + "/" + filename;
                loadjwplayer($scope.userVideo.videoUrl, $scope.poster2);
            }
            else {
                alert("error");
                $scope.checkUserVideo = true;
                $scope.Msg = "No Records found";
            }
        });

    };
    //get videos details using dynamic video id
    $scope.getRecentVideoByCastName = function () {
        $http({
            method: 'GET',
            url: 'resources/rest/getRecentVideoByCastName?castName=' + $scope.profile.umcast_name,
            data: $scope.recentVideo
        }).success(function (data) {
            $scope.recentVideo = data.video;
            if (data.status.status == 200) {
                $scope.videoId = $scope.recentVideo.videoId;
                $scope.getVideosById();
                $scope.userCommentsList();
            }
        });
    };

    //setYoutube token
    $scope.setYoutube = function () {
        var tokenvalue = "you" + Math.random();
        $scope.profile.token_youtube = tokenvalue;
        $http({
            method: 'POST',
            url: '/umcast/resources/rest/updateUser?token=' + cookie,
            headers: {'Content-Type': 'application/json'},
            data: $scope.profile
        }).success(function (data) {
            $scope.userstatus = data.status;
            if ($scope.userstatus.status == 200) {
                alert("Your Token Saved successfully");
                $scope.checkVal = true;
                $scope.msg = "Saved successfully";
            }
            else if ($scope.userstatus.status == 204) {
                $scope.checkVal = true;
                $scope.msg = "Value Required";
            }
            else {
                //$scope.logOut();
            }
        });
    };
    //setVimeo() token
    $scope.setVimeo = function () {
        var tokenvalue = "vie" + Math.random();
        $scope.profile.token_vimeo = tokenvalue;
        $http({
            method: 'POST',
            url: '/umcast/resources/rest/updateUser?token=' + cookie,
            headers: {'Content-Type': 'application/json'},
            data: $scope.profile
        }).success(function (data) {
            $scope.userstatus = data.status;
            if ($scope.userstatus.status == 200) {
                $scope.checkVal = true;
                $scope.msg = "Saved successfully";
                alert("Your Token Saved successfully");
            }
            else if ($scope.userstatus.status == 204) {
                $scope.checkVal = true;
                $scope.msg = "Value Required";
            }
            else {
                //$scope.logOut();
            }
        });
    };
    //setDaily() token
    $scope.setDaily = function () {
        var tokenvalue = "dai" + Math.random();
        $scope.profile.token_daily = tokenvalue;
        $http({
            method: 'POST',
            url: '/umcast/resources/rest/updateUser?token=' + cookie,
            headers: {'Content-Type': 'application/json'},
            data: $scope.profile
        }).success(function (data) {
            $scope.userstatus = data.status;
            if ($scope.userstatus.status == 200) {
                $scope.checkVal = true;
                $scope.msg = "Saved successfully";
                alert("Your Token Saved successfully");
            }
            else if ($scope.userstatus.status == 204) {
                $scope.checkVal = true;
                $scope.msg = "Value Required";
            }
            else {
                //$scope.logOut();
            }
        });
    };
    //setFacebook() token
    $scope.setFacebook = function () {
        var tokenvalue = "fac" + Math.random();
        $scope.profile.token_facebook = tokenvalue;
        $http({
            method: 'POST',
            url: '/umcast/resources/rest/updateUser?token=' + cookie,
            headers: {'Content-Type': 'application/json'},
            data: $scope.profile
        }).success(function (data) {
            $scope.userstatus = data.status;
            if ($scope.userstatus.status == 200) {
                $scope.checkVal = true;
                $scope.msg = "Saved successfully";
                alert("Your Token Saved successfully");
            }
            else if ($scope.userstatus.status == 204) {
                $scope.checkVal = true;
                $scope.msg = "Value Required";
            }
            else {
                //$scope.logOut();
            }
        });
    };
    //setTwitter() token
    $scope.setTwitter = function () {
        var tokenvalue = "twit" + Math.random();
        $scope.profile.token_twitter = tokenvalue;
        $http({
            method: 'POST',
            url: '/umcast/resources/rest/updateUser?token=' + cookie,
            headers: {'Content-Type': 'application/json'},
            data: $scope.profile
        }).success(function (data) {
            $scope.userstatus = data.status;
            if ($scope.userstatus.status == 200) {
                $scope.checkVal = true;
                $scope.msg = "Saved successfully";
                alert("Your Token Saved successfully");
            }
            else if ($scope.userstatus.status == 204) {
                $scope.checkVal = true;
                $scope.msg = "Value Required";
            }
            else {
                //$scope.logOut();
            }
        });
    };
    //load edited Video id from url
    var newURL = window.location.search;
    if (newURL != "") {
        var aarr = newURL.split('=');
        var id = aarr[1];
        var key = aarr[0];
        if (key == "?ved" && id != "") {
            $scope.videoId = id;
            $scope.getVideosById();
            $scope.profileImageFunc();
            $scope.getUsersVideosList();
            $scope.getUsersVideo();
        }
    }
    //for search videos by name
    $scope.searchFunc = function (srch) {
        if (srch != null && srch != '' && srch != 'undefined') {
            $window.location.href = '/umcast/umsearch.html?srch=' + srch;
        }
    };
    //delete video comments
    $scope.deleteCmt = function (cmtsList) {
        var key = confirm("Do you want to remove it ?");
        if (key == true) {
            $scope.checkVal = false;
            $scope.deleteVideoCmt = cmtsList;
            if ($scope.deleteVideoCmt != null) {
                $http({
                    method: 'POST',
                    url: '/umcast/resources/rest/deleteVideoComments',
                    headers: {'Content-Type': 'application/json'},
                    data: $scope.deleteVideoCmt
                }).success(function (data) {
                    if (data.status.status == 200) {
                        $window.location.reload();
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
}]);

