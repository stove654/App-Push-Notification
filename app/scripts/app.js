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
    'toaster',
    'LocalStorageModule',
    'firebase',
    'chieffancypants.loadingBar'
  ])

  .run(function ($rootScope, $state, $location, SessionService) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

      var shouldLogin = toState.data !== undefined
        && toState.data.requireLogin
        && !SessionService.isToken().isLoggedIn ;

      // NOT authenticated - wants any private stuff
      if(shouldLogin)
      {
        $state.go('login');
        event.preventDefault();
        return;
      }

      // authenticated (previously) comming not to root main
      if(SessionService.isToken().isLoggedIn)
      {
        var shouldGoToMain = fromState.name === ""
          && toState.name !== "main.push_notification" ;
        return;
      }

    });
  })

  .config(function($stateProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/main/push_notification");
    //
    // Now set up the states
    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
        controller: 'LoginCtrl'
      })
      .state('main', {
        url: "/main",
        templateUrl: "views/main.html",
        controller: 'MainCtrl',
        abstract: true,
        data : {requireLogin : true }
      })
      .state('main.push_notification', {
        url: "/push_notification",
        templateUrl: "views/states/push_notification.html",
        controller: 'PushNotificationCtrl',
        data : {requireLogin : true }
      })

    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = $httpProvider.defaults.headers.post['Content-Type'];
    cfpLoadingBarProvider.includeBar = true;
  });
