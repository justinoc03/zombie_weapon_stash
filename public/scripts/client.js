console.log('js is sourced');

//auth0 lock and logoutURL
var lock = new Auth0Lock( '8V3jER1xj9RjCa6sH0U55nHHVdMryyLT', 'oconnorjustin.auth0.com');
// log out url, from Auth0
var logOutUrl = 'https://oconnorjustin.auth0.com/v2/logout';

//must bring in the angular-route via $ngRoute
//angular-route is dependent on having angular already installed
var myApp = angular.module('myApp',['ngRoute']);

myApp.controller('zombieController',['$scope','$http',function($scope,$http){

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
          console.log( 'token:', token );
          // save user profile to localStorage
          localStorage.setItem( 'userProfile', JSON.stringify( profile ) );
          console.log( 'profile:', profile );
        } // end no error
      }); //end lock.show
    }; // end scope.logIn

    $scope.logOut = function(){
  // call our logOutUrl
  $http({
    method:'GET',
    url: logOutUrl,
  }).then( function( data ){
    // if logged out OK
    if( data.data == 'OK' ){
      // empty localStorage
      // emptyLocalStorage();
      $scope.showUser = false;
    }
  });
}; // end scope.logIn

}]); // end zombieController


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
