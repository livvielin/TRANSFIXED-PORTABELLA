angular.module('starter.usersController', ['ionic', 'starter.services'])

.controller('UsersController', function ($scope, $rootScope, Database, User) {
  $scope.friends = Database;

  $scope.inputs = {
    email: null
  };

  $scope.fetchUserByEmail = function() {
    console.log($rootScope);
    var searchResult = User.fetchUserByEmail($scope.inputs.email);
    if (searchResult) {
      $scope.notFound = false;
      $scope.identified = true;
      $scope.searchUser = searchResult;
    } else {
      $scope.identified = false;
      $scope.notFound = true;
    }
    console.log($rootScope.userEmail);
  };

  $scope.addFriend = function() {
    console.log($scope.friends);
    User.addFriend($scope.friends);
  };
});
