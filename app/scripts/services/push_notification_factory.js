'use strict';

/**
 * @ngdoc function
 * @name PushApp.services:PushNotificationFactory
 * @description
 * # authenticate
 * Controller of the PushApp
 */
angular.module('PushApp')
  .factory('PushNotificationFactory', function (APP_CONFIG, $http) {

    var api = {};
    var url = {
      pushNotification: 'push'
    };

    api.pushNotification = function (params) {
      return $http.post(APP_CONFIG.baseUrl + url.pushNotification, params).then(function(data) {
        return data.data;
      });
    };

    return api;
  });