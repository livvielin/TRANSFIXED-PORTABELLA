angular.module('starter.authController', ['ionic', 'starter.services'])


.controller('AuthController', function ($scope, Auth, $rootScope, $location, $state, $log, $ionicUser, $ionicPush) {
  //form properties
  $scope.inputs = {
    email: null,
    password: null
  };

  $scope.createUser = function() {
    Auth.createUser($scope.inputs.email, $scope.inputs.password);
    $scope.identifyUser();
  };

  $scope.login = function() {
    console.log('Loging in with username:' + $scope.inputs.email + "Password:" + $scope.inputs.password)
    Auth.login($scope.inputs.email, $scope.inputs.password, $state);
    $scope.identifyUser();
  };

  $scope.checkUser = function() {
    console.log($rootScope.userEmail);
  };

  //*** PUSH NOTIFICATION AUTH ***
  //Handler for incoming device tokens. Allows us access so we can decide what to do with it (push to firebase?)
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    alert("Successfully registered token " + data.token);
    $log.info('Ionic Push: Got token ', data.token, data.platform);
    $scope.token = data.token;

    console.log($rootScope.userEmail);
    // put device token in database
    var userRef = new Firebase('https://yotempest.firebaseio.com/users').child($rootScope.userEmail)
    .child('deviceToken').set($scope.token);
  });

  //Identifies a user with the Ionic User service for push notifications
  $scope.identifyUser = function () {
    $log.info('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      //if the user doesn't have an id, generate a new one
      //TODO: use facebook id's as the user_id?
      user.user_id = $ionicUser.generateGUID();
    }
    //TODO: INTERGRATE WITH LOGIN - Need details from other Auth here
    angular.extend(user, {
      name: "PLACEHOLDER"
    });

    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      //Return the code for testing purposes
      // alert('Identified user' + user.name + '\n ID' + user.user_id);
      $scope.pushRegister();
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
    });
  };

});

