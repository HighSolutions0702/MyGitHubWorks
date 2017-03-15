angular.module('com.obs').controller('userCntrl', function ($scope, $http, $cookies, $window, $cookieStore) {
    //for bitly url shorten
    var bitlylogin = 'ramprasathraja';
    var bitlyApi = 'R_645c7734d7ff436fa989020615326275';
    $scope.profile = {};
    $scope.profileLevel = {};
    $scope.userDetails = [];
    $scope.referLength = 0;
    $scope.inDirectReferLength = 0;
    $scope.directReferLength = 0;
    $scope.passUpReferLength = 0;
    $scope.regUsersCount = 0;
    $scope.affiliatelink = '';
    $scope.checkRecords = false;
    $scope.msg = null;
    $scope.onlyNumbers = /^\d+$/;
    //get session cookie
    var cookie = '';
    var vals = document.cookie.split(';');
    for (i = 0; i < vals.length; i++) {
        var val = vals[i].split('=');
        if (val[0].trim() == "userToken") {
            cookie = val[val.length - 1];
        }
    }

    //logout function
    $scope.logOut = function () {
        document.cookie = 'userToken= ' + ' ' + ' ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        $scope.checkToken = false;
        $window.location.href = "/login.html";
    };
    if (cookie == null || cookie == '') {
        $scope.logOut();
    }
    // get county
    $http({
        method: 'GET',
        url: '/unstoppablemarketers/resources/rest/getCountries',
        data: $scope.countries
    }).success(function (data) {

        $scope.countryItems = data.countries;
        //$scope.countryItems =[{"countryId":"1","countryName":"Afghanistan"},{"countryId":"2","countryName":"Albania"},{"countryId":"3","countryName":"Albania"},{"countryId":"4","countryName":"Andorra"},{"countryId":"5","countryName":"Antigua and Barbuda"}];
    });
    //Get login users profile details
    $http({
        method: 'GET',
        url: '/unstoppablemarketers/resources/rest/getUserProfile?token=' + cookie,
        data: $scope.profile
    }).success(function (data) {

        if (data.status.status == 200) {
            $scope.profile = data.user;
            //$scope.levelid=$scope.profile.level_id;
            $scope.getProfileLevel();
            get_short_url($scope.profile.referralCode);

        }
        else {
            $scope.logOut();
        }
    });
    // Get Active Menu
    $http({
        method: 'GET',
        url: '/unstoppablemarketers/resources/rest/getActiveMenu?token=' + cookie,
        data: $scope.menuActive
    }).success(function (data) {
        if (data.status.status == 200) {
            $scope.menuActive = data.menu;
        }
        else {
            //$scope.logOut();
        }
    });
//	Get referrals users list	
    $http({
        method: 'GET',
        url: '/unstoppablemarketers/resources/refer/getDirectReferralsAndPassups?token=' + cookie,
        data: $scope.referrallist
    }).success(function (data) {
        $scope.referrallist = data;
        if ($scope.referrallist.status.status == 200) {
            $scope.referralDetails = $scope.referrallist.referrals;
            if ($scope.referralDetails instanceof Array) {
                $scope.referralDetails = $scope.referralDetails;
            } else {
                $scope.referralDetails = [$scope.referralDetails];
            }
            if ($scope.referralDetails != null && $scope.referralDetails != "" && $scope.referralDetails.length > 0) {
                $scope.referLength = $scope.referralDetails.length;
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

    /*$scope.nextSaleVal=((($scope.referLength/2)==0)?($scope.referLength/2):$scope.referLength);
     alert($scope.nextSaleVal);*/

    //get total balance from direct referral(Non Passup)
    $http({
        method: 'GET',
        url: '/unstoppablemarketers/resources/refer/getReferralAmountFromDirectNonPassup?token=' + cookie,
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
    //get total balance from direct referral(passup)
    $http({
        method: 'GET',
        url: '/unstoppablemarketers/resources/refer/getReferralAmountFromDirectPassup?token=' + cookie,
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
    //get total balance
    $http({
        method: 'GET',
        url: '/unstoppablemarketers/resources/refer/getReferralAmount?token=' + cookie,
        data: $scope.refbalanceList
    }).success(function (data) {
        if (data.status.status == 200) {
            $scope.refbalance = data.count;
            if ($scope.refbalance == null || $scope.refbalance == "null") {
                $scope.refbalance = 0;
            }
        }
        else {
            //$scope.logOut();
        }
    });

    //get total balance from passed up users
    $http({
        method: 'GET',
        url: '/unstoppablemarketers/resources/refer/getPassupParentReferralAmount?token=' + cookie,
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


    //change user's password
    $scope.changePwd = function () {
        $http({
            method: 'POST',
            url: '/unstoppablemarketers/resources/rest/changePassword?token=' + cookie,
            headers: {'Content-Type': 'application/json'},
            data: $scope.profile
        }).success(function (data) {
            $scope.userstatus = data.status;
            if ($scope.userstatus.status == 200) {
                $scope.checkVal = true;
                $scope.msg = "Password Saved successfully";
                $window.location.href = "/unstoppablemarketers/user/profile.html";
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
                    url: '/unstoppablemarketers/resources/rest/updateUser?token=' + cookie,
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
//	Get direct referrals users list	
    $http({
        method: 'GET',
        url: '/unstoppablemarketers/resources/refer/getDirectReferrals?token=' + cookie,
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

//	Get referrals users list	
    $http({
        method: 'GET',
        url: '/unstoppablemarketers/resources/refer/getInDirectReferrals?token=' + cookie,
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

//	Get referrals users list	
    $http({
        method: 'GET',
        url: '/unstoppablemarketers/resources/refer/getPassupReferrals?token=' + cookie,
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
        else {
            //$scope.logOut();
        }
    });
    //visible table headers in page
    $scope.headers =
        [
            { "order": 1, "width": 20, "label": "S.No", "data": "order", "type": "string", "visible": false },
            { "order": 2, "width": 200, "label": "Name", "data": "firstName", "type": "string", "visible": true },
            { "order": 3, "width": 250, "label": "Status", "data": "order", "type": "string", "visible": true }
        ];


    //chack menu active
    $scope.isActive = function (viewLocation) {
        var patharr = window.location.pathname.split("/");
        var active = (viewLocation === patharr[patharr.length - 1]);
        return active;
    };

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
    };
    $scope.nextPageDisabled = function () {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };
    //loading drop down menus
    function DropDown(el) {
        this.dd = el;
        this.initEvents();
    }

    DropDown.prototype = {
        initEvents: function () {
            var obj = this;

            obj.dd.on('click', function (event) {
                $(this).toggleClass('active');
                event.stopPropagation();
            });
        }
    };

    $(document).mouseover(function () {
        var dd = new DropDown($('#dd'));
        $(document).click(function () {
            $('.wrapper-dropdown-5').removeClass('active');
        });

    });

    //url shorten using bitly api
    function get_short_url(long_url) {
        $http({
            method: 'GET',
            url: 'http://api.bit.ly/v3/shorten?login=' + bitlylogin + '&apiKey=' + bitlyApi + '&longUrl=' + long_url + '&format=json',
            headers: {'Content-Type': 'application/json'}
        }).success(function (data) {
            if (data.status_code == 200) {
                $scope.affiliatelink = data.data.url;
            }
            else {
                $scope.affiliatelink = long_url;
            }
        });
    }

    //getCMSMenuOfMember user
    $http({
        method: 'GET',
        url: '/unstoppablemarketers/resources/rest/getCMSMenuOfMember',
        data: $scope.menu
    }).success(function (data) {
        if (data.status.status == 200) {
            $scope.cmsMenuDetails = data.menus;
            if ($scope.cmsMenuDetails instanceof Array) {
                $scope.cmsMenuDetails = $scope.cmsMenuDetails;

            } else {
                $scope.cmsMenuDetails = [$scope.cmsMenuDetails];
            }
            if ($scope.cmsMenuDetails != null && $scope.cmsMenuDetails != "" && $scope.cmsMenuDetails.length > 0) {
                $scope.cmsMenuLength = $scope.cmsMenuDetails.length;
            }
        }
        else {
            //$scope.logOut();
        }
    });
    //get submenus based on menu id
    $scope.listSubMenu = function (memberMenu) {
        $scope.cmsSubMenuDetails = [];
        $scope.cmsSubMenuLength = 0;
        $http({
            method: 'GET',
            url: '/unstoppablemarketers/resources/rest/getCMSMemberSubMenuByMenu?menuId=' + memberMenu.id,
            data: $scope.memberSubMenu
        }).success(function (data) {
            if (data.status.status == 200) {
                $scope.cmsSubMenuDetails = data.menus;
                //	$scope.cmsPagesLength=$scope.cmsPagesDetails.length;
                if ($scope.cmsSubMenuDetails instanceof Array) {
                    $scope.cmsSubMenuDetails = $scope.cmsSubMenuDetails;
                } else {
                    $scope.cmsSubMenuDetails = [$scope.cmsSubMenuDetails];
                }
                if ($scope.cmsSubMenuDetails != null && $scope.cmsSubMenuDetails != "" && $scope.cmsSubMenuDetails.length > 0) {
                    $scope.cmsSubMenuLength = $scope.cmsSubMenuDetails.length;
                }
                /*	var i=0;
                 angular.forEach($scope.cmsSubMenuDetails , function(value) {
                 $http({
                 method: 'GET',
                 url: '/unstoppablemarketers/resources/rest/getCMSPagesByMenu?menuId='+cmsSubMenu.id,
                 data:  $scope.memberMenuPages
                 }).success(function (data) {
                 if(data.status.status == 200)
                 {
                 $scope.cmsPagesDetails = data.pages;
                 //	$scope.cmsSubMenuDetails[i].subMenu=data.pages ;
                 }
                 });
                 });*/
            }
        });
    };
    //get pages based on menu id
    $scope.listPage = function (cmsSubMenu) {
        $scope.cmsPagesDetails = [];
        $scope.cmsPagesLength = 0;
        $http({
            method: 'GET',
            url: '/unstoppablemarketers/resources/rest/getCMSPagesByMenu?menuId=' + cmsSubMenu.id,
            data: $scope.memberMenuPages
        }).success(function (data) {
            if (data.status.status == 200) {
                $scope.cmsPagesDetails = data.pages;
                $scope.cmsPagesLength = $scope.cmsPagesDetails.length;
                if ($scope.cmsPagesDetails instanceof Array) {
                    $scope.cmsPagesDetails = $scope.cmsPagesDetails;
                } else {
                    $scope.cmsPagesDetails = [$scope.cmsPagesDetails];
                }
                if ($scope.cmsPagesDetails != null && $scope.cmsPagesDetails != "" && $scope.cmsPagesDetails.length > 0) {
                    $scope.cmsPagesLength = $scope.cmsPagesDetails.length;
                }
            }
        });
    };
    //get level details based on profile
    $scope.getProfileLevel = function () {
        $http({
            method: 'GET',
            url: '/unstoppablemarketers/resources/rest/getLevelContentByID?id=' + $scope.profile.level_id,
            data: $scope.level
        }).success(function (data) {
            if (data.status.status == 200) {
                $scope.profileLevel = data.level;
            }
            else {
                //$scope.logOut();
            }
        });
    };

    if (cookie != null && cookie != '') {
        $scope.checkToken = true;

    }
    else {
        $scope.checkToken = false;
    }
    $scope.getPageDetails = function () {
        $http({
            method: 'GET',
            url: '/unstoppablemarketers/resources/rest/getCMSPageContents?pageId=' + $scope.cmsPageId,
            data: $scope.pageContent
        }).success(function (data) {
            if (data.status.status == 200) {
                $scope.cmsPageDetail = data.pagecontent;
                document.getElementById("CmsPageDesc").innerHTML = data.pagecontent.description;
            }
            else {
                //$scope.logOut();
            }
        });
    };


    $scope.viewPage = function (id) {
        $window.location.href = "/unstoppablemarketers/cms_member_pages.html?viewId=" + id;
    };
    var newURL = window.location.search;
    var aar = newURL.split('=');
    var pageId = aar[aar.length - 1];
    var pageKey = aar[aar.length - 2];
    //set refid in cookie
    if (pageKey == "?viewId" && pageId != "") {
        $scope.cmsPageId = pageId;
        $scope.getPageDetails();
    }
    //searcg filter for firstname,lastname in name wise search for 1st table
    $scope.searchFilter = function (obj) {
        var re = new RegExp($scope.search, 'i');
        return !$scope.search || re.test(obj.user.firstName) || re.test(obj.user.lastName) || re.test(obj.user.firstName + ' ' + obj.user.lastName);
    };
    //name search for 2nd table
    $scope.searchNameFilter = function (obj) {
        var re = new RegExp($scope.searchName, 'i');
        return !$scope.searchName || re.test(obj.user.firstName) || re.test(obj.user.lastName) || re.test(obj.user.firstName + ' ' + obj.user.lastName);
    };
    //name search for 3rd table
    $scope.searchNamesFilter = function (obj) {
        var re = new RegExp($scope.searchNames, 'i');
        return !$scope.searchNames || re.test(obj.user.firstName) || re.test(obj.user.lastName) || re.test(obj.user.firstName + ' ' + obj.user.lastName);
    };
    //name search for 2nd ref table
    $scope.searchrefFilter = function (obj) {
        var re = new RegExp($scope.searchref, 'i');
        return !$scope.searchref || re.test(obj.user.firstName) || re.test(obj.user.lastName) || re.test(obj.user.firstName + ' ' + obj.user.lastName);
    };
    $scope.searchEmailFilter = function (obj) {
        var re = new RegExp($scope.searchEmail, 'i');
        return !$scope.searchEmail || re.test(obj.user.email);
    };

    $("html").addClass("js");
    $.fn.accordion.defaults.container = false;
    $(function () {
        $("#acc3").accordion({initShow: "#current"});
        $("#acc1").accordion({
            el: ".h",
            head: "h4, h5",
            next: "div",
            initShow: "div.outer:eq(1)"
        });
        $("#acc2").accordion({
            obj: "div",
            wrapper: "div",
            el: ".h",
            head: "h4, h5",
            next: "div",
            showMethod: "slideFadeDown",
            hideMethod: "slideFadeUp",
            initShow: "div.shown",
            elToWrap: "sup, img"
        });
        $("html").removeClass("js");
    });
    //--><!]]>
});


app.filter('offset', function () {
    return function (input, start) {
        input = input || '';
        start = parseInt(start, 10);
        return input.slice(start);
    };
});