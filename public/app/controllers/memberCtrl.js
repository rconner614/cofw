(function(){
    'use strict';
    angular.module('cofw.core')
        .controller('memberCtrl', memberCtrl);
    memberCtrl.$inject = ['$scope', 'member'];
    function memberCtrl($scope, member){
        $scope.member = member;
    }
}());