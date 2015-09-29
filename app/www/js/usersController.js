angular.module('starter.usersController', ['ionic', 'starter.services'])

.controller('UsersController', function ($scope, $rootScope, Database, User) {
  $scope.friends = Database;

  $scope.inputs = {
    email: null
  };

  $scope.fetchUserByEmail = function() {
    var searchResult = User.fetchUserByEmail($scope.inputs.email);
    if (searchResult) {
      $scope.notFound = false;
      $scope.identified = true;
      $scope.searchUser = searchResult;
    } else {
      $scope.identified = false;
      $scope.notFound = true;
    }
  };

  //
  $scope.addFriend = function() {
    var email = $scope.searchUser.$id;
    var userRef = new Firebase('https://yotempest.firebaseio.com/users').child($rootScope.userEmail)
    .child('friends').set({[email]: $scope.searchUser.deviceToken});
    console.log($scope.friends);
  };
});
