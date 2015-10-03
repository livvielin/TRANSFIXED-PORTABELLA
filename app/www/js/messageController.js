angular.module('starter.messageController', ['ionic', 'starter.services','firebase'])

.controller('MessageController', function ($scope, $rootScope, $state, $firebaseObject, Message, Database, User, $timeout) {

  $scope.sent = [];

  $scope.sendMessage = function(friend, $index) {
    // Find friend token
    var token;
    var friendRef = new Firebase('https://yotempest.firebaseio.com/users').child(friend);
    friendRef.on('value', function (snapshot) {
      token = snapshot.val().deviceToken;
    });
    // Find current user for 'From'
    var currentUser = JSON.parse(window.localStorage['firebase:session::yotempest']).password.email;
    var currentUsername = currentUser.slice(0, currentUser.indexOf('@'));
    // Send the message from current user and show sent message
    Message.sendMessage(currentUsername + ': ' + $scope.message, token, function () {
      $scope.sent[$index] = true;
      $timeout(function() {
        $scope.sent[$index] = false;
      }, 1000);
    });
  };

  console.log(JSON.parse(window.localStorage['firebase:session::yotempest']).password.email);

  var escape = function(email) {
    return encodeURIComponent(email).replace('.', '%2E');
  };

  var email = escape(JSON.parse(window.localStorage['firebase:session::yotempest']).password.email);
  var friends = new Firebase('https://yotempest.firebaseio.com/users').child(email);
  // Update on friend added
  var userRef = new Firebase('https://yotempest.firebaseio.com/users').child(email).child('friends');
  userRef.on('value', function (snapshot) {
    var user = $firebaseObject(friends);
    user.$loaded()
    .then(function(data) {
      $scope.decodedFriends = {};
      for (var friend in data.friends) {
        $scope.decodedFriends[friend] = {
          email: friend,
          username: data.friends[friend]
        };
      }
      $scope.friends = data.friends;
    });
  });

  $scope.navToUsers = function() {
    $state.go('users');
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
