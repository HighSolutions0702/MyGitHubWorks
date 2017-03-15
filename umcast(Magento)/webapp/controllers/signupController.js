app.controller('signupCtrl', function ($scope, $http, $location, $cookies, $window) {
    $scope.checkToken = false;
    $scope.phoneLength = false;
    $scope.user = {};
    $scope.regUser = {};
    $scope.menuDetails = [];
    $scope.menu = {};
    $scope.regUserid = '';
    $scope.regamount = '';
    $scope.onlyNumbers = /^\d+$/;
    $scope.onlyNos = /^\d+$/;
    $scope.cmsPagesLength = 0;
    $scope.cmsSubMenusLength = 0;
    //get session cookie
    var cookie = '';
    var ref = '';
    var userId = '';
    var vals = document.cookie.split(';');
    for (i = 0; i < vals.length; i++) {
        var val = vals[i].split('=');
        if (val[0].trim() == "userToken") {
            cookie = val[val.length - 1];
        }
        if (val[0].trim() == "ref") {
            ref = val[val.length - 1];
        }
        if (val[0].trim() == "userid") {
            userId = val[val.length - 1];
            $scope.regUserid = userId;
        }
        if (val[0].trim() == "levelamount") {
            userId = val[val.length - 1];
            $scope.regamount = userId;
        }
    }

    //load refid from url
    var newURL = window.location.search;
    var aarr = newURL.split('=');
    var id = aarr[aarr.length - 1];
    var key = aarr[aarr.length - 2];
    //set refid in cookie
    if (key == "?ref" && id != "") {
        var a = new Date();
        a = new Date(a.getTime() + 1000 * 60 * 60 * 24);
        document.cookie = "ref = " + id + "; expires= " + a.toUTCString() + "; path=/";
        $scope.user.ref = id;
    } else if (ref != "") {
        //get refid from cookie
        $scope.user.ref = ref;
    }

//	logout function
    $scope.logOut = function () {
        document.cookie = 'userToken= ' + ' ' + ' ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        $scope.checkToken = false;
        $window.location.href = "/login.html";
    };

    //Get login users profile details
    $scope.userProfile = function () {
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
    };

    if (cookie != null && cookie != '') {
        $scope.checkToken = true;
        $scope.userProfile();
    }
    else {
        $scope.checkToken = false;
    }
    $scope.msg = null;
    $scope.checkVal = false;
    $http({
        method: 'GET',
        url: 'resources/rest/getCountries',
        data: $scope.countries
    }).success(function (data) {

        $scope.countryItems = data.countries;
        //$scope.countryItems =[{"countryId":"1","countryName":"Afghanistan"},{"countryId":"2","countryName":"Albania"},{"countryId":"3","countryName":"Albania"},{"countryId":"4","countryName":"Andorra"},{"countryId":"5","countryName":"Antigua and Barbuda"}];
    });

    $scope.showSubscribe = function () {
        $scope.phoneLength = false;
        if ($scope.user.firstName != null && $scope.user.firstName != ''
            && $scope.user.lastName != null && $scope.user.lastName != ''
            && $scope.user.emailAddress != null && $scope.user.emailAddress != '') {
            var flag = 0;
            if ($scope.user.phone != null && $scope.user.phone != '') {
                flag = ($scope.user.phone.length == 10) ? 0 : 1;
            }
            if (flag == 0) {
                document.getElementById('subscribtion_div').style.display = "block";
                document.getElementById('signup_div').style.display = "none";
            } else {
                $scope.checkVal = true;
                $scope.phoneLength = true;
                $scope.msg = "Please enter 10 digit Number";
            }
        }
        else {
            $scope.checkVal = true;
            $scope.msg = "Please fill all required fields";
        }
    };
    $scope.showCreditCardPayment = function (menu) {
        $scope.user.level_id = menu.level_id.levelId;

        //set subscribe amount for paypal
        $scope.levelamt = menu.level_id.amount;
        document.getElementById('subscribtion_div').style.display = "none";
        document.getElementById('credit_card_div').style.display = "block";
    };

    $scope.signUp = function () {
        var cardType = $scope.form.cardType.$viewValue;
        var cardNo = $scope.form.cardNo.$viewValue;
        var cardName = $scope.form.cardName.$viewValue;
        var cardCvv = $scope.form.cvv.$viewValue;
        var expMon = $scope.form.expMonth.$viewValue;
        var expYr = $scope.form.expYear.$viewValue;
        $scope.cvvLength = false;
        $scope.cardNoLen = false;
        $scope.checkCard = false;
        var cvvFlag = 0;
        var cardNoFlag = 0;
        if (cardNo != null && cardNo != '') {
            cardNoFlag = ((cardNo.length == 15) || (cardNo.length == 16)) ? 0 : 1;
        }
        if (cardNoFlag == 1) {
            $scope.cardNoLen = true;
            $scope.msg = "15/16 digits required";
        }
        if (cardCvv != null && cardCvv != '') {
            cvvFlag = ((cardCvv.length == 3) || (cardCvv.length == 4)) ? 0 : 1;
        }
        if (cvvFlag == 1) {
            $scope.cvvLength = true;
            $scope.msg = "Cvv 3/4 digits required";
        }
        var a = new Date();
        a = new Date(a.getTime() + 1000 * 60 * 60 * 24);
        document.cookie = "levelamount = " + $scope.levelamt + "; expires= " + a.toUTCString() + "; path=/";

        if ((cardType != null && cardType != '') && (cardNo != null && cardNo != '') && (cardName != null && cardName != '') && (expMon != null && expMon != '') && (expYr != null && expYr != '')) {
            $http({
                method: 'POST',
                url: 'resources/rest/register',
                headers: {'Content-Type': 'application/json'},
                data: $scope.user
            })
                .success(function (data) {
                    $scope.status = data.status;
                    if ($scope.status.status == 200) {
                        $scope.regUser = data.user;
                        //	$cookies.userid=$scope.regUser.id;
                        var a = new Date();
                        a = new Date(a.getTime() + 1000 * 60 * 60 * 24);
                        document.cookie = "userid = " + $scope.regUser.id + "; expires= " + a.toUTCString() + "; path=/";
                        $window.location.href = "signupsuccess.html";
                    }
                    else if ($scope.status.status == 401) {
                        $scope.checkVal = true;
                        $scope.msg = "Register Failed";
                        document.getElementById('signup_div').style.display = "block";
                        document.getElementById('subscribtion_div').style.display = "none";
                    }
                    else if ($scope.status.status == 409) {
                        $scope.checkVal = true;
                        $scope.msg = "Email id already exist";
                        document.getElementById('signup_div').style.display = "block";
                        document.getElementById('subscribtion_div').style.display = "none";
                    }
                    else if ($scope.status.status == 204) {
                        $scope.checkCreditCard = true;
                        $scope.cardMsg = "Invaild Credit Card Inforamtion";
                        document.getElementById('signup_div').style.display = "none";
                        document.getElementById('subscribtion_div').style.display = "none";
                        document.getElementById('credit_card_div').style.display = "block";
                    }
                    else {
                        //	$scope.msg="Email id already exist";
                    }
                });
        }
        else {
            $scope.checkCard = true;
            $scope.checkMsg = "All fields are required";
        }
    };
    $scope.goBack = function () {
        document.getElementById('signup_div').style.display = "block";
        document.getElementById('subscribtion_div').style.display = "none";
        document.getElementById('credit_card_div').style.display = "none";
    };
    //chack menu active
    $scope.isActive = function (viewLocation) {
        var patharr = window.location.pathname.split("/");
        var active = (viewLocation === patharr[patharr.length - 1]);
        return active;
    };

    function DropDown(el) {
        this.dd = el;
        this.initEvents();
        if (cookie != null && cookie != '') {
            $scope.userProfile();
        }
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
    //get home cms
    $http({
        method: 'GET',
        url: 'resources/rest/getCMSContentByID?id=1',
        data: $scope.contenthome
    }).success(function (data) {
        if (data.status.status == 200) {
            $scope.cmsContent = data.content;
            document.getElementById("HomeCMS").innerHTML = data.content.description;
        }
    });
    //get aboutus cms
    $http({
        method: 'GET',
        url: 'resources/rest/getCMSContentByID?id=2',
        data: $scope.contentabout
    }).success(function (data) {
        if (data.status.status == 200) {
            $scope.cmsContent = data.content;
            document.getElementById("AboutusCMS").innerHTML = data.content.description;
        }
    });
    //get contactus cms
    $http({
        method: 'GET',
        url: 'resources/rest/getCMSContentByID?id=7',
        data: $scope.contentabout
    }).success(function (data) {
        if (data.status.status == 200) {
            $scope.cmsContent = data.content;
            document.getElementById("ContactusCMS").innerHTML = data.content.description;
        }
    });
    //get all levels
    $http({
        method: 'GET',
        url: 'resources/rest/getMenuSettings',
        data: $scope.menus
    }).success(function (data) {

        if (data.status.status == 200) {
            $scope.menuDetails = data.menus;
            if ($scope.menuDetails instanceof Array) {
                $scope.menuDetails = $scope.menuDetails;
            } else {
                $scope.menuDetails = [$scope.menuDetails];
            }
            $scope.menu = $scope.menuDetails[0];          // get a first level
        }
        else if (data.status.status == 206) {
            $scope.checkVal = true;
            $scope.msg = "No record";
        }
        else {
            //$scope.logOut();
        }
    });
    // get user details for paypal
    $http({
        method: 'GET',
        url: 'resources/rest/getUserById?id=' + $scope.regUserid,
        data: $scope.regUser
    }).success(function (data) {
        //alert(data.status.status);
        if (data.status.status == 200) {
            $scope.regUser = data.user;
        }

    });

    $scope.paypalSucess = function () {
        if ($scope.regUserid != null && $scope.regUserid != "") {
            $http({
                method: 'GET',
                url: 'resources/rest/setPayment?id=' + $scope.regUserid,
                data: $scope.regUser
            }).success(function (data) {
                if (data.status.status == 200) {
                    $scope.regUserid = "";
                    $scope.regamount = "";
                    document.cookie = 'userid= ' + ' ' + ' ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
                    document.cookie = 'levelamount= ' + ' ' + ' ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
                }

            });
        }
    };

    $scope.paypalCancel = function () {
        if ($scope.regUserid != null && $scope.regUserid != "") {
            $http({
                method: 'GET',
                url: 'resources/rest/removePayment?id=' + $scope.regUserid,
                data: $scope.regUser
            }).success(function (data) {
                if (data.status.status == 200) {
                    $scope.regUserid = "";
                    $scope.regamount = "";
                    document.cookie = 'userid= ' + ' ' + ' ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
                    document.cookie = 'levelamount= ' + ' ' + ' ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
                }

            });
        }
    };
//	getCMSMenuOfGuestuser
    $http({
        method: 'GET',
        url: 'resources/rest/getCMSMenuOfGuest',
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
    $scope.listSubMenus = function (cmsMenu) {
        alert(cmsMenu.id);
        $scope.cmsSubMenuDetails = [];
        $http({
            method: 'GET',
            url: 'resources/rest/getSubMenusByParentMenu?menuId=' + cmsMenu.id,
            data: $scope.subMenuList
        }).success(function (data) {
            if (data.status.status == 200) {
                $scope.cmsSubMenuDetails = data.menus;
                if ($scope.cmsSubMenuDetails instanceof Array) {
                    $scope.cmsSubMenuDetails = $scope.cmsSubMenuDetails;
                } else {
                    $scope.cmsSubMenuDetails = [$scope.cmsSubMenuDetails];
                }
                if ($scope.cmsSubMenuDetails != null && $scope.cmsSubMenuDetails != "" && $scope.cmsSubMenuDetails.length > 0) {
                    $scope.cmsSubMenusLength = $scope.cmsSubMenuDetails.length;
                    alert($scope.cmsSubMenusLength);
                }
                /*var i=0;
                 angular.forEach($scope.cmsSubMenuDetails , function(value) {
                 $http({
                 method: 'GET',
                 url: 'resources/rest/getCMSPagesByMenu?menuId='+value.id,
                 data:  $scope.childMenuList
                 }).success(function (data) {
                 if(data.status.status == 200)
                 {
                 $scope.cmsPagesDetails = data.pages;
                 $scope.cmsSubMenuDetails[i].subMenu=data.pages ;
                 }
                 });
                 });*/
            }
            else if (data.status.status == 206) {
                $http({
                    method: 'GET',
                    url: 'resources/rest/getCMSPagesByMenu?menuId=' + cmsMenu.id,
                    data: $scope.childMenuList
                }).success(function (data) {
                    if (data.status.status == 200) {
                        $scope.cmsPagesDetails = data.pages;
                        //$scope.cmsSubMenuDetails[i].subMenu=data.pages ;
                    }
                });
            }
            else {

            }

        });
    };
    //get pages based on menu id
    $scope.listPage = function (cmsSubMenu) {
        $scope.cmsPagesDetails = [];
        $http({
            method: 'GET',
            url: 'resources/rest/getCMSPagesByMenu?menuId=' + cmsSubMenu.id,
            data: $scope.pageList
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
    $scope.getPageDetails = function () {
        $http({
            method: 'GET',
            url: 'resources/rest/getCMSPageContents?pageId=' + $scope.cmsPageId,
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
    $scope.viewPage = function (cmsPages) {
        $window.location.href = "cmspages.html?viewId=" + cmsPages.id;
    };
    var pageURL = window.location.search;
    var aar = newURL.split('=');
    var pageId = aar[aar.length - 1];
    var pageKey = aar[aar.length - 2];
    //set refid in cookie
    if (pageKey == "?viewId" && pageId != "") {
        $scope.cmsPageId = pageId;
        $scope.getPageDetails();
    }

    //get Business cms
    $http({
        method: 'GET',
        url: 'resources/rest/getCMSContentByID?id=3',
        data: $scope.contentabout
    }).success(function (data) {
        if (data.status.status == 200) {
            $scope.cmsContent = data.content;
            document.getElementById("BusinessCMS").innerHTML = data.content.description;
        }
    });

    //get Product cms
    $http({
        method: 'GET',
        url: 'resources/rest/getCMSContentByID?id=4',
        data: $scope.contentabout
    }).success(function (data) {
        if (data.status.status == 200) {
            $scope.cmsContent = data.content;
            document.getElementById("ProductCMS").innerHTML = data.content.description;
        }
    });
    //get Refund cms
    $http({
        method: 'GET',
        url: 'resources/rest/getCMSContentByID?id=5',
        data: $scope.contentabout
    }).success(function (data) {
        if (data.status.status == 200) {
            $scope.cmsContent = data.content;
            document.getElementById("RefundCMS").innerHTML = data.content.description;
        }
    });
    //get Terms cms
    $http({
        method: 'GET',
        url: 'resources/rest/getCMSContentByID?id=6',
        data: $scope.contentabout
    }).success(function (data) {
        if (data.status.status == 200) {
            $scope.cmsContent = data.content;
            document.getElementById("TermsCMS").innerHTML = data.content.description;
        }
    });
    $scope.uploadCheck = function () {
        if (cookie != null && cookie != '') {
            $window.location.href = "/video/videoupload.html";
        }
        else {
            $window.location.href = "/login.html";
        }
    };
});
app.directive('checkmail', function () {
    return { require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.form.emailAddress.$viewValue;
                ctrl.$setValidity('noMatch', !noMatch);
            });
        }
    };

});


