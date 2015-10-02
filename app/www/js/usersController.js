angular.module('starter.usersController', ['ionic', 'starter.services'])

.controller('UsersController', function ($scope, $state, User) {

  $scope.inputs = {
    email: null
  };

  var domain = '@yotempest.com';

  $scope.fetchUserByEmail = function() {
    var searchEmail = ($scope.inputs.email + domain).toLowerCase();
    var searchResult = User.fetchUserByEmail(searchEmail);
    if (searchResult) {
      $scope.notFound = false;
      $scope.identified = true;
      $scope.added = false;
      $scope.searchUser = searchResult;
      $scope.username = $scope.inputs.email;
    } else {
      $scope.identified = false;
      $scope.notFound = true;
      $scope.added = false;
    }
  };

  $scope.addFriend = function() {
    var friendEmail = $scope.searchUser.$id;
    var escape = function(email) {
      return encodeURIComponent(email).replace('.', '%2E');
    };
    var myEmail = escape(JSON.parse(window.localStorage['firebase:session::yotempest']).password.email);
    var userRef = new Firebase('https://yotempest.firebaseio.com/users').child(myEmail)
    .child('friends').update({[friendEmail]: decodeURIComponent(friendEmail).slice(0, decodeURIComponent(friendEmail).indexOf('@'))});
    // Reset text box
    $scope.inputs.email = '';
    // Hide the add friend button
    $scope.identified = false;
    // Show message that friend was added
    $scope.added = true;
  };

  $scope.navToMessage = function() {
    $state.go('message');
  };

});
