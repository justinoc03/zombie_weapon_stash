console.log('js is sourced');

//must bring in the angular-route via $ngRoute
//angular-route is dependent on having angular already installed
var myApp = angular.module('myApp',['ngRoute']);

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
      when('/userStash',{
        templateUrl: "./views/partials/userStash.html",
        controller: "userStashController"
      }).
      otherwise({
        redirectTo: "/home"
      });
}]);
