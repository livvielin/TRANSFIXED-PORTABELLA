angular.module('starter.messageController', ['ionic', 'starter.services'])

.controller('MessageController', function ($scope, Message) {

  $scope.sendMessage = function () {
    console.log($scope.message);
    $scope.message = '';
  };
});
