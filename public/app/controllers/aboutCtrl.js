(function(){
    'use strict';
    angular.module('cofw.core')
        .controller('aboutCtrl', aboutCtrl);
    aboutCtrl.$inject = ['$scope', 'info'];
    function aboutCtrl($scope, info){
        $scope.info = info;
    }
}());