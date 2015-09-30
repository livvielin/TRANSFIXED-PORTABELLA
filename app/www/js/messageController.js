angular.module('starter.messageController', ['ionic', 'starter.services','firebase'])

.controller('MessageController', function ($scope, $rootScope, $state, $firebaseObject, Message, Database, User) {


  $scope.sendMessage = function(token) {
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
  var user = $firebaseObject(friends);
  user.$loaded()
  .then(function(data) {
    $scope.decodedFriends = {};
    for (var friend in data.friends) {
      $scope.decodedFriends[friend] = {
        email: decodeURIComponent(friend),
        token: data.friends[friend]
      };
    }
    console.log('Decoded friends: ' + $scope.decodedFriends);
    $scope.friends = data.friends;
  });

  $scope.addFriend = function () {
    User.addFriend($scope.friends);
  };

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
