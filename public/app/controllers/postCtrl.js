(function(){
    'use strict';
    angular.module('cofw.core')
        .controller('postCtrl', postCtrl);
    postCtrl.$inject = ['$scope', '$stateParams', 'data'];
    function postCtrl($scope, $stateParams, data){
        $scope.posts = data.posts;
        $scope.post = $scope.posts.filter(function(sItem){
            return sItem.id === Number($stateParams.id);
        })[0];
    }
}());