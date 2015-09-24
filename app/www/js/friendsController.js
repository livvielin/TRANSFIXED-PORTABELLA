angular.module('starter.friendsController', ['ionic', 'starter.services'])

.controller('FriendsController', function ($scope, Friends, User) {
  $scope.friends = Friends;

  $scope.addFriend = function() {
    User.addFriend($scope.friends);
  };
});
