(function(){
    'use strict';
    angular.module('cofw.core')
        .controller('memberCtrl', memberCtrl);
    memberCtrl.$inject = ['$scope', 'data', '$stateParams', '$sce'];
    function memberCtrl($scope, data, $stateParams, $sce){
        $scope.members = data.members;
        $scope.member = $scope.members.filter(function(sItem){
            return Number(sItem.id) === Number($stateParams.id);
        })[0];

        $scope.safeHTML = function (x) {
            return $sce.trustAsHtml(x);
        };
    }
}());