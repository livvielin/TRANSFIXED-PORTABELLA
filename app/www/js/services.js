angular.module('starter.services', [])
.factory('User', function () {
  var friends = [
  {
    'name': 'Alex Manasu',
    'number': '123'
  },
  {
    'name': 'Juana Becerra',
    'number': '456'
  },
  {
    'name': 'Livvie Lin',
    'number': '789'
  }
  ];

  var addFriend = function (friend) {
    // TODO
  };

  return {
    friends: friends
  };
});
