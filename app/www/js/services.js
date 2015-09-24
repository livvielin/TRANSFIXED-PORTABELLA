angular.module('starter.services', [])

.factory('Friends', function($firebaseArray) {
  var friendsRef = new Firebase('https://yotempest.firebaseio.com/friends');
  return $firebaseArray(friendsRef);
});

// .factory('User', function () {
//   var friends = [
//   {
//     'name': 'Alex Manasu',
//     'number': '123'
//   },
//   {
//     'name': 'Juana Becerra',
//     'number': '456'
//   },
//   {
//     'name': 'Livvie Lin',
//     'number': '789'
//   }
//   ];

//   var addFriend = function (friend) {
//     // TODO
//   };

//   return {
//     friends: friends
//   };
// });
