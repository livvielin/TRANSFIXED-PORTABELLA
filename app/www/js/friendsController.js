angular.module('starter.friendsController', ['ionic', 'starter.services'])

.controller('FriendsController', function ($scope, Database, User) {
  $scope.friends = Database;

  $scope.addFriend = function() {
    User.addFriend($scope.friends);
  };
});
