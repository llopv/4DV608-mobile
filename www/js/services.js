angular.module('starter.services', [])

.factory('ServerService', function($http) {
  var baseurl = "http://localhost/";

  return {
    register: function(email, password) {
      return $http.post(baseurl + 'register', {user: {email, password}});
    },
    signRequest: function() {
      console.log('sign');
    },
    uploadSignature: function(signatures) {
      console.log('upload');
    } 
  };
});
