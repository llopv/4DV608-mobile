angular.module('starter.controllers', [])

  .controller('signatureCtrl', function ($scope, $window) {
    var theDiv = document.getElementById('sigCanvasDiv')
    var canvas = document.getElementById('signatureCanvas')
    $scope.dev_width = theDiv.offsetWidth;
    $scope.dev_height = theDiv.offsetHeight;
    var signaturePad = new SignaturePad(canvas);
    $scope.clearCanvas = function () {
      signaturePad.clear();
    }
    $scope.saveCanvas = function () {
      if (signaturePad.isEmpty()) {
        $scope.signatureText = "Please Provide Signature"
      } else {
        var sigImag = signaturePad.toDataURL();
        var sigData = signaturePad.toData();
        console.log('the signature data: ', sigData);
        $scope.signatureImageFromURL = sigImag;
        $scope.signatureImageFromArrray = signaturePad.fromData(sigData);
      }
    }
  })

  .controller('sampleSigCtrl', function ($scope){
    
  })



  .controller('AccountCtrl', function ($scope, $location) {
    $scope.login = function () {
      console.log('login button pressed');
    }
    $scope.goToSignup = function () {
      console.log('goToSignup button pressed');
      $location.path('tab/account/signup');
    }
    $scope.goToLogin = function () {
      console.log('got back to login pressed');
      $location.path('tab/account');
    }
    $scope.registerUser = function () {
      console.log('register the user button pressed');
    }
  });
