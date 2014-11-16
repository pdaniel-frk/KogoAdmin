
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var projectsService = angular.module('ProjectsService', []);

projectsService.factory('ProjectsService', ['$http', function($http) {

  var projectsApiUrl = '/api/projects';

  return {
    // call to get all projects
    get : function(params) {
      var result = $http.get(
        projectsApiUrl + (params ? '?' + $.param(params) : '')
      );

      // formatting data
      return result.then(function(response){
        return response.data;
      });
    },

    getById : function(id) {
      return this.get(
        {
          conditions: {
            'p.id': id
          }
        })
        .then(function(projects){
          return projects.pop();
        });
    },

    save : function(project) {
      if (project.id) {
        return this.update(project.id, project);
      }

      return this.create(project);
    },

    // call to POST and create a new project
    create : function(project) {
      return $http.post(projectsApiUrl, project)
        .then(function(result) {
          return result.data;
        });
    },

    update: function(id, project) {
      return $http.put(projectsApiUrl + '/' + id, project)
        .then(function(result) {
          return result.data;
        });
    },

    // call to DELETE a project
    delete : function(id) {
      return $http.delete(projectsApiUrl + '/' + id);
    }
  }

}]);
