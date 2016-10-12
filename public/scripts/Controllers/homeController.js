myApp.controller("homeController", ['$scope', '$http' ,function($scope, $http){
  console.log('In homeController');

  /////////////////////////////Add New User//////////////////////////////////////////
  $scope.newUser = function(){
    console.log('in newUser');
    var userToDB = {
      first_name: loggedInUser.given_name,
      last_name: loggedInUser.family_name,
      nickname: loggedInUser.nickname,
      email: loggedInUser.email,
      user_role: 1,
    };

    console.log('userToDB:', userToDB);

    //reset inputs after adding a new item
    // $scope.my_file = "";
    // $scope.item_name = null;
    // $scope.description = null;
    // $scope.rating_damage = null;

    //send data to mongoDB
    $http({
      method: 'POST',
      url: '/checkUser',
      data: userToDB
    }).then(function(zwsUserResponse){
      console.log('success from server/MongoDB (users)', zwsUserResponse);
    });//end HTTP call to mongoDB

  };//end newUser


}]);
