angular.module('orgs.directives', [])
.directive('orgsForm', function($interpolate, $location, $rootScope, $timeout, APIs, Constants, Data, Errors, FileUploader, Listens) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      org: '=',
    },
    templateUrl:'orgs/_form.html',
    compile: function() {
      return {
        pre: function(scope, element, attrs) {
          scope.uploader_alias = 'logo_pic';
          scope.uploader_url = APIs.orgs + "/update";
          scope.uploader = setupUploader($interpolate, scope, Constants, Data, Errors, FileUploader, Listens);

          $timeout(function() {
            scope.$emit(Listens.setUploader, { uploader: scope.uploader });
          });

          scope.uploader.onBeforeUploadItem = function(item) {
            item.formData = [{
              id: scope.org.id,
            }];
          };

          scope.Data = Data;
          scope.org.uploader = scope.uploader;
        },
        // link
        post: function(scope, element, attrs) {

          var setUploader = $rootScope.$on(Listens.setUploader, function(event, params) {
            scope.uploader = params.uploader;
            scope.uploader.onSuccessItem = function(item, response, status, headers) {
              // update org's logo pic
              scope.org.logo_pic_url = response.logo_pic_url;
              scope.org.logo_pic_file_name = response.logo_pic_file_name;
              scope.org.logo_pic_file_size = response.logo_pic_file_size;
              scope.org.logo_pic_updated_at = response.logo_pic_updated_at;
            };

            scope.uploader.onCompleteAll = function(item, response, status, headers) {
              if (scope.org.uploader) {
                scope.org.edited();
              }
            };
          });

          // unsubscribe to $on events
          scope.$on('$destroy', function() { setUploader(); });
        }
      };
    }
  };
})
.directive('orgsTableCard', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      org: '=',
    },
    templateUrl:'orgs/_table_card.html',
  }
})
;
