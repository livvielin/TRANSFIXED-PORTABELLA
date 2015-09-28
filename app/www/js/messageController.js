angular.module('starter.messageController', ['ionic', 'starter.services'])

.controller('MessageController', function ($scope, Message) {

  $scope.sendMessage = function () {
    Message.sendMessage($scope.message, $scope.token);
    $scope.message = '';
  };
});
