angular.module('starter.messageController', ['ionic', 'starter.services'])

.controller('MessageController', function ($scope, Message, Database, User) {


  $scope.sendMessage = function() {
    Message.sendMessage($scope.message, $scope.token);
    $scope.message = '';
  };

  // $scope.friends = Database;

  // Temporary friends array
  $scope.friends = [
    {'name': 'Juana', 'checked': false},
    {'name': 'Alex', 'checked': false},
    {'name': 'Livvie', 'checked': false}
  ];

  $scope.addFriend = function () {
    User.addFriend($scope.friends);
  };

  // Check if at least one friend selected
  $scope.isFriendChecked = function () {
    for (var i = 0; i < $scope.friends.length; i++) {
      if ($scope.friends[i].checked) {
        return true;
      }
    }
    return false;
  };

});
