angular.module('starter.messageController', ['ionic', 'starter.services','firebase'])

.controller('MessageController', function ($scope, $rootScope, $state, $firebaseObject, Message, Database, User) {


  $scope.sendMessage = function(friend) {
    // Find friend token
    var token;
    var friendRef = new Firebase('https://yotempest.firebaseio.com/users').child(friend);
    friendRef.on('value', function (snapshot) {
      token = snapshot.val().deviceToken;
    });
    // Send the message
    Message.sendMessage($scope.message, token);
    console.log($scope.message);
    console.log(token);
  };

  console.log(JSON.parse(window.localStorage['firebase:session::yotempest']).password.email);

  var escape = function(email) {
    return encodeURIComponent(email).replace('.', '%2E');
  };

  var email = escape(JSON.parse(window.localStorage['firebase:session::yotempest']).password.email);
  var friends = new Firebase('https://yotempest.firebaseio.com/users').child(email);
<<<<<<< HEAD
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
=======
  var user = $firebaseObject(friends);
  user.$loaded()
  .then(function(data) {
    $scope.decodedFriends = {};
    for (var friend in data.friends) {
      $scope.decodedFriends[friend] = {
        email: decodeURIComponent(friend),
        token: data.friends[friend],
        username: decodeURIComponent(friend).slice(0, decodeURIComponent(friend).indexOf('@'))
      };
    }
    $scope.friends = data.friends;
>>>>>>> f6cc4c7d1dd69bb7ccb3aac5b944a9a032d124d3
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
