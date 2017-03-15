function videoListCtrl($scope, $http) {
    $http({
        method: 'GET',
        url: 'resources/rest/getVideos',
        data: $scope.sample
    }).success(function (data) {

        $scope.sample = data.videos;
        //alert(data.videos);
        //alert($scope.sample);
    });
}
/*uploadModule.controller('videoListCtrl', function ($scope, $http) {
 $scope.user = {};
 $scope.signUp = function() {
 //alert("posting data....");
 $http({
 method: 'GET',
 url: 'resources/rest/',
 headers: {'Content-Type': 'application/json'},
 data:  $scope.user
 })
 .success(function (data)
 {
 $scope.status=data.status;
 alert($scope.status.message);
 if($scope.status.message == "Success")
 {
 alert("navigation");
 }
 });
 };
 /*	$scope.gridOptions = {
 data: 'sample',
 columnDefs: [
 { field: 'name', displayName: 'Name'} ,
 { field: 'age', displayName: 'Age' }
 ]
 };*/
