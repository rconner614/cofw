(function(){
    'use strict';
    angular.module('cofw.core')
        .controller('membersCtrl', membersCtrl);
    membersCtrl.$inject = ['$scope', '$http'];
    function membersCtrl($scope, $http){
        $http.get('/app/data/members.json').then(function(resp){
            $scope.members = resp.data.members;
        }, function(resp){
            console.log('failed', resp);
        });
        console.log($scope.members, 'members');
    }
}());