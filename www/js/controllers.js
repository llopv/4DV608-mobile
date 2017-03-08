angular.module('starter.controllers', [])

.controller('signatureCtrl', function($scope,$window) {
  var theDiv=document.getElementById('sigCanvasDiv')
  var canvas=document.getElementById('signatureCanvas')
    $scope.dev_width = theDiv.offsetWidth;
    $scope.dev_height = theDiv.offsetHeight;
  var signaturePad= new SignaturePad(canvas);
  $scope.clearCanvas=function(){
    signaturePad.clear();
  }
  $scope.saveCanvas=function(){
    var sigImag=signaturePad.toDataURL();
    $scope.signatureImage=sigImag;
  }  
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,$location) {
  $scope.login=function(){
    console.log('login button pressed');
  }
  $scope.goToSignup=function(){
    console.log('goToSignup button pressed');
    $location.path('tab/account/signup');
  }
  $scope.goToLogin=function(){
    console.log('got back to login pressed');
    $location.path('tab/account');
  }
  $scope.registerUser=function(){
    console.log('register the user button pressed');
  }
});
