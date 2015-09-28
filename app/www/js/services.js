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
  // var userRef = new Firebase('https://yotempest.firebaseio.com/auth');
  // return $firebaseAuth(userRef);
  var ref = new Firebase('https://yotempest.firebaseio.com/auth');
  var createUser = function(email, password) {
    ref.createUser({
        email: email,
        password: password
      }, function(error, userData) {
      if (error) {
        switch (error.code) {
          case 'EMAIL_TAKEN':
            console.log('The new user account cannot be created because the email is already in use.');
            break;
          case 'INVALID_EMAIL':
            console.log('The specified email is not a valid email.');
            break;
          default:
            console.log('Error creating user:', error);
        }
      } else {
        console.log('Successfully created user account with uid:', userData.uid);
      }
    });
  };

  return {
    createUser: createUser
  };
})

.factory('Message', function() {
  var message = 'hello';
  return {
    message: message
  };
});
