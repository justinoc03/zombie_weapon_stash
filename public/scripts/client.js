console.log('js is sourced');

//must bring in the angular-route via $ngRoute
//angular-route is dependent on having angular already installed
var myApp = angular.module('myApp',['ngRoute']);

//declared for authentication system found below in $scope.logIn
//(client,domain)
var lock = Auth0Lock('8V3jER1xj9RjCa6sH0U55nHHVdMryyLT', 'oconnorjustin.auth0.com');

myApp.controller('zombieController',['$scope','$http',function($scope,$http){

}]); // end controller



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
