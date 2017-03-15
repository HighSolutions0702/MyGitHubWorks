app.service( 'MyCtrl',['$scope', '$http', '$timeout', '$upload', function ($scope, $http, $timeout, $upload) {
//			 URL to upload video.
            var DAILYMOTION_UPLOADURL = "https://api.dailymotion.com/file/upload";
            var DAILYMOTION_SAVEURL = "https://api.dailymotion.com/me/videos";
            var BLOG_URL = "http://174.142.115.238/wp/wp-content/themes/rundown/wp-post.php";
            var token = '';

// added 
            var videoname = 'test name';
            var videoDesc = 'test desc';
            var videoCateg = '1';
            var videoId = '12';

//			 step 1 : get access token from server 
            $scope.getDailmotionAccessToken = function () {
                $http({
                    method: 'GET',
                    url: '/umcast/resources/share/getAccessTokenDailymotion?token=' + cookie
                }).success(function (data) {
                    if (data.status.status == 200) {
                        token = data.token;
                        if (token != null && token != '') {
                            $scope.getXspinnerValueForDailymotion();
                        }
                    }
                });
            };

//			 step 2 : get updated title and desc from Xspinner (optional )(should not affect dailymotion upload because of this fails)
            $scope.getXspinnerValueForDailymotion = function () {
                $http(
                    {
                        method: 'GET',
                        url: '/umcast/resources/share/getXspinnerValue?keyPosition=1&title='
                            + videoname + '&desc=' + videoDesc
                    }).success(
                    function (data) {
                        var title = videoname;
                        var desc = videoDesc;
                        if (data.status.status == 200) {
                            var temp = data.video;
                            title = temp.videoName;
                            desc = temp.videoDescription;
                        }
                        var video_page_url = fb_return_url + "/umcast/channelcast.html?ved="
                            + videoId;
                        desc = desc + " " + video_page_url;
                        getDailmotionUploadUrl($scope.selectedFiles[0], title, desc, accessToken,
                            videoCateg);
                    });
            };

//			 step 3 : get video upload url using access token from dailymotion 
            $scope.getDailmotionUploadUrl = function () {
                $http({
                    method: 'GET',
                    url: DAILYMOTION_UPLOADURL + '?access_token=' + token
                }).success(function (data) {
                    if (data.upload_url != '') {
                        var uploadUrl = data.upload_url;
                        $scope.uploadDailymotionVideo(uploadUrl);
                    }
                });
            };

//			 step 4 : upload video using access token to dailymotion 			 
            $scope.uploadDailymotionVideo = function (uploadUrl) {
                $scope.progress[index] = 0;
                $scope.errorMsg = null;
                $upload.upload(
                    {
                        url: uploadUrl + '?access_token=' + token,
                        method: $scope.httpMethod,
                        // headers: {'my-header':
                        // 'my-header-value'},
                        headers: {
                            'Payload-Type': $scope.contentTypes[index]
                        },
                        file: $scope.selectedFiles[index],
                        fileFormDataName: 'fileToUpload'
                    }).progress(function (evt) {
                        console.log('evt -> ' + evt);
                    }).success(function (response, status, headers, config) {
                        console.log('Response -> ' + response);
                        if (response.url != '') {
                            $scope.saveDailmotionVideoMetaData(response.url);
                        }
                    }).error(function (response) {
                        console.log('Response -> ' + response);
                    });
            };

//			 step 5 : post video meta data to dailymotion 
            $scope.saveDailmotionVideoMetaData = function (url) {
                $scope.dailymotionVideo.title = $scope.form.displayName.$viewValue;
                $scope.dailymotionVideo.description = $scope.form.videoDesc.$viewValue;
                $scope.dailymotionVideo.published = true;
                $scope.dailymotionVideo.url = url;
                $http({
                    method: 'POST',
                    url: DAILYMOTION_SAVEURL + '?access_token=' + token,
                    data: $scope.dailymotionVideo
                }).success(function (data) {
                    if (data.id != '') {
                        var dailymotionId = data.id;
                        $scope.uploadDailymotionVideo(dailymotionId);
                    }
                });
            };


//			 step 6 : post video meta data to dailymotion 
            $scope.postBlogForDailymotion = function (dailymotionId, title, desc, userName, categoryId) {
                if (dailymotionId) {
                    var blog_url_content = BLOG_URL + "?dTitle=" + encodeURI(title) + "&dContent=" + encodeURI(desc) + "&dailyId=" + dailymotionId + "&cat_id=" + categoryId + "&duname=" + encodeURI(userName);
                    $http({
                        method: 'GET',
                        url: blog_url_content
                    }).success(function (data) {
                        console.log('Response -> ' + response);
                        window.location.href = "/umcast/video/videomanager.html";
                    }).error(function (response) {
                        console.log('Response -> ' + response);
                        window.location.href = "/umcast/video/videomanager.html";
                    });
                }
            };
        }]);
