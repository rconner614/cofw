(function(){
    'use strict';
    angular.module('cofw.core')
        .controller('membersCtrl', membersCtrl);
    membersCtrl.$inject = ['$scope', 'data'];
    function membersCtrl($scope, data){
        $scope.members = data.members;
        console.log($scope.members, data, 'members');
    }
}());