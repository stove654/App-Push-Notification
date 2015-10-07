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
    var rooms = $firebaseArray(new Firebase(APP_CONFIG.fireBaseUrl + 'rooms'));

    $scope.messages = list;
    $scope.rooms = rooms;
    $scope.totalItems = 64;
    $scope.currentPage = 4;
    $scope.data = {};
    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

    $scope.selectedRoom = function (item) {
      console.log(item);
    }

    $scope.open = function (size) {
      $scope.data = {}
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: './views/states/push_notification_modal.html',
        size: 'md',
        controller: 'ModalPushNotificationCtrl',
        scope: $scope
      });

      modalInstance.result.then(function (params) {
        cfpLoadingBar.start();
        $scope.data.room = JSON.parse($scope.data.room);
        params.createAt = new Date();
        params.roomId = $scope.data.room.$id;
        params.roomName = $scope.data.room.name;
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
      console.log($scope.data.room)
      $modalInstance.dismiss('cancel');
    };
  });
