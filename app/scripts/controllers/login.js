'use strict';

/**
 * @ngdoc function
 * @name PushApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the PushApp
 */
angular.module('PushApp')
  .controller('LoginCtrl', function ($scope, APP_CONFIG, localStorageService, $state, cfpLoadingBar) {

    var ref = new Firebase(APP_CONFIG.fireBaseUrl);

    $scope.user = {
      email: 'loi@hottab.net',
      password: 'vanloi'
    };

    $scope.login = function () {
      cfpLoadingBar.start();
      var user = angular.copy($scope.user);
      ref.authWithPassword(user, function(error, userData) {
         if (error) {
           console.log("Error user:", error);
         } else {
           localStorageService.set('user', userData);
           $state.go('main.push_notification');
           console.log("Successfully created user account with uid:", userData);
         }
        cfpLoadingBar.complete();
       });
    };

    $scope.loginFacebook = function () {
      ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Authentication Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          localStorageService.set('user', authData);
          $state.go('main.push_notification');
        }
      });
    }

    $scope.loginGoogle = function () {
      ref.authWithOAuthPopup("google", function(error, authData) {
        if (error) {
          console.log("Authentication Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          localStorageService.set('user', authData);
          $state.go('main.push_notification');
        }
      });
    }


  });
