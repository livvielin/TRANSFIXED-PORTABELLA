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
