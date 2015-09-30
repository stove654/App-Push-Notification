'use strict';

/**
 * @ngdoc overview
 * @name quikiePrototypeAdminApp
 * @description
 * # quikiePrototypeAdminApp
 *
 * Main module of the application.
 */
angular
  .module('quikiePrototypeAdminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap'
  ])

  .config(function($stateProvider, $urlRouterProvider) {
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
  });
