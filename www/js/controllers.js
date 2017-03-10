angular.module('starter.controllers', [])

  .controller('signatureCtrl', function ($scope, $window, ServerService, $state, $ionicPopup) {
    var theDiv = document.getElementById('sigCanvasDiv')
    var canvas = document.getElementById('signatureCanvas')
    $scope.dev_width = theDiv.offsetWidth;
    $scope.dev_height = theDiv.offsetHeight;
    var signaturePad = new SignaturePad(canvas);
    var signatures = [];
    $scope.pag_i = 0;
    $scope.pag_t = 0;
    if ($state.current.name == 'tab.sample') {
      $scope.pag_t = 5;
    }
    $scope.clearCanvas = function () {
      signaturePad.clear();
    }

    $scope.saveCanvas = function () {
      if (signaturePad.isEmpty()) {
        $scope.signatureText = "Please Provide Signature"
      } else if ($state.current.name == 'tab.signature') {
        let signature = signaturePad.toData();
        ServerService.signRequest(signature);
      } else {
        let signature = signaturePad.toData();
        signaturePad.clear();
        signatures.push(signature);
        $scope.pag_i = signatures.length;
        if (signatures.length >= 5) {
          ServerService.uploadSignature(signatures).then(function() {
            $ionicPopup.alert({
              title: 'Congratulations!',
              template: 'You have been registered to the server'
            });
            $state.go('tab.signature');
          });
        }
      }
    }
  })
  .controller('AccountCtrl', function ($scope, $location, ServerService, $ionicPopup, $state) {
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
      var email = $scope.email;
      var password = $scope.password;
      if ($scope.password2 != password) {
        $ionicPopup.alert({
          title: 'Password mismatch!',
          template: 'Retype your passwords, please'
        });
        return;
      }
      ServerService.register(email, password)
      .then(function() {
        $ionicPopup.alert({
          title: 'Ok!',
          template: 'Now we need some signature samples',
          okText: 'Go!'
        }).then(function() {
          $state.go('tab.sample')
        });
      }, function(e) {
        console.log(e.status)
        $ionicPopup.alert({
          title: 'Something went wrong!',
          template: 'It might taste good'
        }).then(function() {
          $state.go('tab.sample')
        });

      });
    }
    $scope.isLoggedIn = function() {
      return !!localStorage.token;
    }
  });
