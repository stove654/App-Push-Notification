'use strict';

/**
 * @ngdoc function
 * @name PushApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the PushApp
 */
angular.module('PushApp')
  .controller('PushNotificationCtrl', function ($scope, $modal, PushNotificationFactory, toaster, $firebaseArray, APP_CONFIG, cfpLoadingBar) {

    var list = $firebaseArray(new Firebase(APP_CONFIG.fireBaseUrl + 'news'));

    $scope.messages = list;
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: './views/states/push_notification_modal.html',
        size: 'md',
        controller: 'ModalPushNotificationCtrl'
      });

      modalInstance.result.then(function (params) {
        cfpLoadingBar.start();
        params.createAt = new Date();
        PushNotificationFactory.pushNotification(params).then(function (res) {
          list.$add(res.data).then(function (data) {
            toaster.pop('success', res.message);
            cfpLoadingBar.complete();
          });
        }, function (err) {

        })

      }, function () {

      });
    };

    $scope.removeMessage = function (item) {
      cfpLoadingBar.start();
      list.$remove(item).then(function () {
        toaster.pop('success', 'Deleted message');
        cfpLoadingBar.complete();
      });
    }

  })

  .controller('ModalPushNotificationCtrl', function ($scope, $modalInstance) {
    $scope.dataPush = {};

    $scope.ok = function () {
      $modalInstance.close($scope.dataPush);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
