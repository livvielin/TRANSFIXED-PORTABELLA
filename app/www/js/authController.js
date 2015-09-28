angular.module('starter.authController', ['ionic', 'starter.services'])

.controller('AuthController', function ($scope, Auth, $rootScope, $ionicUser, $ionicPush, $log) {
  //UI properties
  $scope.ui = {
    showCreate: false
  };
  //form properties
  $scope.inputs = {
    email: null,
    password: null
  };

  //Will show create user fields when create account button is clicked
  $scope.toggleCreate = function() {
    $scope.ui.showCreate = !$scope.ui.showCreate;
  };

  $scope.createUser = function() {
    Auth.createUser($scope.inputs.email, $scope.inputs.password);
  };

  $scope.login = function() {
    //can use pop-up instead of redirect for emulator purposes
    // Auth.$authWithOAuthRedirect('facebook').then(function(authData) {
    //   console.log(authData);
    //   // Auth.$createUser
    //   //
    //   // User successfully logged in
    // }).catch(function(error) {
    //   console.log('error');
    //   if (error.code === 'TRANSPORT_UNAVAILABLE') {
    //     Auth.$authWithOAuthPopup('facebook').then(function(authData) {
    //       // User successfully logged in. We can log to the console since we’re using a popup here
    //       console.log(authData);
    //     });
    //   } else {
    //     // Another error occurred
    //     console.log(error);
    //   }
    // });
  };

  //*** PUSH NOTIFICATION AUTH ***
  //Handler for incoming device tokens. Allows us access so we can decide what to do with it (push to firebase?)
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    alert("Successfully registered token " + data.token);
    $log.info('Ionic Push: Got token ', data.token, data.platform);
    $scope.token = data.token;
  });

  //Identifies a user with the Ionic User service for push notifications
  $scope.identifyUser = function () {
    $log.info('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      //if the user doesn't have an id, generate a new one
      //TODO: use facebook id's as the user_id?
      user.user_id = $ionicUser.generateGUID();
    };
    //TODO: INTERGRATE WITH LOGIN - Need details from other Auth here
    angular.extend(user, {
      name: "PLACEHOLDER"
    });

    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      //Return the code for testing purposes
      alert('Identified user' + user.name + '\n ID' + user.user_id);
    });
  };  

  $scope.pushRegister = function () {
    $log.info('Ionic Push: Registering user');

    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
        $log.info(notification);
        return true;
      }
    })
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
