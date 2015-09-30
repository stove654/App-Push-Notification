'use strict';

/**
 * @ngdoc function
 * @name quikiePrototypeAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the quikiePrototypeAdminApp
 */
angular.module('quikiePrototypeAdminApp')
  .controller('PushNotificationCtrl', function ($scope, $modal) {

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

      modalInstance.result.then(function () {
      }, function () {

      });
    };
  })

  .controller('ModalPushNotificationCtrl', function ($scope, $modalInstance) {

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
