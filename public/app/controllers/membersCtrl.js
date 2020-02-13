(function(){
    'use strict';
    angular.module('cofw.core')
        .controller('membersCtrl', membersCtrl);
    membersCtrl.$inject = ['$scope', 'data', '$location'];
    function membersCtrl($scope, data, $location){
        $scope.members = data.members;

        $scope.goTo = function(id) {
            window.location.pathname = '/members/member/' + id;
        };
    }
}());