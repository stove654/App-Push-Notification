'use strict';

/**
 * @ngdoc function
 * @name PushApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the PushApp
 */
angular.module('PushApp')
  .controller('PushNotificationCtrl', function ($scope, $modal, PushNotificationFactory, toaster) {

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

        PushNotificationFactory.pushNotification(params).then(function (res) {
          toaster.pop('success', res.message);

          console.log(res);
        }, function (err) {

        })

      }, function () {

      });
    };
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
