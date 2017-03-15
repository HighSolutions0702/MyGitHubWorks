cmsModule.controller('cmsCtrl', function ($scope, $http, $location, $window, $cookies) {
    $scope.cmsDetails = [];
    $scope.cmsMenuDetails = [];
    $scope.cmsPageDetails = [];
    $scope.newMenu = {};
    $scope.msg = null;
    $scope.checkVal = false;
    $scope.cmsLength = 0;
    $scope.cmsMenuLength = 0;
    $scope.cmsPageLength = 0;
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

    //Get login users profile details
    $http({
        method: 'GET',
        url: '../resources/rest/getUserProfile?token=' + cookie,
        data: $scope.profile
    }).success(function (data) {
        if (data.status.status === 200) {
            $scope.profile = data.user;
            $scope.affiliatelink = $scope.profile.referralCode;
        }
        else if (data.status.status === 206) {
            $scope.checkVal = true;
            $scope.msg = "No record";
        }
        else {
            $scope.logOut();
        }
    });


    // get CMS Details
    $scope.loadCMS = function () {
        $http({
            method: 'GET',
            url: '/unstoppablemarketers/resources/rest/getCMSContents',
            data: $scope.content
        }).success(function (data) {
            if (data.status.status === 200) {
                $scope.cmsDetails = data.contents;
                if ($scope.cmsDetails instanceof Array) {
                    $scope.cmsDetails = $scope.cmsDetails;
                } else {
                    $scope.cmsDetails = [$scope.cmsDetails];
                }
                if ($scope.cmsDetails !== null && $scope.cmsDetails !== "" && $scope.cmsDetails.length > 0) {
                    $scope.cmsLength = $scope.cmsDetails.length;
                }
            }
            else {
                //$scope.logOut();
            }
        });
    };
    $scope.loadCMS();
    $scope.edit = function (cms) {
        $scope.checkVal = false;
        $scope.cmscontent = cms;
        document.getElementById("editor").style.display = "block";
        document.getElementById("cms_table").style.display = "none";
    };
    //update setting details
    $scope.update = function (cmscontent) {
        document.getElementById("editor").style.display = "none";
        document.getElementById("cms_table").style.display = "block";
        $http({
            method: 'POST',
            url: '/unstoppablemarketers/resources/rest/updateCMSSettings',
            headers: {'Content-Type': 'application/json'},
            data: $scope.cmscontent
        }).success(function (data) {
            if (data.status.status == 200) {
                $scope.userstatus = data.status;
                $scope.checkVal = true;
                $scope.msg = "Saved successfully";
            }
            else if (data.status.status == 204) {
                $scope.checkVal = true;
                $scope.msg = "Value Required";
            }
            else {
                //$scope.logOut();
            }
        });

    };
    //back button
    $scope.back = function () {
        $scope.checkVal = false;
        $scope.visitedMenu = false;
        document.getElementById("editor").style.display = "none";
        document.getElementById("cms_table").style.display = "block";
    };
    //enable div for add new menu
    //back button
    $scope.viewAdd = function () {
        document.getElementById("view_add").style.display = "block";
    };
    //new page
    $scope.addNewPage = function () {
        $scope.visitedPageName = false;
        document.getElementById("editor").style.display = "block";
        document.getElementById("cms_table").style.display = "none";
    };

    //get all menu details
    $scope.loadCMSMenu = function () {
        $scope.cmsMenuLength = 0;
        $scope.cmsMenuDetails = [];
        $http({
            method: 'GET',
            url: '/unstoppablemarketers/resources/rest/getCMSMenu',
            data: $scope.menu
        }).success(function (data) {
            if (data.status.status === 200) {
                $scope.cmsMenuDetails = data.menus;
                if ($scope.cmsMenuDetails instanceof Array) {
                    $scope.cmsMenuDetails = $scope.cmsMenuDetails;
                } else {
                    $scope.cmsMenuDetails = [$scope.cmsMenuDetails];
                }
                if ($scope.cmsMenuDetails !== null && $scope.cmsMenuDetails !== "" && $scope.cmsMenuDetails.length > 0) {
                    $scope.cmsMenuLength = $scope.cmsMenuDetails.length;
                }
            }
            else {
                //$scope.logOut();
            }
        });
    };
    $scope.loadCMSMenu();
    // get All page details
    $scope.loadCMSPage = function () {
        $scope.cmsPageDetails = [];
        $scope.cmsPageLength = 0;
        $http({
            method: 'GET',
            url: '/unstoppablemarketers/resources/rest/getCMSPage',
            data: $scope.menu
        }).success(function (data) {
            if (data.status.status == 200) {
                $scope.cmsPageDetails = data.pages;
                if ($scope.cmsPageDetails instanceof Array) {
                    $scope.cmsPageDetails = $scope.cmsPageDetails;
                } else {
                    $scope.cmsPageDetails = [$scope.cmsPageDetails];
                }
                if ($scope.cmsPageDetails != null && $scope.cmsPageDetails != "" && $scope.cmsPageDetails.length > 0) {
                    $scope.cmsPageLength = $scope.cmsPageDetails.length;
                }
            }
            else {
                //$scope.logOut();
            }
        });
    };
    $scope.loadCMSPage();
    //add new page
    $scope.save = function (newPage) {
        //alert("Selected Menu"+newPage.menu_id);
        if (newPage.title != null && newPage.description != null && newPage.menu_id != null) {
            //alert("Selected Menu"+newPage.menu_id);
            document.getElementById("editor").style.display = "none";
            document.getElementById("cms_table").style.display = "block";
            $http({
                method: 'POST',
                url: '/unstoppablemarketers/resources/rest/addCMSPage',
                headers: {'Content-Type': 'application/json'},
                data: $scope.newPage
            }).success(function (data) {
                if (data.status.status == 200) {
                    $scope.loadCMSPage();
                    $scope.loadCMSMenu();
                    $scope.userstatus = data.status;
                    $scope.checkVal = true;
                    $scope.newPage = "";
                    $scope.msg = "Saved successfully";

                }
                else if (data.status.status == 204) {
                    $scope.checkVal = true;
                    $scope.msg = "Value Required";
                }
                else {
                    //$scope.logOut();
                }
            });
        } else {
            $scope.checkVal = true;
            $scope.msg = "Value Required";
        }
    };
    // add new menu
    $scope.addNewMenu = function (newMenu) {
        if (newMenu.name != null) {
            if (newMenu.parent_id == null) {
                newMenu.parent_id = 0;
            }
            $http({
                method: 'POST',
                url: '/unstoppablemarketers/resources/rest/addCMSMenu',
                headers: {'Content-Type': 'application/json'},
                data: $scope.newMenu
            }).success(function (data) {
                if (data.status.status == 200) {
                    $scope.visitedMenu = false;
                    $scope.loadCMSMenu();
                    $scope.newMenu = "";
                } else {
                    //$scope.logOut();
                }
            });
        } else {
            $scope.checkVal = true;
            $scope.msg = "Value Required";
        }
    };
    // delete a particular page
    $scope.removePage = function (cmspage) {
        var key = confirm("Do you want to remove it ?");
        if (key == true) {
            $scope.checkVal = false;
            $scope.deletepagecontent = cmspage;
            if ($scope.deletepagecontent != null) {
                $http({
                    method: 'POST',
                    url: '/unstoppablemarketers/resources/rest/deletePage',
                    headers: {'Content-Type': 'application/json'},
                    data: $scope.deletepagecontent
                }).success(function (data) {
                    if (data.status.status == 200) {
                        $scope.checkVal = true;
                        $scope.loadCMSPage();
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
    // delete a particular menu
    $scope.removeMenu = function (cmsmenu) {
        var key = confirm("Do you want to remove it ?");
        if (key == true) {
            $scope.checkVal = false;
            $scope.deletemenucontent = cmsmenu;
            if ($scope.deletemenucontent != null) {
                $http({
                    method: 'POST',
                    url: '/unstoppablemarketers/resources/rest/deleteMenu',
                    headers: {'Content-Type': 'application/json'},
                    data: $scope.deletemenucontent
                }).success(function (data) {
                    if (data.status.status == 200) {
                        $scope.checkVal = true;
                        $scope.loadCMSMenu();
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
    // active page
    $scope.activePage = function (cmspage) {
        $scope.checkVal = false;
        $scope.activepagecontent = cmspage;
        if ($scope.activepagecontent != null) {
            $http({
                method: 'POST',
                url: '/unstoppablemarketers/resources/rest/activePage',
                headers: {'Content-Type': 'application/json'},
                data: $scope.activepagecontent
            }).success(function (data) {
                if (data.status.status == 200) {
                    $scope.checkVal = true;
                    $scope.loadCMSPage();
                    $scope.msg = "Successfully Changed";
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
    };
    //active menu
    $scope.activeMenu = function (cmsmenu) {
        $scope.checkVal = false;
        $scope.activemenucontent = cmsmenu;
        if ($scope.activemenucontent != null) {
            $http({
                method: 'POST',
                url: '/unstoppablemarketers/resources/rest/activeMenu',
                headers: {'Content-Type': 'application/json'},
                data: $scope.activemenucontent
            }).success(function (data) {
                if (data.status.status == 200) {
                    $scope.checkVal = true;
                    $scope.loadCMSMenu();
                    $scope.msg = "Successfully Changed";
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
    };
    //edit menu saved
    $scope.editMenuSave = function (editedMenu) {
        $scope.editmenucontent = editedMenu;
        if (editedMenu.name != null) {
            $http({
                method: 'POST',
                url: '/unstoppablemarketers/resources/rest/editMenu',
                headers: {'Content-Type': 'application/json'},
                data: $scope.editmenucontent
            }).success(function (data) {
                if (data.status.status == 200) {
                    document.getElementById("edit_menu").style.display = "none";
                    document.getElementById("cms_table").style.display = "block";
                    $scope.checkVal = true;
                    $scope.msg = "Change Successfully ";
                } else {
                    //$scope.logOut();
                }
            });
        } else {
            $scope.checkVal = true;
            $scope.msg = "Value Required";
        }
    };
    // get page details

    $scope.getPageDetails = function () {
        $http({
            method: 'GET',
            url: '/unstoppablemarketers/resources/rest/getCMSPageContents?pageId=' + $scope.cmsPageContent.id,
            data: $scope.pageContent
        }).success(function (data) {
            if (data.status.status == 200) {
                $scope.cmsPageDetail = data.pagecontent;
            }
            else {
                //$scope.logOut();
            }
        });
    };
    //new page
    $scope.editCmsPage = function (cmspage) {
        $scope.cmsPageContent = cmspage;
        $scope.getPageDetails();
        document.getElementById("editor").style.display = "block";
        document.getElementById("cms_table").style.display = "none";
    };
    //edit menu
    $scope.editMenu = function (cmspage) {
        $scope.editedMenu = cmspage;
        document.getElementById("edit_menu").style.display = "block";
        document.getElementById("cms_table").style.display = "none";
    };
    // back from menu
    $scope.backFromMenu = function () {
        $scope.checkVal = false;
        document.getElementById("edit_menu").style.display = "none";
        document.getElementById("cms_table").style.display = "block";
    };
    // back from popup
    $scope.backFromModel = function () {
        $scope.checkVal = false;
    };
    //add new page
    $scope.updateCmsPage = function (cmsPageDetail) {
        //alert("Selected Menu"+newPage.menu_id);
        if (cmsPageDetail.title != null && cmsPageDetail.description != null) {
            //alert("Selected Menu"+newPage.menu_id);
            document.getElementById("editor").style.display = "none";
            document.getElementById("cms_table").style.display = "block";
            $http({
                method: 'POST',
                url: '/unstoppablemarketers/resources/rest/updateCMSPage?pageId=' + $scope.cmsPageContent.id,
                headers: {'Content-Type': 'application/json'},
                data: $scope.cmsPageDetail
            }).success(function (data) {
                if (data.status.status == 200) {
                    $scope.loadCMSPage();
                    $scope.loadCMSMenu();
                    $scope.userstatus = data.status;
                    $scope.checkVal = true;
                    $scope.newPage = "";
                    $scope.msg = "Saved successfully";

                }
                else if (data.status.status == 204) {
                    $scope.checkVal = true;
                    $scope.msg = "Value Required";
                }
                else {
                    //$scope.logOut();
                }
            });
        } else {
            $scope.checkVal = true;
            $scope.msg = "Value Required";
        }
    };

});