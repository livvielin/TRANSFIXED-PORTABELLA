angular.module('starter.services', [])

.factory('Database', function() {
  var ref = new Firebase('https://yotempest.firebaseio.com');
  return {
    ref: ref
  };
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

.factory('Auth', function($firebaseAuth, Database) {
  var createUser = function(email, password) {
    Database.ref.createUser({
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

  var login = function(email, password, $state) {
    Database.ref.authWithPassword({
      email: email,
      password: password
    }, function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
        //redirects to messages
        $state.go('message');
      }
    });
  };

  return {
    createUser: createUser,
    login: login
  };
})

.factory('Message', function() {
  var message = 'hello';
  return {
    message: message
  };
});
