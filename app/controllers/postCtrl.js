(function(){
    'use strict';
    angular.module('cofw.core')
        .controller('postCtrl', postCtrl);
    postCtrl.$inject = ['$scope', 'post'];
    function postCtrl($scope, post){
        $scope.post = post;
    }
}());