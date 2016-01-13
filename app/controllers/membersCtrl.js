(function(){
    'use strict';
    angular.module('cofw.core')
        .controller('membersCtrl', membersCtrl);
    membersCtrl.$inject = ['$scope', 'members'];
    function membersCtrl($scope, members){
        $scope.members = members;
    }
}());