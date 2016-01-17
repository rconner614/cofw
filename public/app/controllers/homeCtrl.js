(function(){
  'use strict';
  angular.module('cofw.core')
      .controller('homeCtrl', homeCtrl);
  homeCtrl.$inject = ['$scope', '$http', '$sce'];
  function homeCtrl($scope, $http, $sce){
    $scope.posts = $http.get('/app/data/posts.json').then(function(resp){
      $scope.posts = resp.data.posts;
      $scope.tags = resp.data.tags;
    });

    $scope.tagName = 'a';

    for(var i = 0; i < $scope.posts.length; i++){
      $scope.posts[i].createdOn = new Date($scope.posts[i].date);
    }

    $scope.tab = 1;
    $scope.totalItems = $scope.posts.length;
    $scope.currentPage = 1;
    $scope.category = 1;
    $scope.tagName = '';

    $scope.safeHTML = function(x){
      return $sce.trustAsHtml(x);
    };

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.maxItems = 5;
  }
}());