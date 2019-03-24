angular.module('MusicApp')
  .service('HTTP', ['$q', '$http', HttpService]);

function HttpService($q, $http) {

  return {

    get: function(url) {
      var deferred = $q.defer(); //initiating promise
      $http({
        method: 'GET',
        url: url
      }).then(function successCallback(success) {
        deferred.resolve(success);

      }, function errorCallback(error) {
        this.show_response(success);
        deferred.reject(success);
      });
      return deferred.promise;

    },
    post: function(url, json) {
      var deferred = $q.defer(); //initiating promise
      $http({
        method: 'POST',
        url: url,
        contentType: 'application/json',
        data: json
      }).then(function successCallback(success) {
        deferred.resolve(success);
      }, function errorCallback(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    },
    delete: function(url) {
      var deferred = $q.defer(); //initiating promise
      $http({
        method: 'DELETE',
        url: url,
      }).then(function successCallback(success) {
        deferred.resolve(success);
      }, function errorCallback(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }
  }

}
