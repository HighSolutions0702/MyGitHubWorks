videoModule.controller('ThumbNailCtrl', [ '$scope', '$http', '$cookies', function ($scope, $http, $cookies) {

    var cookie = $cookies.sessionToken;
    var defaultThumbNails = [ '/images/upload_sign.png', '/images/upload_sign1.png', '/images/upload_sign2.png' ];
    $scope.thumbnails = defaultThumbNails;

    /**
     * Creates a thumbnail image for the new upload
     */
    $scope.loadThumbnail = function () {
        $http({
            method: 'GET',
            url: '/resources/rest/createThumbnailFromTemp?token=' + cookie,
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.thumbnails
        }).success(function (data) {
            if (data.status.status === 200) {
                if (data.thumbnails !== null && data.thumbnails.length > 0) {
                    var i;
                    for (i = 0; i < data.thumbnails.length; i++) {
                        if (!data.thumbnails[i].indexOf('/') == 0) {
                            data.thumbnails[i] = '/' + data.thumbnails[i];
                        }
                    }
                    $scope.thumbnails = data.thumbnails;
                    $scope.thumbLen = $scope.thumbnails.length;
                    $scope.uploadMsg = "Created thumbnail. Please enter required information to save.";
                    $scope.showSaveBtn = true;
                } else {
                    $scope.thumbnails = defaultThumbNails;
                }
            } else {
                $scope.thumbnails = defaultThumbNails;
                $scope.uploadMsg = data.status.msg + ' to create thumbnails on server!';
            }
            $scope.setSelectedThumb($scope.thumbnails[0]);
        });
    };
    $scope.setSelectedThumb = function (thumb) {
        $scope.selectedThumb = thumb;
    };

}])
