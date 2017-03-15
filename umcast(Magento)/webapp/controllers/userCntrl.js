app.controller('userCntrl', function ($scope, $http, $cookies, $window) {
    $scope.userDetails = [];
    $scope.referLength = 0;
    $scope.inDirectReferLength = 0;
    $scope.directReferLength = 0;
    $scope.passUpReferLength = 0;
    $scope.regUsersCount = 0;
    $scope.referUserLengt = 0;
    $scope.affiliatelink = '';
    $scope.checkRecords = false;
    $scope.phoneLength = false;
    $scope.adminPhone = false;
    $scope.onlyNumbers = /^\d+$/;
    $scope.msg = null;
    //get session cookie
    var cookie = '';
    var vals = document.cookie.split(';');
    for (i = 0; i < vals.length; i++) {
        var val = vals[i].split('=');
        if (val[0].trim() == "userToken") {
            cookie = val[val.length - 1];
        }
    }
//	logout function
    $scope.logOut = function () {
        document.cookie = 'userToken= ' + ' ' + ' ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        $scope.checkToken = false;
        $window.location.href = "/admin/login.html";
    };

    if (cookie == null || cookie == '') {
        $scope.logOut();
    }

    //get all users count from database
    $scope.UsersCount = function () {
        $http({
            method: 'GET',
            url: 'resources/rest/getUsersCount',
            data: $scope.usersCount
        }).success(function (data) {
            $scope.userslist = data;
            if (data.status.status == 200) {
                $scope.regUsersCount = data.count;
            }
        });
    };
    $scope.UsersCount();
    //Get login users profile details
    $http({
        method: 'GET',
        url: 'resources/rest/getUserProfile?token=' + cookie,
        data: $scope.profile
    }).success(function (data) {
        $scope.profile = data.user;
        if (data.status.status == 200) {
            $scope.affiliatelink = $scope.profile.referralCode;
        }
        else {
            $scope.logOut();
        }
    });
    //get all users  from database
    $scope.loadUser = function () {
        $http({
            method: 'GET',
            url: 'resources/rest/getUsers',
            data: $scope.userslist
        }).success(function (data) {
            $scope.userslist = data;
            if ($scope.userslist.status.status == 200) {
                $scope.userDetails = $scope.userslist.users;
                if ($scope.userDetails instanceof Array) {
                    $scope.userDetails = $scope.userDetails;
                } else {
                    $scope.userDetails = [$scope.userDetails];
                }
                if ($scope.userDetails != null && $scope.userDetails != "" && $scope.userDetails.length > 0) {
                    $scope.referLength = $scope.userDetails.length;
                }
                else {
                    $scope.checkRecords = true;
                    $scope.msg = "No records found";
                }
            }
            else {
                //$scope.logOut();
            }
        });
    };
    $scope.loadUser();
    //get all countries from database
    $http({
        method: 'GET',
        url: 'resources/rest/getCountries',
        data: $scope.countries
    }).success(function (data) {

        $scope.countryItems = data.countries;
        //$scope.countryItems =[{"countryId":"1","countryName":"Afghanistan"},{"countryId":"2","countryName":"Albania"},{"countryId":"3","countryName":"Albania"},{"countryId":"4","countryName":"Andorra"},{"countryId":"5","countryName":"Antigua and Barbuda"}];
    });
    //update user details
    $scope.update = function () {
        $scope.adminPhone = false;
        if ($scope.profile.firstName != null && $scope.profile.firstName != ''
            && $scope.profile.lastName != null && $scope.profile.lastName != '') {
            var flag = 0;
            if ($scope.profile.phoneNo != null && $scope.profile.phoneNo != '') {
                flag = ($scope.profile.phoneNo.length == 10) ? 0 : 1;
            }
            if (flag == 1) {
                $scope.checkVal = true;
                $scope.adminPhone = true;
                $scope.msg = "Please enter 10 digit Number";
            } else {

                $http({
                    method: 'POST',
                    url: 'resources/rest/updateUser?token=' + cookie,
                    headers: {'Content-Type': 'application/json'},
                    data: $scope.profile
                }).success(function (data) {
                    $scope.userstatus = data.status;
                    if ($scope.userstatus.status == 200) {
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
            }
        } else {
            $scope.checkVal = true;
            $scope.msg = "Value Required";
        }


    };

//	change admin's password
    $scope.changePwd = function () {
        $http({
            method: 'POST',
            url: 'resources/rest/changePassword?token=' + cookie,
            headers: {'Content-Type': 'application/json'},
            data: $scope.profile
        }).success(function (data) {
            $scope.userstatus = data.status;
            if ($scope.userstatus.status == 200) {
                $scope.checkVal = true;
                $scope.msg = "Password Saved successfully";
                $window.location.href = "admin/adminprofile.html";
            }
            else if ($scope.userstatus.status == 204) {
                $scope.checkVal = true;
                $scope.msg = "Value Required";
            }
            else if ($scope.userstatus.status == 205) {
                $scope.checkVal = true;
                $scope.msg = "Not Matched";
            }
            else {
                //$scope.logOut();
            }
        });

    };
    //Edit user details by admin
    $scope.editUser = function (user) {
        $window.location.href = "admin/updateuser.html?Ued=" + user.id + "&tokenAd=" + cookie;
    };
    //redirect to user's referral list page
    $scope.viewRef = function (user) {
        $window.location.href = "admin/referralslist.html?Ued=" + user.id + "&tokenAd=" + cookie;
    };
//	update user's profile by admin
    $scope.updateUser = function () {
        $scope.phoneLength = false;
        if ($scope.editedUserProfile.firstName != null && $scope.editedUserProfile.firstName != ''
            && $scope.editedUserProfile.lastName != null && $scope.editedUserProfile.lastName != '') {
            var flag = 0;
            if ($scope.editedUserProfile.phoneNo != null && $scope.editedUserProfile.phoneNo != '') {
                flag = ($scope.editedUserProfile.phoneNo.length == 10) ? 0 : 1;
            }
            if (flag == 1) {
                $scope.checkVal = true;
                $scope.phoneLength = true;
                $scope.msg = "Please enter 10 digit Number";
            } else {
                $http({
                    method: 'POST',
                    url: 'resources/rest/updateUserByAdmin?id=' + $scope.userEditId + '&token=' + $scope.adminIdEditUser,
                    headers: {'Content-Type': 'application/json'},
                    data: $scope.editedUserProfile
                }).success(function (data) {
                    $scope.userstatus = data.status;
                    if ($scope.userstatus.status == 200) {
                        $scope.checkVal = true;
                        $window.location.href = "admin/admindashboard.html";
                        $scope.msg = "Saved successfully";
                    }
                    else if ($scope.userstatus.status == 204) {
                        $scope.checkVal = true;
                        $scope.msg = "Value Required";
                    }
                    else if ($scope.userstatus.status == 205) {
                        $scope.checkVal = true;
                        $scope.msg = "Not Matched";
                    }
                    else {
                        //$scope.logOut();
                    }
                });
            }
        } else {
            $scope.checkVal = true;
            $scope.msg = "Value Required";
        }
    };

    //get details of edited user
    $scope.getEditUserProfile = function () {
        //Get users profile details edited by admin
        $http({
            method: 'GET',
            url: 'resources/rest/getUserByAdmin?id=' + $scope.userEditId + '&token=' + $scope.adminIdEditUser,
            data: $scope.userProfile
        }).success(function (data) {
            $scope.editedUserProfile = data.user;
            if (data.status.status == 200) {
                //	alert($scope.userProfile);
            }
            else {
                //$scope.logOut();
            }
        });
    };
//	Get edited user's referrals list by admin	
    $scope.getEditUserReferrals = function () {
        $http({
            method: 'GET',
            url: 'resources/rest/getEditedUserReferrals?id=' + $scope.userEditId + '&token=' + $scope.adminIdEditUser,
            data: $scope.usersReflist
        }).success(function (data) {
            $scope.usersReflist = data;
            if ($scope.usersReflist.status.status == 200) {
                $scope.userRefDetails = $scope.usersReflist.users;
                if ($scope.userRefDetails instanceof Array) {
                    $scope.userRefDetails = $scope.userRefDetails;
                } else {
                    $scope.userRefDetails = [$scope.userRefDetails];
                }
                if ($scope.userRefDetails != null && $scope.userRefDetails != "" && $scope.userRefDetails.length > 0) {
                    $scope.referUserLength = $scope.userRefDetails.length;
                }
                else {
                    $scope.checkUserRefRecords = true;
                    $scope.msg = "No records found";
                }
            }
            else {
                //$scope.logOut();
            }
        });
    };

    //get total balance from direct referral(Non Passup)
    $scope.getNonPassupAmt = function () {
        $http({
            method: 'GET',
            url: 'resources/refer/getReferralAmtFromDirectNonPassupByAdmin?id=' + $scope.userEditId + '&token=' + $scope.adminIdEditUser,
            data: $scope.refAmtNonPassList
        }).success(function (data) {
            if (data.status.status == 200) {
                $scope.refAmtNonPass = data.count;
                if ($scope.refAmtNonPass == null || $scope.refAmtNonPass == "null") {
                    $scope.refAmtNonPass = 0;
                }
            }
            else {
                //$scope.logOut();
            }
        });
    };
    //get total balance from direct referral(passup)
    $scope.getDirectPassupAmt = function () {
        $http({
            method: 'GET',
            url: 'resources/refer/getReferralAmtFromDirectPassupByAdmin?id=' + $scope.userEditId + '&token=' + $scope.adminIdEditUser,
            data: $scope.refAmtPassList
        }).success(function (data) {
            if (data.status.status == 200) {
                $scope.refAmtPassup = data.count;
                if ($scope.refAmtPassup == null || $scope.refAmtPassup == "null") {
                    $scope.refAmtPassup = 0;
                }
            }
            else {
                //$scope.logOut();
            }
        });
    };
//	get total balance from passed up users
    $scope.getPassupAmt = function () {
        $http({
            method: 'GET',
            url: 'resources/refer/getPassupParentReferralAmtByAdmin?id=' + $scope.userEditId + '&token=' + $scope.adminIdEditUser,
            data: $scope.passupbalanceList
        }).success(function (data) {
            if (data.status.status == 200) {
                $scope.passupbalance = data.count;
                if ($scope.passupbalance == null || $scope.passupbalance == "null") {
                    $scope.passupbalance = 0;
                }
            }
            else {
                document.cookie = '';
                $window.location.href = "/login.html";
            }
        });
    };
//	Get direct referrals users list
    $scope.directRef = function () {
        $http({
            method: 'GET',
            url: 'resources/refer/getDirectReferralsByAdmin?id=' + $scope.userEditId + '&token=' + $scope.adminIdEditUser,
            data: $scope.directReferrallist
        }).success(function (data) {
            $scope.getDirectReferrals = data;
            if ($scope.getDirectReferrals.status.status == 200) {
                $scope.directReferralDetails = $scope.getDirectReferrals.referrals;
                if ($scope.directReferralDetails instanceof Array) {
                    $scope.directReferralDetails = $scope.directReferralDetails;
                } else {
                    $scope.directReferralDetails = [$scope.directReferralDetails];
                }
                if ($scope.directReferralDetails != null && $scope.directReferralDetails != "" && $scope.directReferralDetails.length > 0) {
                    $scope.directReferLength = $scope.directReferralDetails.length;
                }
                else {
                    $scope.checkDirectRefRecords = true;
                    $scope.msg = "No records found";
                }
            }
            else {
                //$scope.logOut();
            }
        });
    };

//	Get referrals users list	
    $scope.inDirectRef = function () {
        $http({
            method: 'GET',
            url: 'resources/refer/getInDirectReferralsByAdmin?id=' + $scope.userEditId + '&token=' + $scope.adminIdEditUser,
            data: $scope.inDirectReferrallist
        }).success(function (data) {
            $scope.getInDirectReferrals = data;
            if ($scope.getInDirectReferrals.status.status == 200) {
                $scope.inDirectReferralDetails = $scope.getInDirectReferrals.referrals;
                if ($scope.inDirectReferralDetails instanceof Array) {
                    $scope.inDirectReferralDetails = $scope.inDirectReferralDetails;
                } else {
                    $scope.inDirectReferralDetails = [$scope.inDirectReferralDetails];
                }
                if ($scope.inDirectReferralDetails != null && $scope.inDirectReferralDetails != "" && $scope.inDirectReferralDetails.length > 0) {
                    $scope.inDirectReferLength = $scope.inDirectReferralDetails.length;
                }
                else {
                    $scope.checkInDirectRecords = true;
                    $scope.msg = "No records found";
                }
            }
            else {
                //$scope.logOut();
            }
        });
    };
//	Get referrals users list	
    $scope.passUpRef = function () {
        $http({
            method: 'GET',
            url: 'resources/refer/getPassupReferralsByAdmin?id=' + $scope.userEditId + '&token=' + $scope.adminIdEditUser,
            data: $scope.passUpReferrallist
        }).success(function (data) {
            $scope.getPassupReferrals = data;
            if ($scope.getPassupReferrals.status.status == 200) {
                $scope.passupReferralDetails = $scope.getPassupReferrals.referrals;
                if ($scope.passupReferralDetails instanceof Array) {
                    $scope.passupReferralDetails = $scope.passupReferralDetails;
                } else {
                    $scope.passupReferralDetails = [$scope.passupReferralDetails];
                }
                if ($scope.passupReferralDetails != null && $scope.passupReferralDetails != "" && $scope.passupReferralDetails.length > 0) {
                    $scope.passUpReferLength = $scope.passupReferralDetails.length;
                }
                else {
                    $scope.checkPassUpRecords = true;
                    $scope.msg = "No records found";
                }
            }
        });
    };
    //load edited user id from url
    var newURL = window.location.search;
    if (newURL != "") {
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
            if (uidKey == "?Ued" && adidKey == "tokenAd") {
                if (uid != null && adid != "") {
                    $scope.userEditId = uid;
                    $scope.adminIdEditUser = adid;
                    $scope.getEditUserProfile();
                    //$scope.getEditUserReferrals();
                    $scope.getPassupAmt();
                    $scope.getDirectPassupAmt();
                    $scope.getNonPassupAmt();
                    $scope.inDirectRef();
                    $scope.passUpRef();
                    $scope.directRef();
                }

            }
        }
    }

    // delete user
    $scope.removeUser = function (user) {
        var key = confirm("Do you want to remove it ?");
        if (key == true) {
            $scope.checkVal = false;
            $scope.deleteuser = user;
            if ($scope.deleteuser != null) {
                $http({
                    method: 'POST',
                    url: 'resources/rest/deleteUser',
                    headers: {'Content-Type': 'application/json'},
                    data: $scope.deleteuser
                }).success(function (data) {
                    if (data.status.status == 200) {
                        $scope.checkVal = true;
                        $scope.loadUser();
                        $scope.UsersCount();
                        $scope.msg = "Delete successfully";
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
    //searcg filter for firstname,lastname in name wise search
    $scope.searchFilter = function (obj) {
        var re = new RegExp($scope.search, 'i');
        return !$scope.search || re.test(obj.firstName) || re.test(obj.lastName) || re.test(obj.firstName + ' ' + obj.lastName);
    };
    //visible table headers in page
    $scope.headers =
        [
            { "order": 1, "width": 20, "label": "no", "data": "id", "type": "string", "visible": false },
            { "order": 2, "width": 200, "label": "Name", "data": "firstName", "type": "string", "visible": true },
            { "order": 3, "width": 250, "label": "Email", "data": "email", "type": "string", "visible": true },
            { "order": 4, "width": 150, "label": "Phone", "data": "phoneNo", "type": "string", "visible": true }
        ];
    //Pagination for table
    $scope.itemsPerPage = 20;
    $scope.currentPage = 0;
    $scope.items = [];

    $scope.pageCount = function () {
        if ($scope.referLength != 0) {
            return Math.ceil($scope.referLength / $scope.itemsPerPage) - 1;
        }
        else {
            $scope.referLength = 0;
            return $scope.referLength;
        }
    };
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    $scope.prevPageDisabled = function () {
        return $scope.currentPage === 0 ? "disabled" : "";
    };
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
        $scope.searchFilter();
    };
    $scope.nextPageDisabled = function () {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    //name search for 1st in ref table
    $scope.searchrefFilter = function (obj) {

        var re = new RegExp($scope.searchref, 'i');
        return !$scope.searchref || re.test(obj.user.firstName) || re.test(obj.user.lastName) || re.test(obj.firstName + ' ' + obj.lastName);
    };
    //name search for 2nd table
    $scope.searchNameFilter = function (obj) {
        var re = new RegExp($scope.searchName, 'i');
        return !$scope.searchName || re.test(obj.user.firstName) || re.test(obj.user.lastName) || re.test(obj.firstName + ' ' + obj.lastName);
    };
    //name search for 3rd table
    $scope.searchNamesFilter = function (obj) {
        var re = new RegExp($scope.searchNames, 'i');
        return !$scope.searchNames || re.test(obj.user.firstName) || re.test(obj.user.lastName) || re.test(obj.firstName + ' ' + obj.lastName);
    };
    $scope.searchEmailFilter = function (obj) {
        var re = new RegExp($scope.searchEmail, 'i');
        return !$scope.searchEmail || re.test(obj.user.email);
    };
});
app.filter('offset', function () {
    return function (input, start) {
        input = input || '';
        start = parseInt(start, 10);
        return input.slice(start);
    };
});
