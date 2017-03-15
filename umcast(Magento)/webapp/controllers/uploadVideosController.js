uploadModule.controller('videoUploadCtrl', ['$scope', '$http', '$timeout', '$upload', '$cookies', '$window',
    function ($scope, $http, $timeout, $upload, $cookies, $window) {
        // local fb App Id
        var fbappId = '346258838863861', fb_return_url = 'http://umcast.com', unstoppableLoginURL = "http://localhost:8080/unstoppablemarketers/login.html";

        $scope.showSaveBtn = false;
        $scope.visitYoutube = false;
        $scope.thumbLen = 0;
        // get session cookie
        var cookie = '';
        var vals = document.cookie.split(';');
        for (i = 0; i < vals.length; i++) {
            var val = vals[i].split('=');
            if (val[0].trim() === "userToken") {
                cookie = val[val.length - 1];
                $scope.cookieVal = (cookie != null && cookie != '') ? cookie : null;
            }
        }

        // logout function
        $scope.logOut = function () {
            /*
             * document.cookie = 'userToken= ' +' '+' ; expires=Thu, 01
             * Jan 1970 00:00:00 GMT; path=/'; $scope.checkToken=false;
             * $window.location.href =
             * "/unstoppablemarketers/login.html";
             */
            $http({
                method: 'GET',
                url: '/umcast/resources/rest/userLogOut?token=' + cookie,
                data: $scope.logOutUser
            })
                .success(
                function (data) {
                    if (data.status.status === 200) {
                        $scope.checkToken = false;
                        document.cookie = 'userToken= ' + ' '
                            + ' ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
                        $window.location.href = unstoppableLoginURL;
                    }
                });
        };

        // check cookie token value
        if (cookie == null || cookie == '') {
            $scope.logOut();
        }
        /**
         * Set to true when you want to show a success message and false when any of upload stages fails
         */
        $scope.isUploaded = false;
        // Get login users profile details
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
            } else {
                $scope.logOut();
            }
        });

        $scope.fileReaderSupported = window.FileReader != null;
        $scope.uploadRightAway = true;
        $scope.changeAngularVersion = function () {
            window.location.hash = $scope.angularVersion;
            window.location.reload(true);
        };

        $scope.angularVersion = window.location.hash.length > 1 ? window.location.hash.substring(1)
            : '1.2.0';


        // File drag drop and file select call back
        $scope.onFileSelect = function ($files) {
            $scope.showSaveBtn = false;
            $scope.showRetryBtn = false;
            $scope.uploadMsg = 'File selected, preparing ...'
            // show form
            document.getElementById("upload_select").style.display = 'none';
            document.getElementById("upload_form").style.display = 'block';

            $scope.selectedFiles = [];
            $scope.progress = [];
            var i;
            if ($scope.upload && $scope.upload.length > 0) {
                for (i = 0; i < $scope.upload.length; i++) {
                    if ($scope.upload[i] != null) {
                        $scope.upload[i].abort();
                    }
                }
            }
            $scope.upload = [];
            $scope.uploadResult = [];
            $scope.selectedFiles = $files;
            $scope.dataUrls = [];
            $scope.contentTypes = [];
            var file;
            var fileReader;
            for (i = 0; i < $files.length; i++) {
                file = $files[i];
                if (!$scope.isVideo(i, file.name)) {
                    $scope.isUploaded = false;
                    $scope.uploadMsg = "Invalid Video File Format. Only flv,mp4,m4v,f4v,mov && webm formats allowed";
                    document.getElementById("upload_select").style.display = 'block';
                    document.getElementById("upload_form").style.display = 'none';
                    return;
                }

                $scope.isUploaded = true;

                if (window.FileReader && file.type.indexOf('image') > -1) {
                    fileReader = new FileReader();
                    $scope.uploadMsg = "Reading file from disk..";
                    fileReader.readAsDataURL(file);


                    fileReader.onload = function (e) {
                        $timeout(function () {
                            $scope.dataUrls[index] = e.target.result;
                        });
                    };

                }
                $scope.progress[i] = -1;
                if ($scope.uploadRightAway) {
                    $scope.start(i, file);
                }
            }
        };

        /**
         * Allows video as per jwplayer support
         */
        $scope.isVideo = function (index, filename) {
            var ext = getExtension(filename);
            switch (ext.toLowerCase()) {
                case 'flv':
                    $scope.contentTypes[index] = 'video/x-flv';
                    return true;
                case 'mp4':
                case 'm4v':
                case 'f4v':
                case 'mov':
                    $scope.contentTypes[index] = 'video/mp4';
                    return true;
                case 'webm':
                    $scope.contentTypes[index] = 'video/webm';
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
            $upload.upload(
                {
                    url: '/umcast/upload?token=' + cookie + '&fileSize='
                        + $scope.selectedFiles[index].size,
                    method: $scope.httpMethod,
                    // headers: {'my-header':
                    // 'my-header-value'},
                    headers: {
                        'Payload-Type': $scope.contentTypes[index]
                    },
                    file: $scope.selectedFiles[index],
                    fileFormDataName: 'fileToUpload'
                }).progress(function (evt) {
                    $scope.poll(index);
                }).success(function (response, status, headers, config) {
                    console.log('Response -> ' + response);
                    //Removing the messaging status
                    $scope.removeStatus();
                    $scope.uploadMsg = response;
                    if (response == 'Completed') {
                        // file is uploaded
                        // successfully
                        $scope.uploadMsg = "Success, creating thumbnail ..";
                        console.log('Loading thumbnail!');
                        $scope.loadThumbnail();
                        $scope.progress[index] = 100;
                        $scope.isUploaded = true;
                        $scope.showRetryBtn = false;
                    } else if (response == 'Failed') {
                        //Trigger Retry
                        $scope.isUploaded = false;
                        $scope.showRetryBtn = true;
                        $scope.progress[index] = 0;
                        $scope.uploadMsg = response + ', do you want to try again?';
                    } else if (response == 'Canceled') {
                        $scope.isUploaded = true;
                        $scope.uploadMsg = "Job " + response + ', on server';
                        $scope.progress[index] = 0;
                    }

                }).error(function (response) {
                    $scope.removeStatus();
                    if (response == 'Failed') {
                        //Trigger Retry
                        $scope.isUploaded = false;
                        $scope.showRetryBtn = true;
                        $scope.uploadMsg = response + ', do you want to try again?';
                    } else if (response == 'Canceled') {
                        $scope.isUploaded = true;
                        $scope.uploadMsg = "Job " + response + ', on server';
                    }
                });
        };

        /**
         * Polls the server and updates the status information
         */
        $scope.poll = function (index) {
            $http({
                method: 'GET',
                url: '/umcast/resources/rest/pollUploadStatus?token=' + cookie

            }).success(
                function (uploadProgress) {
                    var status = uploadProgress.status;
                    console.log('Poll -> ' + status.message);
                    if (status.message == 'Transfering') {
                        console.log('statusMessage.cookie: ' + uploadProgress.cookie);
                        console.log('progress: ' + uploadProgress.progress + " Total :" + $scope.selectedFiles[index].size);
                        $scope.progress[index] = Math.min(100, parseInt(100.0
                            * uploadProgress.progress / $scope.selectedFiles[index].size));
                        $scope.uploadMsg = status.message + ' ' + $scope.progress[index] + '%';
                    } else if (status.message === 'Waiting') {
                        $scope.uploadMsg = status.message + " on queue!";
                    } else if (status.message === 'Started') {
                        $scope.uploadMsg = status.message;
                    }

                });
        };

        $scope.removeStatus = function () {
            $http({
                method: 'GET',
                url: '/umcast/resources/rest/removeUploadStatus?token=' + cookie

            }).success(function (statusMessage) {
                return statusMessage;
            });
        };

        $scope.thumbnails = [ "../images/upload_sign.png", "../images/upload_sign.png" ];

        /**
         * Creates a thumbnail image for the new upload
         */
        $scope.loadThumbnail = function () {
            $http({
                method: 'GET',
                url: '/umcast/resources/rest/createThumbnailFromTemp?token=' + cookie,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.thumbnails
            }).success(function (data) {
                if (data.status.status === 200) {
                    if (data.thumbnails !== null && data.thumbnails.length > 0) {
                        $scope.thumbnails = data.thumbnails;
                        $scope.setSelectedThumb($scope.thumbnails[0]);
                        $scope.thumbLen = $scope.thumbnails.length;
                        $scope.uploadMsg = "Created thumbnail. Please enter required information to save.";
                        $scope.showSaveBtn = true;
                    } else {
                        $scope.thumbnails = [ "../images/upload_sign.png", "../images/upload_sign.png" ];
                    }
                } else {
                    $scope.thumbnails = [ "../images/upload_sign.png", "../images/upload_sign.png" ];
                }
            });
        };
        $scope.setSelectedThumb = function (thumb) {
            $scope.selectedThumb = thumb;
        };

        function fbshare(vidId, videoname, videoDesc, videoImage) {
            FB.init({
                appId: fbappId,
                status: true,
                cookie: true,
                xfbml: true
            });
            /*
             * FB.ui({ method: 'share_open_graph', name: videoname,
             * description: videoDesc, action_type: 'og.likes',
             * action_properties: JSON.stringify({
             * object:'https://www.youtube.com/watch?v=sG_HkgTNatg',
             * title: videoname, description: videoDesc, image:
             * videoImage }) }, function(response){});
             */
            FB.ui({
                method: 'feed',
                name: videoname,
                link: fb_return_url + '/umcast/channelcast.html?ved=' + vidId,
                picture: videoImage,
                // caption: '',
                description: videoDesc,
                source: 'http://www.umcast.com/umcast/channelVideo.html?ved=' + vidId
            }, function (response) {
            });
        }

        $scope.getXspinnerValue = function (accessToken) {
            var videoname = $scope.videoForm.displayName.$viewValue;
            var videoDesc = $scope.videoForm.videoDesc.$viewValue;
            var videoCateg = $scope.videoForm.videoCategory.$viewValue;
            $http(
                {
                    method: 'GET',
                    url: '/umcast/resources/share/getXspinnerValue?keyPosition=1&title='
                        + videoname + '&desc=' + videoDesc,
                    data: $scope.xspinner
                }).success(
                function (data) {
                    var temp = data.video;
                    var title = videoname;
                    var desc = videoDesc;
                    if (data.status.status == 200) {
                        title = temp.videoName;
                        desc = temp.videoDescription;
                    }
                    var video_page_url = fb_return_url + "/umcast/channelcast.html?ved="
                        + $scope.video.videoId;
                    desc = desc + " " + video_page_url;
                    $scope.visitYoutube = true;
                    initiateUpload($scope.selectedFiles[0], title, desc, accessToken,
                        videoCateg);
                });
        };

        $scope.youtubeUpload = function () {
            $http({
                method: 'GET',
                url: '/umcast/resources/share/getAccessTokenYoutube?token=' + cookie,
                data: $scope.count
            }).success(function (data) {
                var temp = data.count;
                if (data.status.status == 200) {
                    if (temp != null && temp != '') {
                        $scope.getXspinnerValue(temp);
                    } else {
                        $scope.visitYoutube = false;
                        $scope.uploadMsg = "Uploaded successfully";
                        $window.location.href = "/video/videomanager.html";
                    }

                } else {
                    $scope.visitYoutube = false;
                    $scope.uploadMsg = "Uploaded successfully";
                    $window.location.href = "/video/videomanager.html";
                }

            });
        };

        $scope.saveVideo = function () {
            $scope.uploadMsg = '';
            $scope.isUploaded = false;
            // $scope.showSaveBtn=false;
            var videoname = $scope.videoForm.displayName.$viewValue;
            var videoDesc = $scope.videoForm.videoDesc.$viewValue;
            var videoCateg = $scope.videoForm.videoCategory.$viewValue;
            var videoTag = $scope.videoForm.tagsDetails.$viewValue;
            var videoVisible = $scope.videoForm.videoVisible.$viewValue;
            var thumbImgName = null;
            var imgUrl = $scope.selectedThumb;
            if (imgUrl != null && imgUrl != '') {
                thumbImgName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1);
                var tempImg = 'upload_sign.png';
                if (thumbImgName == tempImg) {
                    $scope.selectedThumb = null;
                }
            }
            $scope.videos.thumbnailImage = $scope.selectedThumb;
            if ((videoname != null && videoname != "") && (videoDesc != null && videoDesc != "")
                && (videoCateg != null && videoCateg != "")
                && (videoTag != null && videoTag != "")
                && (videoVisible != null && videoVisible != "")) {
                $scope.loading = true;
                $scope.showSaveBtn = false;
                // google api
                // handleClientLoad($scope.selectedFiles[0],videoname,videoDesc);

                $http({
                    method: 'POST',
                    url: '/umcast/resources/rest/videoUpload?token=' + cookie,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: $scope.videos
                })
                    .success(
                    function (data) {
                        $scope.video = data.video;
                        if (data.status.status == 200) {
                            $scope.isUploaded = true;
                            $scope.loading = false;
                            if (videoVisible == "1") {
                                $scope.youtubeUpload();
                                if ((data.video.posterUrl == null || data.video.posterUrl == "")) {
                                    data.video.posterUrl = 'https://s3-us-west-2.amazonaws.com/um.video.sanbox/logo.png';
                                }
                                fbshare(data.video.videoId, data.video.videoName,
                                    data.video.videoDescription,
                                    data.video.posterUrl);
                                $scope.uploadMsg = "Saved successfully";
                            } else {
                                $scope.uploadMsg = "Saved successfully";
                                $window.location.href = "/video/videomanager.html";
                            }

                        } else if (data.status.status == 401) {
                            $scope.isUploaded = $scope.loading = false;
                            $scope.uploadMsg = "Unauthorized User, discarding the upload.";
                        } else {
                            $scope.isUploaded = $scope.loading = false;
                            $scope.uploadMsg = "Save Failed!";
                        }
                    });
            } else {
                $scope.showSaveBtn = true;
                $scope.isUploaded = false;
                $scope.uploadMsg = "Missing details in the form, please fill all fields!";
            }
        };

        // Cancel on user  request.
        $scope.cancel = function () {
            $scope.isUploaded = true;
            $scope.uploadMsg = "Canceling the upload job, please wait..";
            $http({
                method: 'GET',
                url: '/umcast/resources/rest/cleanUpOnUploadCancel?token=' + cookie

            }).success(function (response) {
                $scope.uploadMsg = "Canceled";
                $window.location.href = "/video/videoupload.html";
            });

        };

        $scope.tagsDetails = [];
        $scope.tags = [];
        $http({
            method: 'GET',
            url: '/umcast/resources/rest/getAllTags',
            data: $scope.tagsList
        }).success(function (data) {
            $scope.tagVal = data.tags;
            angular.forEach($scope.tagVal, function (value) {
                $scope.tags.push(value.tagName);
            });

        });
        $scope.loadTags = function (query) {
            // alert($scope.tags);
            return ($scope.tags + '&query=' + query);
        };

        $scope.isActive = function (viewLocation) {
            var patharr = window.location.pathname.split("/");
            var active = (viewLocation === patharr[patharr.length - 1]);
            return active;
        };

    } ]);

