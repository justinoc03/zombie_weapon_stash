console.log('js is sourced');
var loggedInUser = {};

////////////////auth0 lock and logoutURL config/////////////////////
var lock = new Auth0Lock( '8V3jER1xj9RjCa6sH0U55nHHVdMryyLT', 'oconnorjustin.auth0.com');
// log out url, from Auth0
var logOutUrl = 'https://oconnorjustin.auth0.com/v2/logout';

//////////////////////////angular///////////////////////////////
//must bring in the angular-route via $ngRoute
//angular-route is dependent on having angular already installed
var myApp = angular.module('myApp',['ngRoute']);


/////////////////////photo upload directive/////////////////
myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);


////////////////////////////////////////main zombieController///////////////////////////////////////////////
myApp.controller('zombieController',['$scope','$http', function($scope, $http){

  ////////////////auth0 lock//////////////////////
  $scope.lock = function(){
    console.log( 'in init' );
    // check if a user's info is saved in localStorage
    if( JSON.parse( localStorage.getItem( 'userProfile' ) ) ){
      // if so, save userProfile as $scope.userProfile
      $scope.userProfile = JSON.parse( localStorage.getItem( 'userProfile' ) );
      $scope.showUser = true;

      loggedInUser = $scope.userProfile;
    }
    else{
      // if not, make sure we are logged out and empty
      emptyLocalStorage();
      $scope.showUser = false;
    }
  }; // end $scope.lock function

  // run $scope.lock on app/controller load
  $scope.lock();

  //auth0 login
  $scope.logIn = function(){
    // call out logIn function from auth0.js
    console.log( 'in logIn' );
    lock.show( function( err, profile, token ) {
      if (err) {
        console.error( "auth error: ", err);
      } // end error
      else {
        // save token to localStorage
        localStorage.setItem( 'userToken', token );
        // save user profile to localStorage
        localStorage.setItem( 'userProfile', JSON.stringify( profile ) );
        // reload page because dirtyhaxorz
        location.reload();
      } // end no error
    }); //end lock.show
  }; // end scope.logIn

  //auth0 logout
  $scope.logOut = function(){
    console.log('in logout');
    // call our logOutUrl
    $http({
      method:'GET',
      url: logOutUrl,
    }).then( function( data ){
      // if logged out OK
      if( data.data == 'OK' ){
        // empty localStorage
        emptyLocalStorage();
        $scope.showUser = false;
      }
      console.log('GOODBYE', $scope.userProfile.given_name + " " + $scope.userProfile.family_name );
  });
}; // end scope.logOut

}]); // end zombieController

var emptyLocalStorage = function(){
  localStorage.removeItem( 'userProfile' );
  localStorage.removeItem( 'userToken' );
}; // end emptyLocalStorage

///////////////////////////Angular Routing///////////////////////////////////////
//config method doesnt take a name, we are just configuring myApp,
//It does take in a dependency injection array
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
      when('/home',{
        templateUrl: "./views/partials/home.html",
        controller: "homeController"
      }).
      when('/globalStash',{
        templateUrl: "./views/partials/globalStash.html",
        controller: "globalStashController"
      }).
      when('/addItem',{
        templateUrl: "./views/partials/addItem.html",
        controller: "addItemController"
      }).
      when('/homeli',{
        templateUrl: "./views/partials/loggedInPartials/homeLoggedIn.html",
        controller: "homeControllerLoggedIn"
      }).
      otherwise({
        redirectTo: "/home"
      });
}]);
