(function(){
    'use strict';
    angular.module('cofw.core')
        .controller('addPostCtrl', addPostCtrl);
    addPostCtrl.$inject = ['$scope', 'postSrv', 'data'];
    function addPostCtrl($scope, postSrv, data){
        $scope.post = {};
        $scope.addPost = function(){
            postSrv.savePost($scope.post).then(function(resp){
                console.log(resp);
            }, function(resp){
                console.log(resp);
            });
        };

        $scope.tags = data.tags;
        $scope.post.tags = [];
    }
}());