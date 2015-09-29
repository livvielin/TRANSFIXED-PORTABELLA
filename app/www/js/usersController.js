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
    var friendEmail = $scope.searchUser.$id;
    var escape = function(email) {
      return encodeURIComponent(email).replace('.', '%2E');
    };
    var myEmail = escape(JSON.parse(window.localStorage['firebase:session::yotempest']).password.email);
    var userRef = new Firebase('https://yotempest.firebaseio.com/users').child(myEmail)
    .child('friends').update({[friendEmail]: $scope.searchUser.deviceToken});
    console.log($scope.friends);
  };
});
