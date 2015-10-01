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
    baseUrl: 'http://localhost:8080/api/'
  });