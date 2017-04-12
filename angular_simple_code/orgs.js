angular.module('orgs', [
  'ngResource',
  'orgDataHelper',
  'orgs.directives',
])
.factory('Org', function($cacheFactory, $location, $resource, APIs, OrgDataHelper, Resource) {

  var API = APIs.orgs + "/";
  var $httpCache = $cacheFactory.get('$http');
  var Org = $resource(
    '/'+API+':id',
    {},
    {
      categories: {
        isArray: true,
        cache: $httpCache,
        method: 'GET',
        url: API+':id/categories',
      },
      getOrgData: {
        isArray: true,
        method: 'GET',
        url: API+':id/orgData',
        // NOTE: Angular isn't transforming to a different Object (OrgData) so need to do that manually
      },
      query: {
        isArray:true,
        cache: $httpCache,
        method:'GET',
      },
      resources: {
        isArray: true,
        method: 'GET',
        url: API+':id/resources',
        transformResponse: function(data, headersGetter, status) {
          if (status === 200) {
            return Resource.prepareAll(angular.fromJson(data));
          }
          return data;
        },
      },
      patch: {
        method:'PATCH',
        params:{ id: '@id' },
      },
      addResource: {
        method:'PUT',
        params: { id: '@id' },
        url: API+':id/resources',
      },
      addUserRole: {
        method:'PUT',
        params: { id: '@id' },
        url: API+':id/addUserRole',
      },
      addOrgData: {
        method:'PUT',
        params: { id: '@id'},
        url: API+':id/orgData',
      },
      removeOrgData: {
        method:'PUT',
        params: { id: '@id'},
        url: API+':id/removeOrgData',
      },
      removeUserRole: {
        method:'PUT',
        params: { id: '@id' },
        url: API+':id/removeUserRole',
      },
      removeMember: {
        method:'PUT',
        params: { id: '@id' },
        url: API+':id/removeMember',
      },
      updateResources: {
        isArray: true,
        method: 'PUT',
        params: { id: '@id' },
        url: API+':id/resources/update',
      },
    }
  );

  /*
  * CLASS methods
  */
  Org.create = function() {
    return new Org({
      active: true,
      org_type: 'incubator',
      privacy_level: 'private',
    });
  };

  Org.sortResultsBySelected = function(results, org_id) {
    return _.sortBy(results, function(org) { return +org.id !== +org_id; });
  };

  /*
  * INSTANCE methods
  */
  Org.prototype.addOrgData = function(org_data) {
    return Org.addOrgData({id: this.id, org_data: org_data.saveableData()}).$promise;
  };

  Org.prototype.addResource = function(resource) {
    return Org.addResource({id: this.id, resource: resource}).$promise;
  };

  Org.prototype.addUserRole = function(user, role) {
    return Org.addUserRole(
      { id:this.id, user_id: user.id, role_name: role },
      function(result) {}
    );
  };

  Org.prototype.adminUrl = function() {
    return "/admin/organizations/" + this.id;
  };

  Org.prototype.cancel = function() {
    this.edit = false;
    return this;
  };

  Org.prototype.create = function($scope) {
    if (!this.valid()) {
      console.log('TODO: invalid');
      return;
    }
    var _this = this;
    var uploader = this.uploader;
    delete this.uploader; // Delete on create only due to circular reference
    Org.save(this, function(org) {
      $scope.org = _this = org;
      // HACK! Short-term hack to set the right ID for newly created org logo
      uploader.onBeforeUploadItem = function(item) {
        item.formData = [{
          id: org.id,
        }];
      };
      if (uploader.queue.length > 0) {
        uploader.queue[0].upload();
      }
      $location.path(_this.adminUrl());
    });
    return _this;
  };

  Org.prototype.doEdit = function() {
    this.edit = true;
    return this;
  };

  Org.prototype.edited = function() {
    if (!this.valid()) {
      console.log('TODO: invalid');
      return;
    }
    // If queue, upload first, then save
    if (this.uploader.queue.length > 0) {
      this.uploader.queue[0].upload();
    }
    else {
      this.edit = false;
      this.patch( this.saveableData(), function() {
      });
    }
  };

  Org.prototype.getResources = function(params) {
    return Org.resources(_.extend(params, {id: this.id}));
  };

  Org.prototype.lookup = function(key, interpolations) {

    return OrgDataHelper.lookup(this, key, interpolations);
  };

  Org.prototype.lookupBoolean = function(key) {
    return OrgDataHelper.lookupBoolean(this, key);
  };

  Org.prototype.patch = function(opts, success, failure) {
    return Org.patch( opts, success, failure );
  };

  Org.prototype.removeMember = function(user) {
    return Org.removeMember(
      { id:this.id, user_id: user.id },
      function(result) {}
    );
  };

  Org.prototype.removeOrgData = function(org_data) {
    return Org.removeOrgData({id: this.id, org_data: { id: org_data.id }}).$promise;
  };

  Org.prototype.removeUserRole = function(user, role) {
    return Org.removeUserRole(
      { id:this.id, user_id: user.id, role_name: role },
      function(result) {}
    );
  };

  Org.prototype.saveableData = function() {
    return {
      id: this.id,
      active: this.active,
      canonical_name: this.canonical_name,
      community_title: this.community_title,
      name: this.name,
      org_type: this.org_type,
      privacy_level: this.privacy_level,
      short_name: this.short_name,
      swatch_highlight: this.swatch_highlight,
    };
  };

  Org.prototype.updateResources = function(resources) {
    return Org.updateResources({id: this.id, resources: resources}).$promise;
  };

  Org.prototype.valid = function() {
    return (this.name && this.name.trim().length > 0 &&
      this.short_name && this.short_name.trim().length > 0 &&
      this.canonical_name && this.canonical_name.trim().length > 0
    );
  };

  return Org;
});
