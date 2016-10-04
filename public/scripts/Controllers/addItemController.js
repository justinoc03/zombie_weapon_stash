myApp.controller("addItemController", ['$scope', '$http' ,function($scope, $http){
  console.log('In addItemController');

  $scope.addItem = function(){
    console.log( 'in addItem function');

    //check if inputs are blank
    // if( $scope.item_name.length === false ){
    //   alert("Please fill in all required fields (required = *)");
    // }

    //put new pet into object to send to the server
    //properties on the left-hand side NEED to be the same as what the server expects
    var itemToSend = {
      item_name: $scope.item_name,
      description: $scope.description,
      rating_damage: $scope.rating_damage
    };//end itemToSend

    //reset inputs after adding a new item
    $scope.item_name = null;
    $scope.description = null;
    $scope.rating_damage = null;

    console.log( 'sending:', itemToSend );

    $http({
      method: 'POST',
      url: '/addItem',
      data: itemToSend
    }).then(function(response){
      console.log('this is from the server', response);
    });

  }; // end addItem function

}]);
