angular.module('starter.services', [])

.factory('Database', function($firebaseObject) {
  var ref = new Firebase('https://yotempest.firebaseio.com');
  console.log($firebaseObject(ref));
  return {
    ref: ref
  };
})

.factory('User', function($firebaseArray, $firebaseObject) {
  var escape = function(email) {
    return encodeURIComponent(email).replace('.', '%2E');
  };

  var fetchUserByEmail = function(email) {
    email = escape(email);
    var userRef = new Firebase('https://yotempest.firebaseio.com/users').child(email);
    var user = $firebaseObject(userRef);
    return user;
  };

  return {
    fetchUserByEmail: fetchUserByEmail
  };
})

.factory('Auth', function($firebaseAuth, Database) {
  var escape = function(email) {
    return encodeURIComponent(email).replace('.', '%2E');
  };
  var createUser = function(email, password, callback) {
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
        email = escape(email);
        var userRef = new Firebase('https://yotempest.firebaseio.com/users');
        var uid = userData.uid;
        userRef.update({
          [email]: {
            deviceToken: '',
            friends: {}
          }
        });
        callback();
      }
    });
  };

  var login = function(email, password, $state, callback) {
    var escape = function(email) {
      return encodeURIComponent(email).replace('.', '%2E');
    };
    Database.ref.authWithPassword({
      email: email,
      password: password
    }, function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        email = JSON.parse(window.localStorage['firebase:session::yotempest']).password.email;
        console.log('Current User: ' + email);
        console.log('Authenticated successfully with payload:', authData);
        //redirects to messages
        $state.go('message');
      }
    });
    callback();
  };

  return {
    createUser: createUser,
    login: login
  };
})

.factory('Message', function($http, $ionicCoreSettings) {
  // Define relevant info
  var privateKey = $ionicCoreSettings.get('privateKey');
  var appId = $ionicCoreSettings.get('app_id');

  // Encode your key
  var auth = btoa(privateKey + ':');

  var sendMessage = function(message, token) {
    // Build the request object
    var req = {
      method: 'POST',
      url: 'https://push.ionic.io/api/v1/push',
      headers: {
        'Content-Type': 'application/json',
        'X-Ionic-Application-Id': appId,
        'Authorization': 'basic ' + auth
      },
      data: {
        "tokens": [token], // will later change to format ['your', 'target', 'tokens']
        "notification": {
          "alert": message
        }
      }
    };
    // Make the API call
    $http(req).success(function(resp){
      // Handle success
      console.log("Ionic Push: Push success!");
    }).error(function(error){
      // Handle error 
      console.log("Ionic Push: Push error...");
    });
  };

  return {
    sendMessage: sendMessage
  };
});
