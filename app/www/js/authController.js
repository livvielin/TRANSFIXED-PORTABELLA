angular.module('starter.authController', ['ionic', 'starter.services'])

.controller('AuthController', function ($scope, Auth) {
  $scope.login = function() {
    //using pop-up instead of redirect for emulator purposes
    Auth.$authWithOAuthRedirect('facebook').then(function(authData) {
      console.log(authData);
      // User successfully logged in
    }).catch(function(error) {
      console.log('error');
      if (error.code === 'TRANSPORT_UNAVAILABLE') {
        Auth.$authWithOAuthPopup('facebook').then(function(authData) {
          // User successfully logged in. We can log to the console
          // since we’re using a popup here
          console.log(authData);
        });
      } else {
        // Another error occurred
        console.log(error);
      }
    });
  };
});

// This method is called each time authentication state changes

// Auth.$onAuth(function(authData) {
//   if (authData === null) {
//     console.log('Not logged in yet');
//   } else {
//     console.log('Logged in as', authData.uid);
//   }
//   $scope.authData = authData; // This will display the user's name in our view
// });
