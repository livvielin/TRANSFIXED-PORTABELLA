angular.module('starter.services', [])

.factory('Friends', function($firebaseArray) {
  var friendsRef = new Firebase('https://yotempest.firebaseio.com/friends');
  return $firebaseArray(friendsRef);
})

.factory('User', function() {

  var addFriend = function(friends) {
    var friendName = prompt('What is your friend\'s name?');
    if (friendName) {
      friends.$add({
        'name': friendName
      });
    }
  };

  return {
    addFriend: addFriend
  };
})

.factory('Auth', function($firebaseAuth) {
  var usersRef = new Firebase('https://yotempest.firebaseio.com/auth');
  return $firebaseAuth(usersRef);
})

.factory('Message', function() {
  var message = 'hello';
  return {
    message: message
  };
});
