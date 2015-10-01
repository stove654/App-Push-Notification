'use strict';

/**
 * @ngdoc overview
 * @name PushApp
 * @description
 * # PushApp
 *
 * Main module of the application.
 */
angular
  .module('PushApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'toaster'
  ])

  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/main/push_notification");
    //
    // Now set up the states
    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "views/login.html"
      })
      .state('main', {
        url: "/main",
        templateUrl: "views/main.html",
        controller: 'MainCtrl',
        abstract: true
      })
      .state('main.push_notification', {
        url: "/push_notification",
        templateUrl: "views/states/push_notification.html",
        controller: 'PushNotificationCtrl'
      })

    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = $httpProvider.defaults.headers.post['Content-Type'];

  });
