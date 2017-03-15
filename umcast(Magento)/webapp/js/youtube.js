//Enter a client ID for a web application from the Google Developer Console.
//The provided clientId will only work if the sample is run directly from
//https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
//In your Developer Console project, add a JavaScript origin that corresponds to the domain
//where you will be running the script.
//local      
var clientId = '37385053698-4lh6609jc9ceplfd4g4hh32p7q30desr.apps.googleusercontent.com';
//184 server
//var clientId = '669623686757-md858l07hgmpc1idllq44hp3bbpqiquo.apps.googleusercontent.com';

//Enter the API key from the Google Develoepr Console - to handle any unauthenticated
//requests in the code.
//The provided key works for this sample only when run from
//https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
//To use in your own application, replace this API key with your own.
//local
//var apiKey = 'AIzaSyBDLuktzzhlde5T0hHuNhOoFKfhiQ_QzvQ';


//To enter one or more authentication scopes, refer to the documentation for the API.
var scopes = 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.upload';
var GOOGLE_PLUS_SCRIPT_URL = 'https://apis.google.com/js/client:plusone.js';
var CHANNELS_SERVICE_URL = 'https://www.googleapis.com/youtube/v3/channels?approval_prompt=auto';
var VIDEOS_UPLOAD_SERVICE_URL = 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet';
var VIDEOS_SERVICE_URL = 'https://www.googleapis.com/youtube/v3/videos';
var INITIAL_STATUS_POLLING_INTERVAL_MS = 15 * 1000;

var accessToken;
var file;
var url;
var name;
var desc;
var userName;
var catId;
//Use a button to handle authentication the first time.
/*function handleClientLoad(file1,name1,desc1) {
 file = file1;
 name = name1;
 desc = desc1;
 gapi.client.setApiKey(apiKey);
 window.setTimeout(checkAuth,1);
 }
 */
/*function checkAuth() {
 gapi.auth.authorize({response_type:'token',client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
 }


 function handleAuthResult(authResult) {

 var authorizeButton = document.getElementById('authorize-button');


 if (authResult && !authResult.error) {
 accessToken = authResult.access_token;
 // authorizeButton.style.visibility = 'hidden';
 // makeApiCall();
 //initiateUpload();
 initiateUpload(file,name,desc);
 } else {
 //authorizeButton.style.visibility = '';
 // authorizeButton.onclick = handleAuthClick;
 handleAuthClick();
 }
 }



 function handleAuthClick() {
 gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
 return false;
 }*/

function initiateUpload(file1, name1, desc1, accToken1, catId1) {
    accessToken = accToken1;
    file = file1;
    name = name1;
    desc = desc1;
    catId = catId1;
    // var file = $('#file').get(0).files[0];

    if (file) {
        var metadata = {
            snippet: {
                title: name,
                description: desc,
                categoryId: 22
            }
        };
        $.ajax({
            url: VIDEOS_UPLOAD_SERVICE_URL,
            method: 'POST',
            contentType: 'application/json',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'x-upload-content-length': file.size,
                'x-upload-content-type': file.type
            },
            data: JSON.stringify(metadata)
        }).done(function (data, textStatus, jqXHR) {
            resumableUpload({
                url: jqXHR.getResponseHeader('Location'),
                file: file,
                start: 0
            });
        });
    }
}

function resumableUpload(options) {
    var ajax = $.ajax({
        url: options.url,
        method: 'PUT',
        contentType: options.file.type,
        headers: {
            'Content-Range': 'bytes ' + options.start + '-' + (options.file.size - 1) + '/' + options.file.size
        },
        xhr: function () {
            // Thanks to http://stackoverflow.com/a/8758614/385997
            var xhr = $.ajaxSettings.xhr();

            if (xhr.upload) {
                xhr.upload.addEventListener(
                    'progress',
                    function (e) {
                        if (e.lengthComputable) {
                            var bytesTransferred = e.loaded;
                            var totalBytes = e.total;
                            var percentage = Math.round(100 * bytesTransferred / totalBytes);

                            $('#upload-progress').attr({
                                value: bytesTransferred,
                                max: totalBytes
                            });

                            $('#percent-transferred').text(percentage);
                            $('#bytes-transferred').text(bytesTransferred);
                            $('#total-bytes').text(totalBytes);

                            $('.during-upload').show();
                        }
                    },
                    false
                );
            }

            return xhr;
        },
        processData: false,
        data: options.file
    });
    ajax.done(function (response) {
        var videoId = response.id;

        postblog(videoId, name, desc, userName, catId);
        //$('#video-id').text(videoId);
        // $('.post-upload').show();
        checkVideoStatus(videoId, INITIAL_STATUS_POLLING_INTERVAL_MS);

    });

    ajax.fail(function () {
        $('#submit').click(function () {
            alert('Not yet implemented!');
        });
        // $('#submit').val('Resume Upload');
        // $('#submit').attr('disabled', false);
    });
}

function checkVideoStatus(videoId, waitForNextPoll) {
    $.ajax({
        url: VIDEOS_SERVICE_URL,
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + accessToken
        },
        data: {
            part: 'status,processingDetails,player',
            id: videoId
        }
    }).done(function (response) {
        var processingStatus = response.items[0].processingDetails.processingStatus;
        var uploadStatus = response.items[0].status.uploadStatus;

        $('#post-upload-status').append('<li>Processing status: ' + processingStatus + ', upload status: ' + uploadStatus + '</li>');

        if (processingStatus == 'processing') {
            setTimeout(function () {
                checkVideoStatus(videoId, waitForNextPoll * 2);
            }, waitForNextPoll);
        } else {
            if (uploadStatus == 'processed') {
                $('#player').append(response.items[0].player.embedHtml);
            }

            $('#post-upload-status').append('<li>Final status.</li>');
        }
    });
}

function postblog(url, title, desc, userName, categoryId) {
    var blog_url = "http://174.142.115.238/wp/wp-content/themes/rundown/wp-post.php";
    var blog_url_content = blog_url + "?post_title=" + encodeURI(title) + "&post_content=" + encodeURI(desc) + "&embed=" + url + "&cat_id=" + categoryId + "&yuname=" + encodeURI(userName);
    if (url) {

        $.ajax({
            url: blog_url_content,
            method: 'GET',
            success: function (data) {
                window.location.href = "/umcast/video/videomanager.html";
                //data - response from server
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.href = "/video/videomanager.html";
            }
        });
    }
    //window.location.href = "/video/videomanager.html";
}
