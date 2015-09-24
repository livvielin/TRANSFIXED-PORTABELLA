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
        'friend': friendName
      });
    }
  };

  return {
    addFriend: addFriend
  };
});
