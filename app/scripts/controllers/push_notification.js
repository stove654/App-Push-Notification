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
    $scope.dataPush = {};
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
      $scope.dataPush = {};
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: './views/states/push_notification_modal.html',
        size: 'lg',
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

    $scope.pushNow = function (item) {
      cfpLoadingBar.start();
      var params = item;
      PushNotificationFactory.pushNotification(params).then(function (res) {
        toaster.pop('success', res.message);
        cfpLoadingBar.complete();
      })
    }

    $scope.edit = function (item) {
      $scope.data = {}
      $scope.dataPush = item;
      console.log(item)
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: './views/states/push_notification_modal.html',
        size: 'lg',
        controller: 'ModalPushNotificationCtrl',
        scope: $scope
      });

      modalInstance.result.then(function (params) {
        PushNotificationFactory.pushNotification(params).then(function (res) {
          if(!res.data.$id) {
            list.$add(res.data).then(function (data) {
              toaster.pop('success', res.message);
              cfpLoadingBar.complete();
            });
          } else {
            for (var i = 0; i < $scope.messages.length; i++) {
              if ($scope.messages[i].$id == res.data.$id) {
                $scope.messages[i] = res.data;
                $scope.messages.$save(i);
                cfpLoadingBar.complete();
                break;
              }
            }
          }

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

  .controller('ModalPushNotificationCtrl', function ($scope, $modalInstance, Upload, APP_CONFIG) {
    $scope.$watch('files', function () {
      console.log($scope.files)
      $scope.upload($scope.files);
    });

    $scope.$watch('files1', function () {
      console.log($scope.files1)
      $scope.upload1($scope.files1);
    });

    $scope.upload = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          Upload.upload({
            url: APP_CONFIG.baseUrl + 'images',
            file: file
          }).progress(function (data) {
          }).success(function (data, status, headers, config) {
            $scope.$parent.dataPush.imgIntro = APP_CONFIG.urlImg + $scope.files[0].name;
            console.log('1', data, $scope.urlImage);

          });
        }
      }
    };

    $scope.upload1 = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          Upload.upload({
            url: APP_CONFIG.baseUrl + 'images',
            file: file
          }).progress(function (data) {
          }).success(function (data, status, headers, config) {
            $scope.$parent.dataPush.imgIntro1 = APP_CONFIG.urlImg + $scope.files[0].name;
            console.log('1', data, $scope.urlImage1);

          });
        }
      }
    };

    $scope.ok = function () {
      $modalInstance.close($scope.dataPush);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
