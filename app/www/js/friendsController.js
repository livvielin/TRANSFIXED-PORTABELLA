angular.module('starter.friendsController', ['ionic', 'starter.services'])

.controller('FriendsController', function ($scope, Friends) {
  $scope.friends = Friends;

  $scope.addFriend = function() {
    var friendName = prompt('What is your friend\'s name?');
    if (friendName) {
      $scope.friends.$add({
        'friend': friendName
      });
    }
  };
});
