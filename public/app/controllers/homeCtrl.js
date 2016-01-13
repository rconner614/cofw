(function(){
  'use strict';
  angular.module('cofw.core')
      .controller('homeCtrl', homeCtrl);
  homeCtrl.$inject = ['$scope', 'posts'];
  function homeCtrl($scope, posts){
    $scope.posts = posts;
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
  }
}());