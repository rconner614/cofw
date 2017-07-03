(function(){
    'use strict';
    angular.module('cofw.core')
        .controller('postCtrl', postCtrl);
    postCtrl.$inject = ['$scope', '$stateParams', 'data', '$sce'];
    function postCtrl($scope, $stateParams, data, $sce){
        $scope.posts = data.posts;
        $scope.post = $scope.posts.filter(function(sItem){
            return Number(sItem.id) === Number($stateParams.id);
        })[0];
        $scope.post.createdOnDate = moment($scope.post.createdOn).format("dddd, MMMM Do YYYY");
        console.log($scope.posts, $scope.post, data, $stateParams);
        $scope.safeHTML = function(x){
            return $sce.trustAsHtml(x);
        };
    }
}());