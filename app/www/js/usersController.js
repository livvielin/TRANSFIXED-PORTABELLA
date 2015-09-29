angular.module('starter.usersController', ['ionic', 'starter.services'])

.controller('UsersController', function ($scope, Database, User) {
  $scope.friends = Database;

  $scope.inputs = {
    email: null
  };

  $scope.fetchUserByEmail = function() {
    console.log($scope);
    User.fetchUserByEmail($scope.inputs.email);
  };

  $scope.addFriend = function() {
    console.log($scope.friends);
    User.addFriend($scope.friends);
  };
});
