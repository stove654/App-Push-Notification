'use strict';

/**
 * @ngdoc function
 * @name PushApp.config:APP_CONFIG
 * @description
 * # APP_CONFIG
 * Controller of the PushApp
 */
angular.module('PushApp')
  .constant('APP_CONFIG', {
    baseUrl: 'http://128.199.229.213:8080/api/',
    fireBaseUrl: 'https://incandescent-fire-5015.firebaseio.com/'
  });