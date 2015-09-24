angular.module('starter.friendsController', ['ionic', 'starter.services'])

.controller('FriendsController', function ($scope, User) {
  $scope.friends = User.friends;
});
