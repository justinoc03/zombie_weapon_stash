myApp.controller("globalStashController", ["$scope", "$http", function($scope, $http){
  console.log('In globalStashController');

  $scope.allItemsInStash = [];

  $scope.getItems = function () {
    console.log('in getItems');
    $http({
      method: 'GET',
      url: '/getItems'
    }).then(function success(responseObject) {
      console.log('got these items from server/db:', responseObject);
      $scope.allItemsInStash = responseObject.data;
    }, function error(errorObject){
      console.log(errorObject);
    });
    console.log($scope.allItemsInStash);
  };



}]);
