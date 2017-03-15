channelModule.controller('channelCtrl', function ($scope, $http, $window, $sce, $cookies, $cookieStore) {
    var unstoppableLoginURL = "login.html";
    //$scope.checkToken=false;
    $scope.categoryItems=[];
    $scope.videoInformationList=[];

    $scope.cmtMsgCheck = false;
    $scope.commentsListInfo = [];
    $scope.animationListsInfo = [];
    $scope.gameListsInfo = [];
    $scope.sportsListsInfo = [];
    $scope.eduListsInfo = [];
    $scope.musicListsInfo = [];
    $scope.movieListsInfo = [];
    $scope.tvShowListsInfo = [];
    $scope.menu8ListsInfo = [];
    $scope.menu9ListsInfo = [];
    $scope.menu10ListsInfo = [];
    $scope.menu11ListsInfo = [];
    $scope.latestListsInfo = [];
    $scope.latestLists = [];

    $scope.animationRecordLength = 0;
    $scope.gameRecordLength = 0;
    $scope.sportsRecordLength = 0;
    $scope.musicRecordLength = 0;
    $scope.eduRecordLength = 0;
    $scope.movieRecordLength = 0;
    $scope.tvShowRecordLength = 0;
    $scope.commentsRecordLength = 0;
    $scope.menu8RecordLength = 0;
    $scope.menu9RecordLength = 0;
    $scope.menu10RecordLength = 0;
    $scope.menu11RecordLength = 0;
    $scope.listOfVideosLength = 0;
    $scope.castName = '';
    $scope.relatedVideosInfo = [];
    $scope.ownerVideosList = [];
    $scope.relatedRecordLength = 0;
    $scope.currentDate = new Date();

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
    /*	var newUrl=window.location.search;
     if(newUrl!=null){
     var aarr = newUrl.split('&');
     if(aarr.length>1)
     {
     var id = aarr[aarr.length - 1];
     var key = aarr[aarr.length - 2];
     var arr=key.split('=');   //for getting edited user id
     var vid=arr[arr.length-1];
     var vidKey=arr[arr.length-2];

     var cookiearr=id.split('=');
     var cookieId=cookiearr[cookiearr.length-1];
     var cookieKey=cookiearr[cookiearr.length-2];
     if(vidKey == "?ved" && cookieKey == "cookieToken"){
     if(vid !="" && cookieId!=""){
     $scope.cmtId=vid;
     var a = new Date();
     a = new Date(a.getTime()+1000*60*60*24);
     document.cookie ="userToken = "+ cookieId + "; expires= "+a.toUTCString()+"; path=/" ;
     }
     }
     }
     }*/
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
                     url: 'resources/rest/userLogOut?token=' + cookie,
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
    //TODO Profile image functions - has to be fixed. Found 2 calls with two different parameters why are they different??
    $scope.profileImageFunc = function () {
        $http({
            method: 'GET',
            url: 'resources/rest/getProfileImageByUserId?userId=' + $scope.videoInfo.owner.id,
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

    $scope.profileImageCmtUser = function () {
        $http({
            method: 'GET',
            url: 'resources/rest/getProfileImageForSession?token=' + cookie,
            data: $scope.cmtUserImage
        }).success(function (data) {
            $scope.cmtUserImageInfo = data.userprofile;
            if (data.status.status == 200) {
                $scope.cmtUserImageUrl = $scope.cmtUserImageInfo.profileImage;
            }
            else {
                $scope.cmtUserImageUrl = $scope.cmtUserImageInfo.profileImage;
            }
        });
    };
    //for loading animation videos
    $scope.videosByCategory=function(category) {
        $http({
            method: 'GET',
            url: 'resources/rest/getVideosByCategory?categId=' + category.categoryId,
            data: $scope.videoInformationList
        }).success(function (data) {
            $scope.videoInformationList = data.videos;
         /*   if (data.status.status == 200) {
                $scope.animationListsInfo = $scope.animationLists;
                if ($scope.animationListsInfo instanceof Array) {
                    $scope.animationListsInfo = $scope.animationListsInfo;
                } else {
                    $scope.animationListsInfo = [$scope.animationListsInfo];
                }
                if ($scope.animationListsInfo != null && $scope.animationListsInfo != "" && $scope.animationListsInfo.length > 0) {
                    $scope.animationRecordLength = $scope.animationListsInfo.length;
                }
                else {
                    $scope.checkAnimVideos = true;
                }
            }*/
        });
    };
    //for loading game videos
    $http({
        method: 'GET',
        url: 'resources/rest/getVideosByCategory?categId=' + 2,
        data: $scope.gamesLists
    }).success(function (data) {
        $scope.gamesLists = data.videos;
        if (data.status.status == 200) {
            $scope.gameListsInfo = $scope.gamesLists;
            if ($scope.gameListsInfo instanceof Array) {
                $scope.gameListsInfo = $scope.gameListsInfo;
            } else {
                $scope.gameListsInfo = [$scope.gameListsInfo];
            }
            if ($scope.gameListsInfo != null && $scope.gameListsInfo != "" && $scope.gameListsInfo.length > 0) {
                $scope.gameRecordLength = $scope.gameListsInfo.length;
            }
            else {
                $scope.checkGameVideos = true;
            }
        }
    });

    //For loading sports videos
    $http({
        method: 'GET',
        url: 'resources/rest/getVideosByCategory?categId=' + 3,
        data: $scope.sportsLists
    }).success(function (data) {
        $scope.sportsLists = data.videos;
        if (data.status.status == 200) {
            $scope.sportsListsInfo = $scope.sportsLists;
            if ($scope.sportsListsInfo instanceof Array) {
                $scope.sportsListsInfo = $scope.sportsListsInfo;
            } else {
                $scope.sportsListsInfo = [$scope.sportsListsInfo];
            }
            if ($scope.sportsListsInfo != null && $scope.sportsListsInfo != "" && $scope.sportsListsInfo.length > 0) {
                $scope.sportsRecordLength = $scope.sportsListsInfo.length;
            }
            else {
                $scope.checkSprtVideos = true;
            }
        }
    });
    //for loading music videos
    $http({
        method: 'GET',
        url: 'resources/rest/getVideosByCategory?categId=' + 4,
        data: $scope.musicLists
    }).success(function (data) {
        $scope.musicLists = data.videos;
        if (data.status.status == 200) {

            $scope.musicListsInfo = $scope.musicLists;
            if ($scope.musicListsInfo instanceof Array) {
                $scope.musicListsInfo = $scope.musicListsInfo;
            } else {
                $scope.musicListsInfo = [$scope.musicListsInfo];
            }
            if ($scope.musicListsInfo != null && $scope.musicListsInfo != "" && $scope.musicListsInfo.length > 0) {
                $scope.musicRecordLength = $scope.musicListsInfo.length;
            }
            else {
                $scope.checkMusicVideos = true;
            }
        }
    });
//	for loading education videos
    $http({
        method: 'GET',
        url: 'resources/rest/getVideosByCategory?categId=' + 5,
        data: $scope.eduLists
    }).success(function (data) {
        $scope.eduLists = data.videos;
        if (data.status.status == 200) {
            $scope.eduListsInfo = $scope.eduLists;
            if ($scope.eduListsInfo instanceof Array) {
                $scope.eduListsInfo = $scope.eduListsInfo;
            } else {
                $scope.eduListsInfo = [$scope.eduListsInfo];
            }
            if ($scope.eduListsInfo != null && $scope.eduListsInfo != "" && $scope.eduListsInfo.length > 0) {
                $scope.eduRecordLength = $scope.eduListsInfo.length;
            }
            else {
                $scope.checkEduVideos = true;
            }
        }
    });
//	for loading movies videos
    $http({
        method: 'GET',
        url: 'resources/rest/getVideosByCategory?categId=' + 6,
        data: $scope.movieLists
    }).success(function (data) {
        $scope.movieLists = data.videos;
        if (data.status.status == 200) {
            $scope.movieListsInfo = $scope.movieLists;
            if ($scope.movieListsInfo instanceof Array) {
                $scope.movieListsInfo = $scope.movieListsInfo;
            } else {
                $scope.movieListsInfo = [$scope.movieListsInfo];
            }
            if ($scope.movieListsInfo != null && $scope.movieListsInfo != "" && $scope.movieListsInfo.length > 0) {
                $scope.movieRecordLength = $scope.movieListsInfo.length;
            }
            else {
                $scope.checkMovieVideos = true;
            }
        }
    });
    //for loading Tv show videos
    $http({
        method: 'GET',
        url: 'resources/rest/getVideosByCategory?categId=' + 7,
        data: $scope.tvShowLists
    }).success(function (data) {
        $scope.tvShowLists = data.videos;
        if (data.status.status == 200) {

            $scope.tvShowListsInfo = $scope.tvShowLists;
            if ($scope.tvShowListsInfo instanceof Array) {
                $scope.tvShowListsInfo = $scope.tvShowListsInfo;
            } else {
                $scope.tvShowListsInfo = [$scope.tvShowListsInfo];
            }
            if ($scope.tvShowListsInfo != null && $scope.tvShowListsInfo != "" && $scope.tvShowListsInfo.length > 0) {
                $scope.tvShowRecordLength = $scope.tvShowListsInfo.length;
            }
            else {
                $scope.checkTvShowVideos = true;
            }
        }
    });
    //for loading Menu8 videos
    $http({
        method: 'GET',
        url: 'resources/rest/getVideosByCategory?categId=' + 8,
        data: $scope.menu8Lists
    }).success(function (data) {
        $scope.menu8Lists = data.videos;
        if (data.status.status == 200) {

            $scope.menu8ListsInfo = $scope.menu8Lists;
            if ($scope.menu8ListsInfo instanceof Array) {
                $scope.menu8ListsInfo = $scope.menu8ListsInfo;
            } else {
                $scope.menu8ListsInfo = [$scope.menu8ListsInfo];
            }
            if ($scope.menu8ListsInfo != null && $scope.menu8ListsInfo != "" && $scope.menu8ListsInfo.length > 0) {
                $scope.menu8RecordLength = $scope.menu8ListsInfo.length;
            }
            else {
                $scope.menu8Videos = true;
            }
        }
    });
    //for loading Menu9 videos
    $http({
        method: 'GET',
        url: 'resources/rest/getVideosByCategory?categId=' + 9,
        data: $scope.menu9Lists
    }).success(function (data) {
        $scope.menu9Lists = data.videos;
        if (data.status.status == 200) {

            $scope.menu9ListsInfo = $scope.menu9Lists;
            if ($scope.menu9ListsInfo instanceof Array) {
                $scope.menu9ListsInfo = $scope.menu9ListsInfo;
            } else {
                $scope.menu9ListsInfo = [$scope.menu9ListsInfo];
            }
            if ($scope.menu9ListsInfo != null && $scope.menu9ListsInfo != "" && $scope.menu9ListsInfo.length > 0) {
                $scope.menu9RecordLength = $scope.menu9ListsInfo.length;
            }
            else {
                $scope.menu9Videos = true;
            }
        }
    });
    //for loading Menu10 videos
    $http({
        method: 'GET',
        url: 'resources/rest/getVideosByCategory?categId=' + 10,
        data: $scope.menu10Lists
    }).success(function (data) {
        $scope.menu10Lists = data.videos;
        if (data.status.status == 200) {

            $scope.menu10ListsInfo = $scope.menu10Lists;
            if ($scope.menu10ListsInfo instanceof Array) {
                $scope.menu10ListsInfo = $scope.menu10ListsInfo;
            } else {
                $scope.menu10ListsInfo = [$scope.menu10ListsInfo];
            }
            if ($scope.menu10ListsInfo != null && $scope.menu10ListsInfo != "" && $scope.menu10ListsInfo.length > 0) {
                $scope.menu10RecordLength = $scope.menu10ListsInfo.length;
            }
            else {
                $scope.menu10Videos = true;
            }
        }
    });
    //for loading Menu8 videos
    $http({
        method: 'GET',
        url: 'resources/rest/getVideosByCategory?categId=' + 11,
        data: $scope.menu11Lists
    }).success(function (data) {
        $scope.menu11Lists = data.videos;
        if (data.status.status == 200) {

            $scope.menu11ListsInfo = $scope.menu11Lists;
            if ($scope.menu11ListsInfo instanceof Array) {
                $scope.menu11ListsInfo = $scope.menu11ListsInfo;
            } else {
                $scope.menu11ListsInfo = [$scope.menu11ListsInfo];
            }
            if ($scope.menu11ListsInfo != null && $scope.menu11ListsInfo != "" && $scope.menu11ListsInfo.length > 0) {
                $scope.menu11RecordLength = $scope.menu11ListsInfo.length;
            }
            else {
                $scope.menu11Videos = true;
            }
        }
    });

    //get videos details using dynamic video id
    $scope.getVideosById = function () {
        $http({
            method: 'GET',
            url: '/resources/rest/getVideosInfo?videoId=' + $scope.videoId,
            data: $scope.videoInfo
        }).success(function (data) {
            $scope.videoInfo = data.video;
            if (data.status.status == 200) {

                $scope.description = $scope.videoInfo.videoDescription;
                document.getElementById("desc_content").innerHTML = $scope.description;
                $scope.profileImageFunc();
                $scope.poster = $scope.videoInfo.posterUrl;
                $scope.videoData = $sce.trustAsResourceUrl($scope.videoInfo.videoUrl);
                if ($scope.videoInfo.owner.umcast_name != null && $scope.videoInfo.owner.umcast_name != '') {
                    $scope.videoShareLink = "http://umcast.com/umcast/" + $scope.videoInfo.owner.umcast_name + "/" + $scope.videoInfo.videoId;
                }
                else {
                    $scope.videoShareLink = "http://umcast.com/umcast/channelcast.html";
                }
                var col = ($scope.videoInfo.videoUrl).split('/');
                var filename = col[col.length - 1];
                var catfolder = col[col.length - 2];
                var userId = col[col.length - 3];
                var filetypearr = filename.split('.');
                var filetype = filetypearr[filetypearr.length - 1];
                filetype = filetype.toLowerCase();
                $scope.videoInfo.videoUrl = "rtmp://s2wybb8njtay67.cloudfront.net/cfx/st/" + filetype + ":" + userId + "/" + catfolder + "/" + filename;

                loadjwplayer($scope.videoInfo.videoUrl, $scope.poster);
            }
        });
    };

    function loadjwplayer(videoUrl, posterUrl) {
        jwplayer('mediaplayer').setup({
            file: videoUrl,
            width: "575",
            height: "390",
            image: posterUrl,
            logo: {
                file: '/images/favicon.png'
            }
        });
    }

    //list of videos based on video id and owner
    $scope.getVideosInfoList = function () {
        $http({
            method: 'GET',
            url: '/resources/rest/getVideosDetails?videoId=' + $scope.videoId,
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
    //load related videos by video id
    $scope.getRelatedVideos = function () {
        $http({
            method: 'GET',
            url: '/resources/rest/getRelatedVideos?videoId=' + $scope.videoId,
            data: $scope.relatedVideoList
        }).success(function (data) {
            $scope.relatedVideoList = data.videos;
            if (data.status.status == 200) {
                $scope.relatedVideosInfo = $scope.relatedVideoList;
                if ($scope.relatedVideosInfo instanceof Array) {
                    $scope.relatedVideosInfo = $scope.relatedVideosInfo;
                } else {
                    $scope.relatedVideosInfo = [$scope.relatedVideosInfo];
                }
                if ($scope.relatedVideosInfo != null && $scope.relatedVideosInfo != "" && $scope.relatedVideosInfo.length > 0) {
                    $scope.relatedRecordLength = $scope.relatedVideosInfo.length;
                }
                else {
                    $scope.checkVideos = true;
                    $scope.msg = "No records found";
                }
            }
        });
    };

    //Get comments details
    $scope.userCommentsList = function () {
        $http({
            method: 'GET',
            url: '/resources/rest/getUsersComments?videoId=' + $scope.videoId,
            data: $scope.usersCommentsList
        }).success(function (data) {
            $scope.usersCommentsList = data.comments;
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
        });
    };

    //get videos details using dynamic video id
    $scope.getRecentVideoByCastName = function () {
        $http({
            method: 'GET',
            url: '/resources/rest/getRecentVideoByCastName?castName=' + $scope.castName,
            data: $scope.recentVideo
        }).success(function (data) {
            $scope.recentVideo = data.video;
            if (data.status.status == 200) {
                $scope.checkUserVideo = false;
                $scope.videoId = $scope.recentVideo.videoId;
                $scope.getVideosById();
                $scope.getVideosInfoList();
                $scope.getRelatedVideos();
                $scope.userCommentsList();
            }
            else if (data.status.status == 206) {
                $scope.checkUserVideo = true;
                $scope.videoInfo = $scope.recentVideo;
                $scope.profileImageFunc();
                $scope.videoMsg = "No Records found";
            }
        });
    };

    //load edited Video id from url
    var newURL = window.location.search;
    if (newURL != "") {
        var param1 = newURL.split('&');
        var aarr = param1[0].split('=');
        var id = aarr[1];
        var key = aarr[0];
        if (key == "?ved" && id != "") {
            $scope.videoId = id;
            $scope.getVideosById();
            $scope.getVideosInfoList();
            $scope.getRelatedVideos();
            $scope.userCommentsList();
        }
    } else {
        var pathname = window.location.pathname;
        var pathvalue = pathname.split('/');
        if (pathvalue != null && pathvalue.length > 2) {
            if (pathvalue.length == 4 && !isNaN(pathvalue[3])) {
                $scope.videoId = pathvalue[3];
                $scope.getVideosById();
                $scope.getVideosInfoList();
                $scope.getRelatedVideos();
                $scope.userCommentsList();
            }
            else {
                var cast = pathvalue[2];
                if (cast != null && cast != '') {
                    $scope.castName = cast;
                    $scope.getRecentVideoByCastName();
                }
            }
        }
    }


    //redirect to videos page
    $scope.redirectToVideo = function (videolst) {
        $window.location.href = "/channelcast.html?ved=" + videolst.videoId;
    };
    //chack menu active
    $scope.isActive = function (viewLocation) {
        var patharr = window.location.pathname.split("/");
        var active = (viewLocation === patharr[patharr.length - 1]);
        return active;
    };
    //Get login users profile details
    $scope.userProfile = function () {
        $http({
            method: 'GET',
            url: '/resources/rest/getUserProfile?token=' + cookie,
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

    //add comments against selected video
    $scope.userCommentsFunc = function (videoInfo) {
        var commentContent = $scope.form.comments.$viewValue;
        if (cookie != null && cookie != '') {
            if (commentContent != null && commentContent != '') {
                $http({
                    method: 'POST',
                    url: '/resources/rest/userComments?videoId=' + videoInfo.videoId + '&token=' + cookie,
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
        }
        else {
            $window.location.href = unstoppableLoginURL + "?ved=" + videoInfo.videoId;
        }
    };

    if (cookie != null && cookie != '') {
        $scope.checkToken = true;
        $scope.userProfile();
        $scope.profileImageCmtUser();
    }
    else {
        $scope.checkToken = false;
        $scope.guestUserImage = "/images/default-avatar.png";
    }
    //for loading latest videos
    $http({
        method: 'GET',
        url: '/resources/rest/getlatestVideos',
        data: $scope.latestListsInfo
    }).success(function (data) {
        $scope.latestListsInfo = data.videos;
               if (data.status.status == 200) {
            if ($scope.latestListsInfo instanceof Array) {
                $scope.latestListsInfo = $scope.latestListsInfo;
                $scope.latestlst_1 = $scope.latestListsInfo[0];
                for (var i = 1; i < $scope.latestListsInfo.length; i++) {
                    $scope.latestLists.push($scope.latestListsInfo[i]);
                }
                ;
            } else {
                $scope.latestListsInfo = [$scope.latestListsInfo];
                $scope.latestlst_1 = $scope.latestListsInfo;
            }
            if ($scope.latestListsInfo != null && $scope.latestListsInfo != "" && $scope.latestListsInfo.length > 0) {
                $scope.latestRecordLength = $scope.latestListsInfo.length;
            }
            else {
                $scope.latestVideos = true;
            }
        }
    });
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
    $scope.seeMoreVideo = function (listObj) {
        //alert(listObj.videoCategory.categoryId);
        $window.location.href = '/seemore_videos.html?selCatVal=' + listObj;
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
    //for search videos by name
    $scope.searchFunc = function (srch) {
        if (srch != null && srch != '' && srch != 'undefined') {
            $window.location.href = '/umsearch.html?srch=' + srch;
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
    $scope.deleteCmt = function (cmtsList) {
        var key = confirm("Do you want to remove it ?");
        if (key == true) {
            $scope.checkVal = false;
            $scope.deleteVideoCmt = cmtsList;
            if ($scope.deleteVideoCmt != null) {
                $http({
                    method: 'POST',
                    url: 'resources/rest/deleteVideoComments',
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
    $http({
        method: 'GET',
        url: 'resources/rest/getCategories',
        data: $scope.allCategories
    }).success(function (data) {
        $scope.categoryItems = data.categories;
    });
});
channelModule.factory('Page', function () {
    var title = 'unstoppablemarketers';
    return {
        title: function () {
            return title;
        },
        setTitle: function (newTitle) {
            title = newTitle
        }
    };
});
